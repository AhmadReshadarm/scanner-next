import { openErrorNotification } from 'common/helpers';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import {
  createImage,
  removeImageFromList,
  setDefaultSingleImageList,
} from 'redux/slicers/imagesSlicer';

function getImageSize(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      if (image.width !== 820 || image.height !== 1024) {
        resolve(true);
      }
      resolve(false);
    };
  });
}
export function useUploadImage(slideNum: number | undefined): any {
  const [progress, setProgress] = useState(0);
  const [catalogUpload, setCatalogUpload] = useState(false);

  const dispatch = useAppDispatch();

  async function uploadImage(options) {
    const { onSuccess, onError, file, onProgress } = options;
    const isOutOfScopSize = await getImageSize(file);
    if (isOutOfScopSize && catalogUpload) {
      openErrorNotification(
        `Размер изображения должен быть (ширина: 820 пикселей и высота: 1024 пикселя)`,
      );
      return;
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    try {
      if (slideNum) {
        await dispatch(setDefaultSingleImageList({ file, slideNum }));
      } else {
        await dispatch(setDefaultSingleImageList(file));
      }

      await dispatch(
        createImage({
          config,
          file,
        }),
      );

      onSuccess('Ok');
    } catch (error: any) {
      onError({ error });
    }
  }

  const handleRemoveImage = (options) => {
    dispatch(removeImageFromList(options.name));
  };

  return {
    uploadImage,
    progress,
    setCatalogUpload,
    handleRemoveImage,
  };
}
