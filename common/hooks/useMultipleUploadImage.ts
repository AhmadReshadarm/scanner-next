import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { createImage, removeImageFromList, setDefaultImageList } from 'redux/slicers/mutipleImagesSlicer';

export function useMultipleUploadImage(index: number | undefined):
  any {

  const [progress, setProgress] = useState(0);

  const dispatch = useAppDispatch()

  async function uploadImage(options) {
    const { onSuccess, onError, file, onProgress } = options;

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };

    try {

      await dispatch(setDefaultImageList({ file, index }))

      await dispatch(createImage({
        config,
        file,
        index
      }))

      onSuccess("Ok");
    } catch (error: any) {
      onError({ error });
    }

  }

  const handleRemoveImage = (options) => {
    dispatch(removeImageFromList({ name: options.name, index }))
  }

  return {
    uploadImage,
    progress,
    handleRemoveImage
  }
}