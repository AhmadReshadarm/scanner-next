// @ts-nocheck
// import React, { useState, useRef, useEffect } from 'react';
// import jsQR from 'jsqr';

// const Scanner = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [scanResult, setScanResult] = useState(null);

//   useEffect(() => {
//     const getCameraPermission = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         const video = videoRef.current;
//         const canvas: any = canvasRef.current;
//         const context = canvas.getContext('2d');

//         video.srcObject = stream;

//         video.addEventListener('play', () => {
//           const imageData = context.getImageData(
//             0,
//             0,
//             video.videoWidth,
//             video.videoHeight,
//           );

//           // 1. Adjust Contrast and Brightness
//           const adjustedImageData = adjustContrastAndBrightness(
//             imageData,
//             1.2,
//             20,
//           ); // Example: Increase contrast by 20% and brightness by 20

//           // 2. Noise Reduction (Simple Gaussian Blur)
//           const filteredImageData = applyGaussianBlur(adjustedImageData, 3); // Example: Apply a 3x3 Gaussian blur

//           // 3. Edge Detection (Simplified Sobel Operator)
//           const edges = detectEdges(filteredImageData);

//           // Draw edges for visualization (optional)
//           context.clearRect(0, 0, canvas.width, canvas.height);
//           context.putImageData(edges, 0, 0);

//           // Decode QR code
//           const code = jsQR(
//             filteredImageData.data,
//             filteredImageData.width,
//             filteredImageData.height,
//           );

//           if (code) {
//             setScanResult(code.data);
//           }

//           requestAnimationFrame(() => {
//             // Update video frame for continuous scanning
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);
//           });
//         });
//       } catch (error) {
//         if (error.name === 'NotAllowedError') {
//           alert(
//             'Camera permission denied. Please allow camera access in your browser settings.',
//           );
//         } else {
//           console.error('Error accessing camera:', error);
//         }
//       }
//     };

//     getCameraPermission();
//   }, []);

//   // Helper functions for image processing

//   function adjustContrastAndBrightness(imageData, contrast, brightness) {
//     const pixels = imageData.data;
//     for (let i = 0; i < pixels.length; i += 4) {
//       pixels[i] = Math.min(255, Math.max(0, pixels[i] * contrast + brightness)); // Red
//       pixels[i + 1] = Math.min(
//         255,
//         Math.max(0, pixels[i + 1] * contrast + brightness),
//       ); // Green
//       pixels[i + 2] = Math.min(
//         255,
//         Math.max(0, pixels[i + 2] * contrast + brightness),
//       ); // Blue
//     }
//     return imageData;
//   }

//   function applyGaussianBlur(imageData, kernelSize) {
//     const kernel = [];
//     for (
//       let x = -Math.floor(kernelSize / 2);
//       x <= Math.floor(kernelSize / 2);
//       x++
//     ) {
//       for (
//         let y = -Math.floor(kernelSize / 2);
//         y <= Math.floor(kernelSize / 2);
//         y++
//       ) {
//         kernel.push(
//           Math.exp(-(x * x + y * y) / (2 * Math.pow(kernelSize / 2, 2))),
//         );
//       }
//     }
//     const kernelSum = kernel.reduce((a, b) => a + b, 0);
//     for (let i = 0; i < kernel.length; i++) {
//       kernel[i] /= kernelSum;
//     }

//     const outputImageData = new ImageData(imageData.width, imageData.height);
//     for (let x = 0; x < imageData.width; x++) {
//       for (let y = 0; y < imageData.height; y++) {
//         let r = 0,
//           g = 0,
//           b = 0;
//         for (
//           let kx = -Math.floor(kernelSize / 2);
//           kx <= Math.floor(kernelSize / 2);
//           kx++
//         ) {
//           for (
//             let ky = -Math.floor(kernelSize / 2);
//             ky <= Math.floor(kernelSize / 2);
//             ky++
//           ) {
//             const px = x + kx;
//             const py = y + ky;
//             if (
//               px >= 0 &&
//               px < imageData.width &&
//               py >= 0 &&
//               py < imageData.height
//             ) {
//               const offset = (py * imageData.width + px) * 4;
//               r +=
//                 imageData.data[offset] *
//                 kernel[
//                   (ky + Math.floor(kernelSize / 2)) * kernelSize +
//                     kx +
//                     Math.floor(kernelSize / 2)
//                 ];
//               g +=
//                 imageData.data[offset + 1] *
//                 kernel[
//                   (ky + Math.floor(kernelSize / 2)) * kernelSize +
//                     kx +
//                     Math.floor(kernelSize / 2)
//                 ];
//               b +=
//                 imageData.data[offset + 2] *
//                 kernel[
//                   (ky + Math.floor(kernelSize / 2)) * kernelSize +
//                     kx +
//                     Math.floor(kernelSize / 2)
//                 ];
//             }
//           }
//         }
//         const outputOffset = (y * outputImageData.width + x) * 4;
//         outputImageData.data[outputOffset] = Math.round(r);
//         outputImageData.data[outputOffset + 1] = Math.round(g);
//         outputImageData.data[outputOffset + 2] = Math.round(b);
//         outputImageData.data[outputOffset + 3] = 255;
//       }
//     }
//     return outputImageData;
//   }

//   function detectEdges(imageData) {
//     const outputImageData = new ImageData(imageData.width, imageData.height);
//     const gx = [
//       [-1, 0, 1],
//       [-2, 0, 2],
//       [-1, 0, 1],
//     ];
//     const gy = [
//       [1, 2, 1],
//       [0, 0, 0],
//       [-1, -2, -1],
//     ];

//     for (let x = 1; x < imageData.width - 1; x++) {
//       for (let y = 1; y < imageData.height - 1; y++) {
//         let gxSum = 0,
//           gySum = 0;
//         for (let kx = -1; kx <= 1; kx++) {
//           for (let ky = -1; ky <= 1; ky++) {
//             const offset = ((y + ky) * imageData.width + (x + kx)) * 4;
//             const gray =
//               0.299 * imageData.data[offset] +
//               0.587 * imageData.data[offset + 1] +
//               0.114 * imageData.data[offset + 2];
//             gxSum += gray * gx[ky + 1][kx + 1];
//             gySum += gray * gy[ky + 1][kx + 1];
//           }
//         }
//         const magnitude = Math.sqrt(gxSum * gxSum + gySum * gySum);
//         const outputOffset = (y * outputImageData.width + x) * 4;
//         outputImageData.data[outputOffset] = magnitude;
//         outputImageData.data[outputOffset + 1] = magnitude;
//         outputImageData.data[outputOffset + 2] = magnitude;
//         outputImageData.data[outputOffset + 3] = 255;
//       }
//     }
//     return outputImageData;
//   }

//   return (
//     <div>
//       <video ref={videoRef} width="640" height="480" autoPlay />
//       <canvas ref={canvasRef} width="640" height="480" />
//       {scanResult && (
//         <div>
//           <h3>Scanned Result:</h3>
//           <p>{scanResult}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Scanner;

import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // Use the back camera
          },
        });
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        video.srcObject = stream;

        video.addEventListener('play', () => {
          const imageData = context.getImageData(
            0,
            0,
            video.videoWidth,
            video.videoHeight,
          );

          // 1. Adjust Contrast and Brightness
          const adjustedImageData = adjustContrastAndBrightness(
            imageData,
            1.2,
            20,
          ); // Example: Increase contrast by 20% and brightness by 20

          // 2. Sharpening (Unsharp Masking)
          const sharpenedImageData = unsharpMask(adjustedImageData, 1.5, 3); // Example: Sharpen with a radius of 3 pixels and strength of 1.5

          // 3. Adaptive Thresholding
          const thresholdedImageData = adaptiveThreshold(
            sharpenedImageData,
            7,
            3,
          ); // Example: Block size 7x7, C = 3

          // 4. Find Contours (Approximate QR code region)
          const contours = findContours(thresholdedImageData);

          // 5. Crop and Resize (Focus on potential QR code region)
          const croppedImageData = cropAndResize(
            thresholdedImageData,
            contours,
          );

          // 3. Edge Detection (Simplified Sobel Operator)
          const edges = detectEdges(croppedImageData);

          // Draw edges for visualization (optional)
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.putImageData(edges, 0, 0);

          // 6. Decode QR code
          const code = jsQR(
            croppedImageData.data,
            croppedImageData.width,
            croppedImageData.height,
          );

          if (code) {
            setScanResult(code.data);
          }

          requestAnimationFrame(() => {
            // Update video frame for continuous scanning
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
          });
        });
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          alert(
            'Camera permission denied. Please allow camera access in your browser settings.',
          );
        } else {
          console.error('Error accessing camera:', error);
        }
      }
    };

    getCameraPermission();
  }, []);

  // Helper functions for image processing (Simplified implementations)

  function adjustContrastAndBrightness(imageData, contrast, brightness) {
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = Math.min(255, Math.max(0, pixels[i] * contrast + brightness)); // Red
      pixels[i + 1] = Math.min(
        255,
        Math.max(0, pixels[i + 1] * contrast + brightness),
      ); // Green
      pixels[i + 2] = Math.min(
        255,
        Math.max(0, pixels[i + 2] * contrast + brightness),
      ); // Blue
    }
    return imageData;
  }

  function unsharpMask(imageData, strength, radius) {
    const outputImageData = new ImageData(imageData.width, imageData.height);
    const kernel = [];
    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        kernel.push((1 / (2 * radius + 1)) * (2 * radius + 1));
      }
    }

    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let kx = -radius; kx <= radius; kx++) {
          for (let ky = -radius; ky <= radius; ky++) {
            const px = x + kx;
            const py = y + ky;
            if (
              px >= 0 &&
              px < imageData.width &&
              py >= 0 &&
              py < imageData.height
            ) {
              const offset = (py * imageData.width + px) * 4;
              r +=
                imageData.data[offset] *
                kernel[(ky + radius) * (2 * radius + 1) + kx + radius];
              g +=
                imageData.data[offset + 1] *
                kernel[(ky + radius) * (2 * radius + 1) + kx + radius];
              b +=
                imageData.data[offset + 2] *
                kernel[(ky + radius) * (2 * radius + 1) + kx + radius];
            }
          }
        }
        const outputOffset = (y * outputImageData.width + x) * 4;
        outputImageData.data[outputOffset] = Math.round(
          imageData.data[outputOffset] * (1 + strength) - r * strength,
        );
        outputImageData.data[outputOffset + 1] = Math.round(
          imageData.data[outputOffset + 1] * (1 + strength) - g * strength,
        );
        outputImageData.data[outputOffset + 2] = Math.round(
          imageData.data[outputOffset + 2] * (1 + strength) - b * strength,
        );
        outputImageData.data[outputOffset + 3] = 255;
      }
    }
    return outputImageData;
  }

  function adaptiveThreshold(imageData, blockSize, C) {
    const outputImageData = new ImageData(imageData.width, imageData.height);
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        let sum = 0;
        let count = 0;
        for (
          let bx = Math.max(0, x - blockSize / 2);
          bx <= Math.min(imageData.width - 1, x + blockSize / 2);
          bx++
        ) {
          for (
            let by = Math.max(0, y - blockSize / 2);
            by <= Math.min(imageData.height - 1, y + blockSize / 2);
            by++
          ) {
            const offset = (by * imageData.width + bx) * 4;
            sum +=
              (imageData.data[offset] +
                imageData.data[offset + 1] +
                imageData.data[offset + 2]) /
              3; // Average of RGB
            count++;
          }
        }
        const threshold = Math.max(
          0,
          Math.min(255, Math.round(sum / count) - C),
        );
        const offset = (y * imageData.width + x) * 4;
        outputImageData.data[offset] =
          imageData.data[offset] > threshold ? 255 : 0;
        outputImageData.data[offset + 1] =
          imageData.data[offset + 1] > threshold ? 255 : 0;
        outputImageData.data[offset + 2] =
          imageData.data[offset + 2] > threshold ? 255 : 0;
        outputImageData.data[offset + 3] = 255;
      }
    }
    return outputImageData;
  }

  function findContours(imageData) {
    // Simplified contour finding (Find largest connected component)
    const outputImageData = new ImageData(imageData.width, imageData.height);
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        const offset = (y * imageData.width + x) * 4;
        if (imageData.data[offset] === 255) {
          // White pixel
          // Perform flood fill to find connected component
          floodFill(imageData, outputImageData, x, y);
          break; // Break after finding one component
        }
      }
    }

    // Find the largest connected component
    let maxArea = 0;
    let maxComponent = null;
    for (let x = 0; x < outputImageData.width; x++) {
      for (let y = 0; y < outputImageData.height; y++) {
        const offset = (y * outputImageData.width + x) * 4;
        if (outputImageData.data[offset] === 255) {
          const area = countPixels(outputImageData, x, y);
          if (area > maxArea) {
            maxArea = area;
            maxComponent = { x, y };
          }
        }
      }
    }

    return maxComponent ? [maxComponent] : []; // Return an array of contours (even if only one)
  }

  function floodFill(imageData, outputImageData, x, y) {
    const stack = [];
    stack.push({ x, y });

    while (stack.length > 0) {
      const { x, y } = stack.pop();
      const offset = (y * imageData.width + x) * 4;

      if (
        imageData.data[offset] === 255 &&
        outputImageData.data[offset] === 0
      ) {
        outputImageData.data[offset] = 255;

        if (x > 0) {
          stack.push({ x: x - 1, y });
        }
        if (x < imageData.width - 1) {
          stack.push({ x: x + 1, y });
        }
        if (y > 0) {
          stack.push({ x, y: y - 1 });
        }
        if (y < imageData.height - 1) {
          stack.push({ x, y: y + 1 });
        }
      }
    }
  }

  function countPixels(imageData, x, y) {
    let count = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 255) {
        count++;
      }
    }
    return count;
  }

  function cropAndResize(imageData, contours) {
    if (!contours.length) {
      return imageData; // No contours found
    }

    const contour = contours[0]; // Use the largest contour

    // Calculate bounding box
    let minX = contour.x,
      minY = contour.y,
      maxX = contour.x,
      maxY = contour.y;
    // ... (Logic to find minX, minY, maxX, maxY based on the contour)

    const width = maxX - minX;
    const height = maxY - minY;

    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    const croppedContext = croppedCanvas.getContext('2d');

    croppedContext.drawImage(
      imageData,
      minX,
      minY,
      width,
      height,
      0,
      0,
      width,
      height,
    );

    const croppedImageData = croppedContext.getImageData(0, 0, width, height);

    // Resize (optional, adjust size as needed)
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 128; // Example: Resize to 128x128
    resizedCanvas.height = 128;
    const resizedContext = resizedCanvas.getContext('2d');
    resizedContext.drawImage(croppedCanvas, 0, 0, 128, 128);

    const resizedImageData = resizedContext.getImageData(0, 0, 128, 128);

    return resizedImageData;
  }

  function detectEdges(imageData) {
    const outputImageData = new ImageData(imageData.width, imageData.height);
    const gx = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ];
    const gy = [
      [1, 2, 1],
      [0, 0, 0],
      [-1, -2, -1],
    ];

    for (let x = 1; x < imageData.width - 1; x++) {
      for (let y = 1; y < imageData.height - 1; y++) {
        let gxSum = 0,
          gySum = 0;
        for (let kx = -1; kx <= 1; kx++) {
          for (let ky = -1; ky <= 1; ky++) {
            const offset = ((y + ky) * imageData.width + (x + kx)) * 4;
            const gray =
              0.299 * imageData.data[offset] +
              0.587 * imageData.data[offset + 1] +
              0.114 * imageData.data[offset + 2];
            gxSum += gray * gx[ky + 1][kx + 1];
            gySum += gray * gy[ky + 1][kx + 1];
          }
        }
        const magnitude = Math.sqrt(gxSum * gxSum + gySum * gySum);
        const outputOffset = (y * outputImageData.width + x) * 4;
        outputImageData.data[outputOffset] = magnitude;
        outputImageData.data[outputOffset + 1] = magnitude;
        outputImageData.data[outputOffset + 2] = magnitude;
        outputImageData.data[outputOffset + 3] = 255;
      }
    }
    return outputImageData;
  }

  return (
    <div>
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        autoPlay
      />
      <canvas
        ref={canvasRef}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      {scanResult && (
        <div>
          <h3>Scanned Result:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
