import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import Header from './Header';
const Footer = dynamic(() => import('./Footer'), {
  ssr: false,
});
const GoogleAnalytics = dynamic(
  () => import('@next/third-parties/google').then((mod) => mod.GoogleAnalytics),
  {
    ssr: false,
  },
);

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMetrics, setIsMetrics] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMetrics(true);
    }, 10000);
  }, []);
  return (
    <>
      {isMetrics ? (
        <>
          <GoogleAnalytics gaId="G-LPMTNCKRGT" />
          <Script
            id="yandex-tag"
            src="/yandex.js"
            onError={(err) => {
              console.error('Error', err);
            }}
            defer={true}
          />

          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/96632717"
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
          <Script
            id="bing-tag"
            src="/bing.js"
            onError={(err) => {
              console.error('Error', err);
            }}
            defer={true}
          />
        </>
      ) : (
        ''
      )}

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default StoreLayout;
