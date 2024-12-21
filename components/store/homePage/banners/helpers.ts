import { Dispatch, MutableRefObject, SetStateAction } from 'react';

const paginateBrandForward =
  (
    slideTo: number,
    brandsRef: MutableRefObject<any>,
    setWidth: Dispatch<SetStateAction<number>>,
    setSlideTo: Dispatch<SetStateAction<number>>,
  ) =>
  () => {
    setWidth(brandsRef.current.scrollWidth - brandsRef.current.offsetWidth);
    slideTo > -200 ? setSlideTo(0) : setSlideTo(slideTo + 200);
  };

const paginateBrandBack =
  (
    slideTo: number,
    width: number,
    brandsRef: MutableRefObject<any>,
    setWidth: Dispatch<SetStateAction<number>>,
    setSlideTo: Dispatch<SetStateAction<number>>,
  ) =>
  () => {
    setWidth(brandsRef.current.scrollWidth - brandsRef.current.offsetWidth);
    slideTo < -width + 200 ? setSlideTo(-width) : setSlideTo(slideTo - 200);
  };

export { paginateBrandForward, paginateBrandBack };
