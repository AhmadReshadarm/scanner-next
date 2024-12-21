import { Dispatch, SetStateAction } from 'react';

const handlePaginate =
  (
    index: number,
    selectedIndex: number,
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    paginateImage: Dispatch<SetStateAction<number>>,
  ) =>
  () => {
    setSelectedIndex(index);
    if (index != selectedIndex) {
      paginateImage(selectedIndex > index ? -1 : 1);
    }
  };

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const handleDragEnd =
  (
    paginateTo: any,
    swipeConfidenceThreshold: number,
    dragConstrain: any,
    setSelectedIndex,
    selectedIndex,
  ) =>
  (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginateTo(1);
      setSelectedIndex(
        selectedIndex < dragConstrain ? selectedIndex + 1 : selectedIndex,
      );
    } else if (swipe > swipeConfidenceThreshold) {
      paginateTo(-1);
      setSelectedIndex(selectedIndex >= 1 ? selectedIndex - 1 : selectedIndex);
    }
  };

export { handlePaginate, handleDragEnd };
