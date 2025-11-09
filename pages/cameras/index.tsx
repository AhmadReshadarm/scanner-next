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
// NOTE: Adjust the import path if your data file location differs
// This requires a mock streams.json at the specified relative path in your project root
export async function getStaticProps() {
  try {
    const data = await import('../../data/streams.json');
    return {
      props: {
        cameras: data.default,
      },
    };
  } catch (error) {
    console.error("Failed to load streams.json:", error);
    return {
      props: {
        cameras: [],
      },
    };
  }
}

// =========================================================
// 📺 HLS Player Component
// =========================================================
const HlsVideoPlayer: React.FC<HlsVideoPlayerProps> = ({
  hlsUrl,
  cameraId,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [hasFatalError, setHasFatalError] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0); 

  const initializeHls = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    console.log(`[HLS Player] Initializing HLS player for ${cameraId}. Attempt: ${retryAttempt}`);

    if (hlsRef.current) {
      hlsRef.current.destroy();
    }
    setHasFatalError(false); 
    
    // Use native HLS playback if supported 
    if (!Hls.isSupported() && video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log(`[HLS Player] Using native HLS playback.`);
        video.src = hlsUrl;
        video.play().catch(e => console.error("Native play failed:", e));
        return;
    }
    
    if (!Hls.isSupported()) {
      console.error(`[HLS Player] HLS.js is not supported in this browser.`);
      setHasFatalError(true);
      return;
    }


    const hls = new Hls();
    hlsRef.current = hls;

    hls.loadSource(hlsUrl);
    hls.attachMedia(video);

    let autoRetryCount = 0;
    const MAX_AUTO_RETRIES = 5;

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        console.error(`[HLS Player ERROR] Fatal Error for ${cameraId}:`, data);

        if (
          (data.type === Hls.ErrorTypes.NETWORK_ERROR &&
           data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR) ||
          (data.type === Hls.ErrorTypes.NETWORK_ERROR &&
           data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR)
        ) {
          if (autoRetryCount < MAX_AUTO_RETRIES) {
            autoRetryCount++;
            console.warn(
              `[HLS Player Auto Retry] Attempting recovery for ${cameraId}. Attempt: ${autoRetryCount}`
            );
            // Destroy and re-initialize completely on 404/Manifest error
            hls.destroy(); 
            setRetryAttempt(prev => prev + 1); 
          } else {
            console.error(`[HLS Player Failure] Automatic retries exhausted. Showing manual retry.`);
            hls.destroy();
            setHasFatalError(true); 
          }
        } else {
          hls.destroy();
          setHasFatalError(true);
        }
      }
    });

  }, [hlsUrl, cameraId, retryAttempt]);

  useEffect(() => {
    initializeHls();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        console.log(`[HLS Player] Cleanup: HLS instance destroyed.`);
      }
    };
  }, [initializeHls]);

  const handleManualRetry = () => {
    console.log(`[HLS Player Manual Retry] User initiating full stream re-initialization.`);
    setRetryAttempt(prev => prev + 1); 
  };
  
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
  const [activeStreams, setActiveStreams] = useState<Record<string, string>>({});
  const [selectedBranch, setSelectedBranch] = useState<number>(0);
  const [loadingCameraId, setLoadingCameraId] = useState<string | null>(null);
  const [cameraStatuses, setCameraStatuses] = useState<
    Record<string, CameraStatus>
  >({});

  const cameraStatusesRef = useRef(cameraStatuses);
  const activeStreamsRef = useRef(activeStreams);

  useEffect(() => { cameraStatusesRef.current = cameraStatuses; }, [cameraStatuses]);
  useEffect(() => { activeStreamsRef.current = activeStreams; }, [activeStreams]);


  const checkCameraStatus = async (cameraId: string) => {
    console.log(`[Frontend] Starting status check for ${cameraId}`);
    if (cameraStatusesRef.current[cameraId] === 'checking') return;

    setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'checking' }));

    try {
      const response = await fetch(`/api/stream/${cameraId}?action=status`);
      const data = await response.json();

      if (response.ok) {
        console.log(`[Frontend] Status check success for ${cameraId}: ${data.status}`);
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: data.status }));
      } else {
        console.error(`[Frontend] Status check failed (HTTP ${response.status}) for ${cameraId}`);
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
      }
    } catch (error) {
      console.error(`[Frontend] Status check network error for ${cameraId}:`, error);
      setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
    }
  };

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

    // Reset and start check
    setCameraStatuses({});
    setActiveStreams(prev => {
        const newActive = {...prev};
        cameraIds.forEach(id => delete newActive[id]);
        return newActive;
    });

    staggerCheck(0); // Start staggered check

    // --- 2. Periodic Re-check (The Ticker) ---
    const intervalId = setInterval(() => {
      console.log('--- Frontend: Running periodic status re-check ---');
      cameraIds.forEach((cameraId) => {
        const status = cameraStatusesRef.current[cameraId];
        const isHlsActive = activeStreamsRef.current[cameraId];

        if (!isHlsActive && (status === 'offline' || status === 'unknown')) {
          checkCameraStatus(cameraId);
        }
      });
    }, 60000); 

    return () => clearInterval(intervalId);
  }, [selectedBranch, cameras]);


  const startStream = async (cameraId: string) => {
    if (activeStreams[cameraId] || loadingCameraId === cameraId) return;

    console.log(`[Frontend START] Requesting stream start for ${cameraId}`);
    setLoadingCameraId(cameraId);
    setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'checking' }));

    try {
      const response = await fetch(`/api/stream/${cameraId}?action=start`);

      if (response.ok) {
        const data = await response.json();
        console.log(`[Frontend START] API Success (200) for ${cameraId}. HLS URL: ${data.hlsUrl}`);
        
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'live' }));

        // CRITICAL FIX: Add a short delay (500ms) for FFmpeg/Nginx stabilization
        console.log(`[Frontend START] Waiting 500ms for FFmpeg/Nginx stabilization.`);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        setActiveStreams((prev) => ({ ...prev, [cameraId]: data.hlsUrl }));

      } else {
        // Handle 503 case here
        const errorText = await response.text();
        console.error(`[Frontend START] API Failed (HTTP ${response.status}) for ${cameraId}. Response: ${errorText}`);
        // IMPORTANT: Using alert here as an example, but generally use a custom modal
        alert(
          `Не удалось запустить поток (Ошибка: ${response.status}). Проверьте логи сервера.`
        );
        setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
      }
    } catch (error) {
      console.error('[Frontend START] Network/Fetch Error:', error);
      // IMPORTANT: Using alert here as an example, but generally use a custom modal
      alert('Произошла ошибка при подключении к потоковому серверу.');
      setCameraStatuses((prev) => ({ ...prev, [cameraId]: 'offline' }));
    } finally {
      setLoadingCameraId(null);
    }
  };

  const stopStream = async (cameraId: string) => {
    console.log(`[Frontend STOP] Requesting stream stop for ${cameraId}`);
    try {
      const response = await fetch(`/api/stream/${cameraId}?action=stop`);
      if (response.ok) {
        console.log(`[Frontend STOP] Stop request success for ${cameraId}.`);
        setActiveStreams((prev) => {
          const { [cameraId]: _, ...rest } = prev;
          return rest;
        });
        checkCameraStatus(cameraId);
      } else {
        console.error(`[Frontend STOP] Stop request failed (HTTP ${response.status}) for ${cameraId}.`);
        // IMPORTANT: Using alert here as an example, but generally use a custom modal
        alert('Не удалось остановить поток.');
      }
    } catch (error) {
      console.error('[Frontend STOP] Network/Fetch Error:', error);
    }
  };

  const allCameras =
    cameras[selectedBranch]?.links.map((link, linkIndex) => {
      const cameraId = `${selectedBranch}-${linkIndex}`; 
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
          <span style={{ color: '#28a745', fontWeight: 'bold' }}>Онлайн (Live)</span>
        );
      case 'offline':
        return (
          <span style={{ color: '#dc3545', fontWeight: 'bold' }}>Офлайн (Offline)</span>
        );
      case 'checking':
        return (
          <span style={{ color: '#ffc107', fontWeight: 'bold' }}>Проверка...</span>
        );
      default: 
        return <span style={{ color: '#6c757d' }}>Неизвестно</span>;
    }
  };

  // Simplified JSX for the component body for brevity in this response
  return (
    <>
      <Head>
        <title>Camera Viewer</title>
      </Head>
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Система просмотра камер</h1>
        <div className="mb-6">
          <label htmlFor="branch-select" className="block text-sm font-medium text-gray-700">
            Выберите филиал:
          </label>
          <select
            id="branch-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {cameras.map((branch, index) => (
              <option key={index} value={index}>
                {branch.branch}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCameras.map((camera) => {
            const isStreaming = !!activeStreams[camera.cameraId];
            const isChecking = camera.status === 'checking';
            const isLoading = loadingCameraId === camera.cameraId;

            return (
              <div key={camera.cameraId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">{camera.name}</h2>
                  <p className="text-sm text-gray-500">Статус: {getStatusDisplay(camera.status)}</p>
                </div>
                
                {isStreaming ? (
                  <HlsVideoPlayer
                    hlsUrl={activeStreams[camera.cameraId]}
                    cameraId={camera.cameraId}
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-200 h-64 text-gray-500">
                    {isLoading || isChecking ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Загрузка потока...</span>
                      </div>
                    ) : (
                      <span>Поток офлайн.</span>
                    )}
                  </div>
                )}

                <div className="p-4 flex justify-between space-x-2">
                  <button
                    onClick={() => (isStreaming ? stopStream(camera.cameraId) : startStream(camera.cameraId))}
                    disabled={isLoading || isChecking}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                      isStreaming
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    } disabled:bg-gray-400 flex-1`}
                  >
                    {isLoading ? 'Запуск...' : isStreaming ? 'Остановить' : 'Начать просмотр'}
                  </button>
                  <button
                    onClick={() => checkCameraStatus(camera.cameraId)}
                    disabled={isChecking || isLoading}
                    className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400 transition-colors"
                  >
                    Проверить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CameraViewerPage;