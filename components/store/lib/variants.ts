import color from './ui.colors';
const variants = {
  fadInOut: {
    start: {
      opacity: 0,
    },
    middle: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    end: {
      opacity: 0,
      transition: { ease: 'easeInOut', delay: 0.1 },
    },
  },
  grow: {
    hover: (scale: number) => {
      return {
        scale: scale,
        transition: { duration: 0.2 },
      };
    },
    tap: {
      scale: 1,
    },
  },
  boxShadow: {
    hover: {
      boxShadow: `0px 5px 10px 0px ${color.boxShadowBtn}`,

      transition: { duration: 0.2 },
    },
    tap: {
      boxShadow: '0px 0px 0px 0px #ffffff',
    },
  },
  fadeInSlideIn: {
    init: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 60,
      opacity: 0,
    },
  },
  fadeOutSlideOut: {
    init: {
      y: -60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -60,
      opacity: 0,
    },
  },
  slideRight: {
    init: {
      x: 0,
      opacity: 1,
    },
    animate: {
      x: 15,
      opacity: 0,
    },
  },
  fadeOut: {
    init: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
    },
  },
  slider: {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 200 : -200,
        opacity: 0.01,
        zIndex: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 200 : -200,
        opacity: 0.01,
      };
    },
  },

  sliderProduct: {
    enter: (direction: number) => {
      return {
        y: direction > 0 ? 150 : -150,
        opacity: 0,
        zIndex: 0,
      };
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        y: direction < 0 ? 150 : -150,
        opacity: 0,
      };
    },
  },

  slider_auth: {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 350 : -350,
        opacity: 0,
        zIndex: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
  },

  sliderX: {
    animate: (direction: number) => {
      return {
        x: direction,
      };
    },
  },
  sliderY: {
    animate: (direction: number) => {
      return {
        y: direction,
      };
    },
  },
  fadInSlideUp: {
    init: {
      y: 30,
      opacity: 0,
    },
    animate: (duration: number) => {
      return {
        y: 0,
        opacity: 1,
        transition: {
          delay: duration,
        },
      };
    },
    exit: {
      y: 30,
      opacity: 0,
    },
  },
  fadeIn: {
    init: {
      opacity: 0,
    },
    animate: (duration: number) => ({
      opacity: 1,
      transition: {
        delay: duration,
      },
    }),
    exit: {
      opacity: 0,
    },
  },
  fadeInReveal: {
    close: {
      opacity: 0,
      y: 30,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 },
    },
  },
  slideInFromRigh: {
    init: {
      x: 45,
      opacity: 0,
    },
    animate: (delay: number) => {
      return {
        x: 0,
        opacity: 1,
        transition: {
          delay: delay,
        },
      };
    },
    exit: (delay: number) => {
      return {
        x: -45,
        opacity: 0,
        transition: {
          delay: delay,
        },
      };
    },
  },
  rotate: {
    close: {
      rotate: 90,
    },
    open: {
      rotate: -90,
    },
  },
  progress: {
    empty: {
      width: '0%',
      opacity: 0,
    },
    fill: {
      width: '100%',
      opacity: 1,
    },
  },
  authorizeSlideX: {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? -550 : 550,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
  },
  pswConfidential: {
    hide: (direction: number) => {
      return {
        y: direction > 0 ? -40 : 40,
        opacity: 0,
      };
    },
    show: {
      y: 0,
      opacity: 1,
    },
  },
};

export default variants;
