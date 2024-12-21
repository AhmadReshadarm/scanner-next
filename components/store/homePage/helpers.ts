import { Dispatch, SetStateAction } from "react";
import { Product } from "swagger/services";

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const paginateForward =
  (page: number, setPage: Dispatch<SetStateAction<[number, number]>>) => () => {
    setPage([page + 1, 1]);
  };

const paginateBack =
  (page: number, setPage: Dispatch<SetStateAction<[number, number]>>) => () => {
    setPage([page - 1, -1]);
  };

const handleDragEnd =
  (page: number, swipeConfidenceThreshold: number, setSlideTo: Dispatch<SetStateAction<[number, number]>>) =>
    (e, { offset, velocity }) => {
      const swipe = swipePower(offset.x, velocity.x);
      if (swipe < -swipeConfidenceThreshold) {
        paginateForward(page, setSlideTo)
      } else if (swipe > swipeConfidenceThreshold) {
        paginateBack(page, setSlideTo)
      }
    };

const handleWishBtnClick = (product: Product, setWish: Dispatch<SetStateAction<boolean>>, onWishBtnClick: (product: Product) => void) => () => {
  setWish(prev => !prev);
  onWishBtnClick(product);
}

export { paginateForward, paginateBack, handleDragEnd, handleWishBtnClick };