import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { handleEdit, handleHover } from './helpers';
import { useState } from 'react';
import { devices } from 'components/store/lib/Devices';
import { styleProps } from 'components/store/lib/types';

const KeyValue = (props: any) => {
  const { keyData, valueData, delay, settingsRef, setActive } = props;
  const [ishovered, setHovered] = useState(false);
  return (
    <KeyValueWrapper
      initial="init"
      whileInView="animate"
      custom={delay}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      className="key-value-wrapper"
      onMouseEnter={() => handleHover(ishovered, setHovered)}
      onMouseLeave={() => handleHover(ishovered, setHovered)}
    >
      <span className="key">{keyData}</span>
      <div className="value">
        <span>{valueData}</span>
        <EditData
          display={!ishovered ? 'none' : 'block'}
          onClick={() => handleEdit(settingsRef, setActive)}
        >
          Изменить данные
        </EditData>
      </div>
    </KeyValueWrapper>
  );
};

const KeyValueWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  padding: 10px 20px;
  font-size: 1rem;
  &:hover {
    background-color: #0000000d;
  }
  .key {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: ${color.textSecondary};
  }
  .value {
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    .edit-data {
      display: ${(p: styleProps) => p.display};
      cursor: pointer;
      color: ${color.textSecondary};
      &:hover {
        color: ${color.hover};
      }
    }
  }

  @media ${devices.tabletL} {
    gap: 10px;
    .edit-data {
      display: none;
    }
    .key {
      width: 100%;
    }
    .value {
      width: 100%;
    }
  }
  @media ${devices.tabletS} {
    gap: 10px;
    .edit-data {
      display: none;
    }
    .key {
      width: 100%;
    }
    .value {
      width: 100%;
    }
  }
  @media ${devices.mobileL} {
    gap: 10px;
    .edit-data {
      display: none;
    }
    .key {
      width: 100%;
    }
    .value {
      width: 100%;
    }
  }
  @media ${devices.mobileM} {
    gap: 10px;
    .edit-data {
      display: none;
    }
    .key {
      width: 100%;
    }
    .value {
      width: 100%;
    }
  }
  @media ${devices.mobileS} {
    gap: 10px;
    .edit-data {
      display: none;
    }
  }
  .key {
    width: 100%;
  }
  .value {
    width: 100%;
  }
`;

const EditData = styled.span`
  display: ${(p: styleProps) => p.display};
  cursor: pointer;
  color: ${color.textSecondary};
  &:hover {
    color: ${color.hover};
  }
  @media ${devices.tabletL} {
    display: none;
  }
  @media ${devices.tabletS} {
    display: none;
  }
  @media ${devices.mobileL} {
    display: none;
  }
`;

export default KeyValue;
