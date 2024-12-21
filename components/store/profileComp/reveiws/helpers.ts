import { createImage } from 'redux/slicers/imagesSlicer';
import { AppDispatch } from 'redux/store';

const handleFileChange = async (
  event: any,
  setSrc: any,
  dispatch: AppDispatch,
) => {
  const fileObj = event.target.files;
  if (!fileObj[0]) {
    return;
  }
  const imagesUrl: any = [];
  for (let i = 0; i < fileObj.length; i++) {
    imagesUrl.push(URL.createObjectURL(fileObj[i]));

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    try {
      await dispatch(
        createImage({
          config,
          file: fileObj[i],
        }),
      );
    } catch (error: any) {}
  }
  setSrc(imagesUrl);
};

export { handleFileChange };
