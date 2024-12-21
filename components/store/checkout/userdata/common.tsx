import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { styleProps } from 'components/store/lib/types';
import { devices } from 'components/store/lib/Devices';

const DetailsRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${(p: styleProps) => p.justifycontent};
  align-items: center;
  gap: 10px;
  @media ${devices.tabletS} {
    flex-direction: column;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;
const DetailsColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 5px;
    span {
      @media ${devices.tabletL} {
        font-size: 0.6rem;
      }
      @media ${devices.tabletS} {
        font-size: 0.6rem;
      }
      @media ${devices.mobileL} {
        font-size: 0.6rem;
      }
    }
    .tool-tip {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
    }
    .required {
      color: ${color.hover};
    }
    @media ${devices.tabletL} {
      font-size: 13px;
      width: 100%;
      padding-right: 0;

      &.MuiInputLabel-root {
        font-size: 14px;
      }
    }
    @media ${devices.tabletS} {
      font-size: 13px;
      width: 100%;
      padding-right: 0;

      &.MuiInputLabel-root {
        font-size: 14px;
      }
    }
    @media ${devices.mobileL} {
      font-size: 13px;
      width: 100%;
      padding-right: 0;

      &.MuiInputLabel-root {
        font-size: 14px;
      }
    }
  }
  .MuiOutlinedInput-input {
    overflow: hidden;
  }
`;

export { DetailsRowWrapper, DetailsColumnWrapper };
