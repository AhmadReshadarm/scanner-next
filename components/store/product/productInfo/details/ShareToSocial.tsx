import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { handleMobileShare } from './helpers';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { useInViewportNoDelay } from 'components/store/storeLayout/useInViewport';
import styles from '../../styles/shareToSocial.module.css';
import dynamic from 'next/dynamic';
const ShareToSocialContent = dynamic(() => import('./ShareToSocialContent'));

type Props = {
  productId?: string;
  title?: string;
  artical?: string;
};

const ShareToSocial: React.FC<Props> = ({ title, artical }) => {
  const router = useRouter();
  // _______________socila menu hooks _______________
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setOpen,
      setDisplay,
    ),
  );
  const closeHandler = () => {
    setOpen(!isOpen);
    setTimeout(() => {
      setDisplay(
        display === PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    }, 100);
  };

  const shareData = {
    title: title,
    url: `${baseUrl}${router.asPath}`,
  };

  const { isInViewport, ref } = useInViewportNoDelay();

  return (
    <div className={styles.SocialParent}>
      <div className={styles.product_artical_wrapper}>
        <span>{`Артикул товара: ${artical?.toLocaleUpperCase()}`}</span>
      </div>
      <button
        className={styles.share_btn_pc}
        ref={btnNode}
        onClick={() => closeHandler()}
        title="Поделиться в социальных сетях"
        type="button"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.8107 11.3975L11.7704 17.7666C11.9827 18.5159 12.26 19.1221 12.6002 19.5382C12.9426 19.9569 13.4115 20.2483 13.964 20.1574C14.4828 20.0721 14.8966 19.6734 15.2143 19.164C15.5392 18.643 15.8199 17.9196 16.0452 17.006L20.7918 1.01729C20.8572 0.797135 20.7642 0.560762 20.5663 0.444192C20.4881 0.398121 20.4014 0.375446 20.3153 0.374989C20.2443 0.364174 20.1703 0.368548 20.098 0.39001L4.10819 5.13547C3.19452 5.36068 2.47101 5.64132 1.95002 5.96615C1.44058 6.28378 1.04189 6.69747 0.956497 7.21622C0.865553 7.76871 1.15715 8.23761 1.57583 8.57985C1.9919 8.91994 2.59813 9.19718 3.34748 9.40941L9.8107 11.3975ZM3.63606 8.45194L9.85185 10.3639L18.4551 1.92069L4.38137 6.0975C4.37374 6.09976 4.36607 6.10185 4.35834 6.10374C3.49616 6.31544 2.87978 6.5649 2.47909 6.81472C2.06465 7.07312 1.95939 7.28037 1.94322 7.37865C1.93259 7.4432 1.9418 7.58742 2.20871 7.80559C2.47719 8.02505 2.93935 8.25497 3.625 8.44868L3.62504 8.44855L3.63606 8.45194ZM12.7279 17.478L10.8155 11.2627L19.2611 2.65972L15.0832 16.7327C15.0818 16.7373 15.0805 16.742 15.0792 16.7467C15.0784 16.7497 15.0777 16.7527 15.0769 16.7557C14.8652 17.6178 14.6157 18.2342 14.3658 18.6348C14.1073 19.0492 13.9 19.1545 13.8016 19.1707C13.7369 19.1813 13.5926 19.172 13.3744 18.9052C13.1549 18.6367 12.9249 18.1746 12.7312 17.489L12.7313 17.489L12.7279 17.478Z"
            fill="#AAB4BD"
          />
        </svg>
        <span>Поделиться</span>
      </button>
      <button
        className={styles.share_btn_mobile}
        onClick={() => handleMobileShare(shareData)}
        onTouchStart={() => handleMobileShare(shareData)}
        title="Поделиться в социальных сетях"
        type="button"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.8107 11.3975L11.7704 17.7666C11.9827 18.5159 12.26 19.1221 12.6002 19.5382C12.9426 19.9569 13.4115 20.2483 13.964 20.1574C14.4828 20.0721 14.8966 19.6734 15.2143 19.164C15.5392 18.643 15.8199 17.9196 16.0452 17.006L20.7918 1.01729C20.8572 0.797135 20.7642 0.560762 20.5663 0.444192C20.4881 0.398121 20.4014 0.375446 20.3153 0.374989C20.2443 0.364174 20.1703 0.368548 20.098 0.39001L4.10819 5.13547C3.19452 5.36068 2.47101 5.64132 1.95002 5.96615C1.44058 6.28378 1.04189 6.69747 0.956497 7.21622C0.865553 7.76871 1.15715 8.23761 1.57583 8.57985C1.9919 8.91994 2.59813 9.19718 3.34748 9.40941L9.8107 11.3975ZM3.63606 8.45194L9.85185 10.3639L18.4551 1.92069L4.38137 6.0975C4.37374 6.09976 4.36607 6.10185 4.35834 6.10374C3.49616 6.31544 2.87978 6.5649 2.47909 6.81472C2.06465 7.07312 1.95939 7.28037 1.94322 7.37865C1.93259 7.4432 1.9418 7.58742 2.20871 7.80559C2.47719 8.02505 2.93935 8.25497 3.625 8.44868L3.62504 8.44855L3.63606 8.45194ZM12.7279 17.478L10.8155 11.2627L19.2611 2.65972L15.0832 16.7327C15.0818 16.7373 15.0805 16.742 15.0792 16.7467C15.0784 16.7497 15.0777 16.7527 15.0769 16.7557C14.8652 17.6178 14.6157 18.2342 14.3658 18.6348C14.1073 19.0492 13.9 19.1545 13.8016 19.1707C13.7369 19.1813 13.5926 19.172 13.3744 18.9052C13.1549 18.6367 12.9249 18.1746 12.7312 17.489L12.7313 17.489L12.7279 17.478Z"
            fill="#AAB4BD"
          />
        </svg>
        <span>Поделиться</span>
      </button>
      <div
        ref={menuNode}
        style={{ display: display }}
        className={styles.ShareToSocialWrapper}
      >
        <ul ref={ref}>{isInViewport ? <ShareToSocialContent /> : ''}</ul>
      </div>
    </div>
  );
};

export default ShareToSocial;
