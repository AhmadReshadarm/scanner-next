import { useState } from 'react';
import styles from '../../styles/dropDowns.module.css';

type Props = {
  title: string;
  borderBottom?: string;
  children: JSX.Element | JSX.Element[] | string | string[];
};

const InfoDropdown = ({ title, children, borderBottom }: Props) => {
  const [openInfo, setOpenInfo] = useState(true);
  const [displayInfo, setDisplayInfo] = useState('flex');
  const [rotation, setRotation] = useState(-90);

  return (
    <div style={{ border: borderBottom }} className={styles.InfoWrappers}>
      <div
        onClick={() => {
          setOpenInfo(!openInfo);
          setRotation(rotation == 90 ? -90 : 90);
          setTimeout(() => {
            setDisplayInfo(displayInfo == 'none' ? 'flex' : 'none');
          }, 200);
        }}
        title={title}
        className={styles.InfoBtnWrappers}
      >
        <h2>{title}</h2>
        <span style={{ transform: `rotate(${rotation}deg)` }}>
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
              stroke="black"
              stroke-width="3.1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
      <div
        style={{ display: displayInfo }}
        className={styles.InfoContentWrappers}
      >
        <div
          id="info-content"
          style={{ display: displayInfo }}
          className={styles.info_content}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoDropdown;
