import React, { useState, useEffect, useRef, useCallback } from 'react';
import Hls from 'hls.js';
import Head from 'next/head';

// --- Types ---
interface Camera {
  branch: string;
  links: string[];
}

interface HlsVideoPlayerProps {
  hlsUrl: string;
  cameraId: string;
}

type CameraStatus = 'live' | 'offline' | 'checking' | 'unknown';

// --- Data Fetching (Server-Side) ---
// Loads the JSON data once at build time
export async function getStaticProps() {
  const data = await import('../../data/streams.json');
  return {
    props: {
      cameras: data.default,
    },
  };
}

// =========================================================
// 📺 HLS Player Component with Resilience and Manual Retry
// =========================================================
const HlsVideoPlayer: React.FC<HlsVideoPlayerProps> = ({
  hlsUrl,
  cameraId,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [hasFatalError, setHasFatalError] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0); // Key state to trigger re-initialization

  // Core function to initialize HLS
  const initializeHls = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // For Safari/Native HLS support
    if (!Hls.isSupported() && video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsUrl;
        video.play();
        return;
    }

    // Cleanup previous instance if it exists
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    setHasFatalError(false); // Reset error state
    
    const hls = new Hls();
    hlsRef.current = hls;

    hls.loadSource(hlsUrl);
    hls.attachMedia(video);

    let autoRetryCount = 0;
    const MAX_AUTO_RETRIES = 5; // Automatic retries

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        console.error(`HLS Fatal Error for ${cameraId}:`, data);

        // Check for network errors related to manifest or fragment loading (common startup issue)
        if (
          (data.type === Hls.ErrorTypes.NETWORK_ERROR &&
           data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR) ||
          (data.type === Hls.ErrorTypes.NETWORK_ERROR &&
           data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR)
        ) {
          // Automatic recovery attempt
          if (autoRetryCount < MAX_AUTO_RETRIES) {
            autoRetryCount++;
            console.log(
              `[HLS.js Auto Retry] Attempting recovery for ${cameraId}. Attempt: ${autoRetryCount}`
            );
            hls.recoverMediaError();
          } else {
            // Automatic retries exhausted, set fatal error state to show manual button
            console.error(`[HLS.js Failure] Automatic retries exhausted for ${cameraId}.`);
            hls.destroy();
            setHasFatalError(true); 
          }
        } else {
          // Other fatal errors (e.g., decoding), destroy and show error
          hls.destroy();
          setHasFatalError(true);
        }
      }
    });

  }, [hlsUrl, cameraId, retryAttempt]); // Dependency on retryAttempt forces re-init

  // Effect to run initialization
  useEffect(() => {
    initializeHls();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [initializeHls]);

  // Manual Retry Handler
  const handleManualRetry = () => {
    console.log(`[HLS.js Manual Retry] User initiating full stream re-initialization for ${cameraId}.`);
    // Incrementing state forces the useEffect (via initializeHls dependency) to run again
    setRetryAttempt(prev => prev + 1); 
  };
  
  // Render Logic
  return (
    <div
      style={{
        height: '300px',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {hasFatalError ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#fff' }}>
            Трансляция не может быть загружена после нескольких попыток.
          </p>
          <button
            onClick={handleManualRetry}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Повторить попытку (Retry)
          </button>
        </div>
      ) : (
        <video
          ref={videoRef}
          controls
          autoPlay
          muted
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};


// =========================================================
// 🖥️ Main Page Component
// =========================================================
const CameraViewerPage: React.FC<{ cameras: Camera[] }> = ({ cameras }) => {
  const [activeStreams, setActiveStreams] = useState<Record<string, string>>(
    {},
  );
  const [selectedBranch, setSelectedBranch] = useState<number>(0);
  const [loadingCameraId, setLoadingCameraId] = useState<string | null>(null);
  const [cameraStatuses, setCameraStatuses] = useState<
    Record<string, CameraStatus>
  >({});

  // Use refs for latest state access in effects/intervals
  const cameraStatusesRef = useRef(cameraStatuses);
  const activeStreamsRef = useRef(activeStreams);

  useEffect(() => { cameraStatusesRef.current = cameraStatuses; }, [cameraStatuses]);
  useEffect(() => { activeStreamsRef.current = activeStreams; }, [activeStreams]);


  // Function to check the camera status via the API
  const checkCameraStatus = async (cameraId: string) => {
    if (cameraStatusesRef.current[cameraId] === 'checking') return;

    setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'checking' }));

    try {
      const response = await fetch(`/api/stream/${cameraId}?action=status`);
      const data = await response.json();

      if (response.ok) {
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: data.status }));
      } else {
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
    }
  };

  // Effect: Periodic and Staggered Status Checking
  useEffect(() => {
    const currentBranchCameras = cameras[selectedBranch]?.links || [];
    const cameraIds = currentBranchCameras.map(
      (_, index) => `${selectedBranch}-${index}`,
    );

    // --- 1. Staggered Check on Branch Change (Initial Load) ---
    const staggerCheck = (index: number) => {
      if (index >= cameraIds.length) return;

      const cameraId = cameraIds[index];
      if (!activeStreamsRef.current[cameraId] && cameraStatusesRef.current[cameraId] !== 'live') {
        checkCameraStatus(cameraId);
      }

      setTimeout(() => staggerCheck(index + 1), 1500);
    };

    // Reset statuses and clear active streams for the branch when switching
    setCameraStatuses({});
    setActiveStreams(prev => {
        const newActive = {...prev};
        cameraIds.forEach(id => delete newActive[id]);
        return newActive;
    });

    staggerCheck(0); // Start staggered check

    // --- 2. Periodic Re-check (The Ticker) ---
    const intervalId = setInterval(() => {
      console.log('Running periodic status re-check...');
      cameraIds.forEach((cameraId) => {
        const status = cameraStatusesRef.current[cameraId];
        const isHlsActive = activeStreamsRef.current[cameraId];

        // Only check if NOT active (HLS stream) and potentially offline
        if (!isHlsActive && (status === 'offline' || status === 'unknown')) {
          checkCameraStatus(cameraId);
        }
      });
    }, 60000); // 60 seconds

    return () => clearInterval(intervalId);
  }, [selectedBranch, cameras]);

  // Function to start the stream (INCLUDES 500ms RACE CONDITION FIX)
  const startStream = async (cameraId: string) => {
    if (activeStreams[cameraId] || loadingCameraId === cameraId) return;

    setLoadingCameraId(cameraId);
    setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'checking' }));

    try {
      const response = await fetch(`/api/stream/${cameraId}?action=start`);
      const data = await response.json();

      if (response.ok && data.hlsUrl) {
        
        // 1. Update status to live immediately
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'live' }));

        // 2. *** CRITICAL FIX: Add a short delay (500ms) ***
        // This mitigates the front-end fetch race condition by giving FFmpeg/Nginx
        // a moment to stabilize the first HLS manifest file.
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        // 3. Finally, activate the HLS player by setting the stream URL
        setActiveStreams((prev) => ({ ...prev, [cameraId]: data.hlsUrl }));

      } else {
        alert(
          `Не удалось запустить поток: ${data.error || 'Неизвестная ошибка'}`,
        );
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
      }
    } catch (error) {
      console.error('Error starting stream:', error);
      alert('Произошла ошибка при подключении к потоковому серверу.');
      setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
    } finally {
      setLoadingCameraId(null);
    }
  };

  const stopStream = async (cameraId: string) => {
    try {
      const response = await fetch(`/api/stream/${cameraId}?action=stop`);
      if (response.ok) {
        setActiveStreams((prev) => {
          const { [cameraId]: _, ...rest } = prev;
          return rest;
        });
        // Re-check status immediately after stopping the stream
        checkCameraStatus(cameraId);
      } else {
        alert('Не удалось остановить поток.');
      }
    } catch (error) {
      console.error('Error stopping stream:', error);
    }
  };

  // Flattened camera data for rendering
  const allCameras =
    cameras[selectedBranch]?.links.map((link, linkIndex) => {
      const cameraId = `${selectedBranch}-${linkIndex}`; // Unique ID for API
      return {
        name: `Камера ${linkIndex + 1}`,
        cameraId,
        link,
        status: cameraStatuses[cameraId] || 'unknown',
      };
    }) || [];

  const getStatusDisplay = (status: CameraStatus) => {
    switch (status) {
      case 'live':
        return (
          <span style={{ color: '#28a745', fontWeight: 'bold' }}>
            Онлайн (Live)
          </span>
        );
      case 'offline':
        return (
          <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
            Офлайн (Offline)
          </span>
        );
      case 'checking':
        return (
          <span style={{ color: '#ffc107', fontWeight: 'bold' }}>
            Проверка...
          </span>
        );
      default: // 'unknown'
        return <span style={{ color: '#6c757d' }}>Неизвестно</span>;
    }
  };

  return (
    <>
      <Head>
        <title>Camera Viewer</title>
      </Head>
      <div className="camera-viewer-container">
        {/* 1. Mobile Branch Selector */}
        <div className="mobile-branch-selector">
          <label
            htmlFor="branch-select"
            style={{
              color: '#333',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Выберите Филиал:
          </label>
          <select
            id="branch-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              marginBottom: '20px',
            }}
          >
            {cameras.map((branch, index) => (
              <option key={index} value={index}>
                {branch.branch}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Sidebar - Branches */}
        <div className="branch-sidebar">
          <h2
            style={{
              fontSize: '1.2rem',
              marginBottom: '20px',
              borderBottom: '1px solid #555',
              paddingBottom: '10px',
            }}
          >
            Филиалы
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cameras.map((branch, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => setSelectedBranch(index)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    textAlign: 'left',
                    backgroundColor:
                      selectedBranch === index ? '#007bff' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {branch.branch}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Main Content - Streams Grid */}
        <div className="main-content-grid">
          <h1 style={{ marginBottom: '20px', color: '#333' }}>
            {cameras[selectedBranch]?.branch || 'Выберите филиал'} Потоки
          </h1>

          <div className="streams-grid">
            {allCameras.map((camera) => {
              const isOffline = camera.status === 'offline';
              const isCheckingStatus =
                camera.status === 'checking' || camera.status === 'unknown';
              const isStartingStream = loadingCameraId === camera.cameraId;
              const isDisabled = isCheckingStatus || isStartingStream;
              const isLive = activeStreams[camera.cameraId];

              return (
                <div
                  key={camera.cameraId}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{ padding: '15px', borderBottom: '1px solid #eee' }}
                  >
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                      {camera.name}
                    </h3>
                  </div>

                  <div style={{ padding: '15px' }}>
                    {isLive ? (
                      <>
                        <HlsVideoPlayer
                          hlsUrl={activeStreams[camera.cameraId]}
                          cameraId={camera.cameraId}
                        />
                        <button
                          onClick={() => stopStream(camera.cameraId)}
                          style={{
                            marginTop: '10px',
                            padding: '8px 15px',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: '100%',
                          }}
                        >
                          Остановить трансляцию
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Status and Re-check Button Row */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                          }}
                        >
                          <span style={{ fontSize: '0.9rem' }}>
                            Статус: {getStatusDisplay(camera.status)}
                          </span>

                          {/* Re-check Status Button */}
                          <button
                            onClick={() => checkCameraStatus(camera.cameraId)}
                            disabled={camera.status === 'checking'}
                            style={{
                              padding: '5px 10px',
                              backgroundColor:
                                camera.status === 'checking'
                                  ? '#6c757d'
                                  : '#17a2b8',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              opacity: camera.status === 'checking' ? 0.6 : 1,
                              transition: 'background-color 0.2s',
                            }}
                          >
                            {camera.status === 'checking'
                              ? 'Проверка...'
                              : 'Перепроверить статус'}
                          </button>
                        </div>

                        {/* Start/Loading Button */}
                        {isDisabled ? (
                          // Show Loading Screen/Message when status is unknown, checking, or stream is starting
                          <div
                            style={{
                              padding: '10px 15px',
                              backgroundColor: '#6c757d',
                              color: '#fff',
                              borderRadius: '4px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                            }}
                          >
                            {isStartingStream
                              ? 'Начинаем...'
                              : 'Проверка статуса...'}
                          </div>
                        ) : (
                          // Show the start action button
                          <button
                            onClick={() => startStream(camera.cameraId)}
                            style={{
                              padding: '10px 15px',
                              backgroundColor: isOffline ? '#ffc107' : '#28a745',
                              color: isOffline ? '#333' : '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              width: '100%',
                              transition: 'background-color 0.2s',
                            }}
                          >
                            Посмотреть прямую трансляцию
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Global Styles for Responsiveness */}
        <style jsx global>{`
          .camera-viewer-container {
            display: flex;
            min-height: 100vh;
            font-family: sans-serif;
            background-color: #f4f4f9;
            flex-direction: row;
          }
          .branch-sidebar {
            width: 250px;
            background-color: #333;
            color: #fff;
            padding: 20px;
            flex-shrink: 0;
          }
          .main-content-grid {
            flex-grow: 1;
            padding: 20px;
          }
          .streams-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 20px;
          }
          .mobile-branch-selector {
            display: none;
            padding: 20px 20px 0 20px;
            width: 100%;
          }

          /* --- MOBILE STYLES --- */
          @media (max-width: 768px) {
            .camera-viewer-container {
              flex-direction: column;
            }
            .branch-sidebar {
              display: none;
            }
            .mobile-branch-selector {
              display: block;
            }
            .main-content-grid {
              padding: 10px;
            }
            .streams-grid {
              grid-template-columns: 1fr;
              gap: 15px;
            }
          }

          html,
          body,
          #__next {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    </>
  );
};

export default CameraViewerPage;