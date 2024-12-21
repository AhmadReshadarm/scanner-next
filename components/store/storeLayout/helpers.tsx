import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from './constants';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
import { AppDispatch } from 'redux/store';

const paginateHandler = () => {
  const widthOrHeightRef = useRef<any>();

  const [refType, setRefType]: [any, any] = useState('width');
  const [widthOrHeight, setWidthOrHeight] = useState(0);
  const [slideTo, setSlideTo] = useState(0);
  const [slideAmount, setSlideAmount] = useState(0);

  useEffect(() => {
    refType == 'width'
      ? setWidthOrHeight(
          widthOrHeightRef.current.scrollWidth -
            widthOrHeightRef.current.offsetWidth,
        )
      : setWidthOrHeight(
          widthOrHeightRef.current.scrollHeight -
            widthOrHeightRef.current.offsetHeight,
        );
  });

  const paginate = (direction: number) => {
    if (direction > 0) {
      slideTo > -slideAmount
        ? setSlideTo(0)
        : setSlideTo(slideTo + slideAmount);
    } else {
      slideTo < -widthOrHeight + slideAmount
        ? setSlideTo(-widthOrHeight)
        : setSlideTo(slideTo - slideAmount);
    }
  };

  return [
    setRefType,
    widthOrHeightRef,
    widthOrHeight,
    slideTo,
    paginate,
    setSlideAmount,
  ];
};

const UseImagePaginat = () => {
  const [[page, direction], setPage]: [[number, number], any] = useState([
    0, 0,
  ]);

  const paginateImage = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return [page, direction, setPage, paginateImage];
};

const outsideClickListner = (
  listening: any,
  setListening: any,
  menuRef: any,
  btnRef: any,
  setIsOpened: Dispatch<SetStateAction<boolean>>,
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
) => {
  return () => {
    if (listening) return;
    if (!menuRef || !btnRef) return;

    setListening(true);

    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const node = evt.target;
        if (menuRef.contains(node) || btnRef.contains(node)) return;
        setIsOpened(false);
        setTimeout(() => setDisplay(PopupDisplay.None), 150);
      });
    });
  };
};
// ---------------------- menu handlers and hooks -----------------------------
const outsideClickListnerRedux = (
  listening: boolean,
  setListening: Dispatch<SetStateAction<boolean>>,
  menuRef: HTMLDivElement | any,
  btnRef: HTMLDivElement | any,
  dispatch: AppDispatch,
  ChangeIsOpenState: any,
  ChangeDisplayState: any,
) => {
  return () => {
    if (listening) return;
    if (!menuRef || !btnRef) return;

    setListening(true);

    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const node = evt.target;
        if (menuRef.contains(node) || btnRef.contains(node)) return;
        dispatch(ChangeIsOpenState(false));

        setTimeout(() => {
          dispatch(ChangeDisplayState(PopupDisplay.None));
        }, 100);
      });
    });
  };
};

const handleMenuStateRedux =
  (
    dispatch: AppDispatch,
    ChangeIsOpenState: any,
    ChangeDisplayState: any,
    isOpenState: boolean,
    displayState: PopupDisplay,
  ) =>
  () => {
    dispatch(ChangeIsOpenState(!isOpenState));

    setTimeout(() => {
      dispatch(
        ChangeDisplayState(
          displayState == PopupDisplay.None
            ? PopupDisplay.Flex
            : PopupDisplay.None,
        ),
      );
    }, 100);
  };

// ------------------------- end of menu state hooks and handlers ------------------------
const handleMenuState =
  (
    setIsOpened: Dispatch<SetStateAction<boolean>>,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
  ) =>
  () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) =>
        prev == PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    }, 150);
  };

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
const handleDragEnd =
  (paginateTo: any, swipeConfidenceThreshold: number) =>
  (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginateTo(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginateTo(-1);
    }
  };

const overrideDefaultIOSZoom = () => {
  const addMaximumScaleToMetaViewport = () => {
    const el = document.querySelector('meta[name=viewport]');

    if (el !== null) {
      let content: any = el.getAttribute('content');
      let re = /maximum\-scale=[0-9\.]+/g;

      if (re.test(content)) {
        content = content.replace(re, 'maximum-scale=1.0');
      } else {
        content = [content, 'maximum-scale=1.0'].join(', ');
      }

      el.setAttribute('content', content);
    }
  };

  const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

  const isIphone = () => {
    if (typeof window === `undefined` || typeof navigator === `undefined`)
      return false;

    return /iPhone/i.test(
      navigator.userAgent ||
        navigator.vendor ||
        (window.opera && opera.toString() === `[object Opera]`),
    );
  };

  if (isIphone()) {
    disableIosTextFieldZoom();
  }
};

const acceptedCookies = (setOpen: any) => {
  const isAgree = localStorage.getItem('agree-cookies');
  if (isAgree && JSON.parse(isAgree) === 1) {
    setOpen(false);
  }
  if (!isAgree || JSON.parse(isAgree) === 0) {
    setOpen(true);
  }
};

const handleCookiesClick = (setOpen: any) => {
  localStorage.setItem('agree-cookies', '1');
  setOpen(false);
};

const handleSearchclosed = (dispatch: AppDispatch) => {
  dispatch(clearSearchProducts());
  dispatch(clearSearchQuery());
};

declare const window: any;
declare const opera: any;
export {
  paginateHandler,
  UseImagePaginat,
  outsideClickListner,
  outsideClickListnerRedux,
  handleDragEnd,
  handleMenuState,
  handleMenuStateRedux,
  overrideDefaultIOSZoom,
  acceptedCookies,
  handleCookiesClick,
  handleSearchclosed,
};
