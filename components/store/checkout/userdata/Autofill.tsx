import styled from 'styled-components';
import React from 'react';
import TextField from '@mui/material/TextField';
import color from '../../lib/ui.colors';
import { handleHiddenInputChange } from './helpers';
import { InputsTooltip } from '../helpers';
import { initialStateAdress } from './constant';

const AutoFill = (props: any) => {
  const { address, setAddress, setPostCode, setViewPort, mapRef } = props;
  const handleReset = () => {
    setViewPort({ ...initialStateAdress });
    mapRef.current.setCenter(initialStateAdress.center);
    mapRef.current.setZoom(initialStateAdress.zoom);
  };
  return (
    <>
      <TextAreaWrapper>
        <label htmlFor="address-autofill">
          <b>
            <span>Ваш адрес</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="address-tip"
            title={
              <React.Fragment>
                <span>
                  Пример: Санкт-Петербург, ТЦ Villa - ул. Савушкина д.119,
                  корп.3, 2 этаж, В-59
                </span>
                <span>Или</span>
                <span>
                  Определить местоположение с нажав на кнопку местоположения
                </span>
                <span>
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 2C11.7405 2.00013 10.037 2.61861 8.68729 3.74735C7.33756 4.87609 6.42744 6.44328 6.11602 8.175C6.06695 8.43359 5.91791 8.66241 5.70122 8.81183C5.48454 8.96124 5.21768 9.0192 4.95854 8.97314C4.69939 8.92707 4.46886 8.7807 4.31694 8.56576C4.16502 8.35083 4.10396 8.08466 4.14702 7.825C4.94002 3.377 8.82402 0 13.5 0C16.0196 0 18.4359 1.00089 20.2175 2.78249C21.9991 4.56408 23 6.98044 23 9.5C23 14.176 19.623 18.06 15.175 18.853C14.9138 18.8994 14.6448 18.8401 14.4273 18.6882C14.2097 18.5363 14.0614 18.3042 14.015 18.043C13.9686 17.7818 14.0279 17.5128 14.1798 17.2952C14.3317 17.0777 14.5638 16.9294 14.825 16.883C16.6707 16.5531 18.3259 15.5439 19.4644 14.0542C20.6029 12.5645 21.1422 10.7025 20.9759 8.83492C20.8096 6.96738 19.9499 5.22985 18.5661 3.96472C17.1824 2.6996 15.3749 1.99864 13.5 2V2Z"
                      fill="black"
                    />
                    <path
                      d="M15.707 7.29299C15.8516 7.4376 15.9484 7.62308 15.9844 7.82442C16.0203 8.02576 15.9936 8.23327 15.908 8.41899L9.90798 21.419C9.82599 21.5963 9.69386 21.7457 9.52791 21.8488C9.36197 21.9518 9.16947 22.004 8.97419 21.9989C8.77891 21.9938 8.5894 21.9316 8.42907 21.82C8.26873 21.7085 8.14459 21.5523 8.07198 21.371L6.22998 16.77L1.62798 14.93C1.44634 14.8575 1.28993 14.7334 1.17812 14.5729C1.0663 14.4125 1.00398 14.2228 0.998876 14.0273C0.993768 13.8318 1.04609 13.6391 1.14938 13.473C1.25266 13.307 1.40237 13.1748 1.57998 13.093L14.58 7.09299C14.7656 7.0072 14.9731 6.98038 15.1744 7.01614C15.3757 7.0519 15.5613 7.14853 15.706 7.29299H15.707ZM4.52998 13.934L7.37198 15.072C7.49769 15.1223 7.61189 15.1976 7.70763 15.2933C7.80338 15.3891 7.87868 15.5033 7.92898 15.629L9.06698 18.471L12.956 10.045L4.52998 13.935V13.934Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        {address != '' ? (
          <span className="address-clear-btn" onClick={() => handleReset()}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="-1"
                x2="26.3541"
                y2="-1"
                transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="1"
                y1="-1"
                x2="26.3044"
                y2="-1"
                transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </span>
        ) : (
          ''
        )}
        <TextField
          fullWidth
          label="Укажите адресс"
          multiline
          maxRows={Infinity}
          value={address}
          defaultValue=""
          onChange={(e) => handleHiddenInputChange(e, setAddress)}
        />
      </TextAreaWrapper>
    </>
  );
};

const TextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
  position: relative;
  user-select: none;
  .address-clear-btn {
    position: absolute;
    right: 0px;
    top: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 5px;

    .tool-tip {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
      text-align: center;
      font-size: 12px;
    }
    .required {
      color: ${color.hover};
    }
  }
`;

const AutoFillWrapper = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    height: 0;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

export default AutoFill;
