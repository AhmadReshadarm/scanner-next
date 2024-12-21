import { AppDispatch } from 'redux/store';
import { setDefaultImageList } from 'redux/slicers/mutipleImagesSlicer';
import {
  setDefaultSingleImageList,
  deleteImage,
  fetchImages,
} from 'redux/slicers/imagesSlicer';

const handleImageDelete =
  (fileName: string, dispatch: AppDispatch, offset: number) => async () => {
    const isSaved: any = await dispatch(deleteImage({ fileName }));
    if (!isSaved.error) {
      dispatch(
        fetchImages({
          offset: String(offset),
          limit: '20',
        }),
      );
    }
  };

const handleSelectedImage = (
  filename: string,
  isProducts: boolean,
  dispatch: AppDispatch,
  index: number,
  setOpen,
  slideNum,
) => {
  if (isProducts) {
    dispatch(
      setDefaultImageList({
        file: { name: filename, url: `/api/images/${filename}` },
        index,
      }),
    );
  } else if (slideNum) {
    dispatch(
      setDefaultSingleImageList({
        name: filename,
        slideNum,
        url: `/api/images/${filename}`,
        fromDB: true,
      }),
    );
  } else {
    dispatch(
      setDefaultSingleImageList({
        name: filename,
        url: `/api/images/${filename}`,
      }),
    );
  }

  setOpen(false);
};

export { handleImageDelete, handleSelectedImage };
