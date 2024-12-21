import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';

type Props = {
  title: string;
  borderBottom?: string;
  children: JSX.Element | JSX.Element[] | string | string[];
};

const InfoDropdown = ({ title, children, borderBottom }: Props) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [displayInfo, setDisplayInfo] = useState('none');

  return (
    <InfoWrappers style={{ border: borderBottom }}>
      <InfoBtnWrappers
        onClick={() => {
          setOpenInfo(!openInfo);
          setTimeout(() => {
            setDisplayInfo(displayInfo == 'none' ? 'flex' : 'none');
          }, 200);
        }}
      >
        <h2 style={{ fontWeight: 600 }}>{title}</h2>
        <motion.span
          animate={openInfo ? 'open' : 'close'}
          variants={variants.rotate}
        >
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
        </motion.span>
      </InfoBtnWrappers>
      <InfoContentWrappers
        style={{ display: displayInfo }}
        animate={{
          padding: openInfo ? '15px' : 0,
        }}
        transition={{ duration: 0.3, padding: { delay: 0.1 } }}
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

const InfoWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${color.textSecondary};
`;

const InfoBtnWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  h2 {
    font-size: 1rem;
  }
  span {
    transform: rotate(90deg);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const InfoContentWrappers = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
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
