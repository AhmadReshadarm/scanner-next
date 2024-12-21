import localFont from 'next/font/local';
export const Circe = localFont({
  src: [
    {
      path: '../../public/fonts/circe/circe-light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/circe/circe-regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/circe/circe-bold.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-Circe',
});

export const Jost = localFont({
  src: [
    {
      path: '../../public/fonts/Jost/Jost-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-Jost',
});

export const ricordi = localFont({
  src: [
    {
      path: '../../public/fonts/tt-ricordi-marmo-trial-variable.woff',
      style: 'normal',
    },
  ],
  variable: '--font-ricordi',
});
