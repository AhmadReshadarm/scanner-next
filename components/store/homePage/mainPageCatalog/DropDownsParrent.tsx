import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[] | string | string[];
  setIndex: any;
  index: number;
  paginateImage: any;
  stateIndex: number;
};

const InfoDropdown = ({
  title,
  children,
  setIndex,
  index,
  paginateImage,
  stateIndex,
}: Props) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [displayInfo, setDisplayInfo] = useState('none');

  return (
    <InfoWrappers>
      <InfoBtnWrappers
        title={title}
        onClick={() => {
          if (!openInfo && index !== stateIndex) {
            setIndex(index);
            paginateImage(stateIndex > index ? -1 : 1);
          }
          setOpenInfo(!openInfo);
          setTimeout(() => {
            setDisplayInfo(displayInfo == 'none' ? 'flex' : 'none');
          }, 200);
        }}
      >
        <div className="dropdown-btn-wrapper">
          <h2 style={{ fontWeight: openInfo ? '500' : '200' }}>{title}</h2>
          <motion.span
            animate={{
              rotate: openInfo ? 0 : 180,
            }}
            transition={{ duration: 0.001 }}
          >
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_27_2)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.22807 1.33891V20H7.38736V1.33891L0.7176 7.25493C0.553437 7.40807 0.287283 7.40807 0.123121 7.25493C-0.0410404 7.10173 -0.0410404 6.85347 0.123121 6.70033L7.51043 0.114859C7.67464 -0.0382864 7.94079 -0.0382864 8.10493 0.114859L14.8769 6.6864C15.0411 6.8396 15.0411 7.08787 14.8769 7.241C14.7127 7.39413 14.4466 7.39413 14.2824 7.241L8.22807 1.33891Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_27_2">
                  <rect width="15" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </motion.span>
        </div>
      </InfoBtnWrappers>
      <InfoContentWrappers
        style={{ display: displayInfo }}
        animate={{
          padding: openInfo ? '15px 15px 50px 15px' : 0,
        }}
        transition={{ duration: 0.2, padding: { delay: 0.1 } }}
      >
        <motion.div
          id="info-content"
          style={{ display: displayInfo }}
          animate={{
            opacity: openInfo ? 1 : 0,
          }}
        >
          {children}
        </motion.div>
      </InfoContentWrappers>
    </InfoWrappers>
  );
};

export const InfoWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const InfoBtnWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid ${color.textSecondary};
  .dropdown-btn-wrapper {
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 2rem;
      transition: 300ms;
    }
    span {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      transition: 300ms;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  @media ${devices.tabletL} {
    .dropdown-btn-wrapper {
      h2 {
        font-size: 1.2rem;
        font-weight: 300 !important;
      }
    }
  }
  @media ${devices.tabletS} {
    .dropdown-btn-wrapper {
      h2 {
        font-size: 1.2rem;
        font-weight: 300 !important;
      }
    }
  }
  @media ${devices.mobileL} {
    .dropdown-btn-wrapper {
      h2 {
        font-size: 1.2rem;
        font-weight: 300 !important;
      }
    }
  }
  @media ${devices.mobileM} {
    .dropdown-btn-wrapper {
      h2 {
        font-size: 1.2rem;
        font-weight: 300 !important;
      }
    }
  }
  @media ${devices.mobileS} {
    .dropdown-btn-wrapper {
      h2 {
        font-size: 1.2rem;
        font-weight: 300 !important;
      }
    }
  }
`;

const InfoContentWrappers = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  #info-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
  }
`;

export default InfoDropdown;
