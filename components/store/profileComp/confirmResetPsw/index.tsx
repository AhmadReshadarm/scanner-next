import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import isEmpty from 'validator/lib/isEmpty';
import React, { useEffect, useState } from 'react';
import { InputsTooltip } from 'components/store/checkout/helpers';
import { handleResetClick } from './helpers';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
const ConfirmResetPsw = () => {
  const [psw, setPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');
  const [pswErr, setPswErr] = useState(false);
  const [repeatErr, setrepeatErr] = useState(false);
  const [isCap, setCap] = useState(false);
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isCap) openErrorNotification('Включен Капс лок (Caps Lock on)');
    if (!isCap) openSuccessNotification('Капс лок выключен (Caps Lock off)');
  }, [isCap]);
  return (
    <Wrapper>
      <Title>Сбросить пароль</Title>
      <AuthInputsWrapper>
        <label htmlFor="signin-psw">
          <b>
            <span>Пароль</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="psw-tip"
            title={
              <React.Fragment>
                <span>Это поле обязательно к заполнению</span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        <AuthInput
          placeholder={pswErr ? 'Пароль не может быть пустым' : 'Пароль'}
          type={confidentiality}
          id="signin-psw"
          value={psw}
          style={{
            border:
              isEmpty(repeatPsw) && repeatErr
                ? `solid 1px ${color.hover}`
                : 'none',
          }}
          onChange={(e) => {
            setPsw(e.target.value);
            setPswErr(isEmpty(e.target.value) ? true : false);
          }}
          onKeyUp={(e) => setCap(e.getModifierState('CapsLock') ? true : false)}
        />
        <ConfidentialityWrapper>
          <span className="content-confidentiality">
            <motion.span
              custom={secret}
              animate={confidentiality == 'password' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(1);
                setConfidentiality('text');
              }}
            >
              <svg
                width="37"
                height="22"
                viewBox="0 0 37 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M33.0911 10.3713C33.0911 11.9698 31.8911 13.7212 29.2781 15.1541C26.7164 16.5589 23.082 17.4713 18.9911 17.4713C14.9001 17.4713 11.2658 16.5589 8.7041 15.1541C6.09112 13.7212 4.89109 11.9698 4.89109 10.3713C4.89109 8.77267 6.09112 7.02131 8.7041 5.58838C11.2658 4.18358 14.9001 3.27125 18.9911 3.27125C23.082 3.27125 26.7164 4.18358 29.2781 5.58838C31.8911 7.02131 33.0911 8.77267 33.0911 10.3713ZM34.4911 10.3713C34.4911 15.0657 27.5515 18.8713 18.9911 18.8713C10.4307 18.8713 3.49109 15.0657 3.49109 10.3713C3.49109 5.67683 10.4307 1.87125 18.9911 1.87125C27.5515 1.87125 34.4911 5.67683 34.4911 10.3713ZM18.9911 15.8713C22.0287 15.8713 24.4911 13.4088 24.4911 10.3713C24.4911 7.33368 22.0287 4.87125 18.9911 4.87125C15.9535 4.87125 13.4911 7.33368 13.4911 10.3713C13.4911 13.4088 15.9535 15.8713 18.9911 15.8713ZM0 20L35.5 0L36.4817 1.7425L0.981687 21.7425L0 20Z"
                  fill="black"
                />
              </svg>
            </motion.span>
            <motion.span
              custom={secret}
              animate={confidentiality == 'text' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(-1);
                setConfidentiality('password');
              }}
            >
              <svg
                width="28"
                height="16"
                viewBox="0 0 28 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.6 7.93333C26.6 9.3989 25.5379 11.0055 23.2093 12.325C20.9225 13.6209 17.6694 14.4667 14 14.4667C10.3306 14.4667 7.07752 13.6209 4.79072 12.325C2.46208 11.0055 1.4 9.3989 1.4 7.93333C1.4 6.46777 2.46208 4.86121 4.79072 3.54165C7.07752 2.2458 10.3306 1.4 14 1.4C17.6694 1.4 20.9225 2.2458 23.2093 3.54165C25.5379 4.86121 26.6 6.46777 26.6 7.93333ZM28 7.93333C28 12.3148 21.732 15.8667 14 15.8667C6.26801 15.8667 0 12.3148 0 7.93333C0 3.55187 6.26801 0 14 0C21.732 0 28 3.55187 28 7.93333ZM14 13.0667C16.7436 13.0667 18.9677 10.7684 18.9677 7.93333C18.9677 5.09827 16.7436 2.8 14 2.8C11.2564 2.8 9.03226 5.09827 9.03226 7.93333C9.03226 10.7684 11.2564 13.0667 14 13.0667Z"
                  fill="black"
                />
              </svg>
            </motion.span>
          </span>
        </ConfidentialityWrapper>
      </AuthInputsWrapper>
      <AuthInputsWrapper>
        <label htmlFor="signup-psw-repeat">
          <b>
            <span>Повторите пароль</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="rpeat-psw-tip"
            title={
              <React.Fragment>
                <span>Это поле обязательно к заполнению</span>
                <span style={{ color: color.hover }}>
                  повторите тот же пароль сверху
                </span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        <AuthInput
          placeholder={
            isEmpty(repeatPsw) && repeatErr
              ? 'Пароль не может быть пустым'
              : 'Повторите пароль'
          }
          type={confidentiality}
          id="signup-psw-repeat"
          value={repeatPsw}
          style={{
            border:
              isEmpty(repeatPsw) && repeatErr
                ? `solid 1px ${color.hover}`
                : `none`,
          }}
          onChange={(e) => {
            setRepeatPsw(e.target.value);
            setrepeatErr(isEmpty(e.target.value) ? true : false);
          }}
          onKeyUp={(e) => setCap(e.getModifierState('CapsLock') ? true : false)}
        />
        <ConfidentialityWrapper>
          <span className="content-confidentiality">
            <motion.span
              custom={secret}
              animate={confidentiality == 'password' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(1);
                setConfidentiality('text');
              }}
            >
              <svg
                width="37"
                height="22"
                viewBox="0 0 37 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M33.0911 10.3713C33.0911 11.9698 31.8911 13.7212 29.2781 15.1541C26.7164 16.5589 23.082 17.4713 18.9911 17.4713C14.9001 17.4713 11.2658 16.5589 8.7041 15.1541C6.09112 13.7212 4.89109 11.9698 4.89109 10.3713C4.89109 8.77267 6.09112 7.02131 8.7041 5.58838C11.2658 4.18358 14.9001 3.27125 18.9911 3.27125C23.082 3.27125 26.7164 4.18358 29.2781 5.58838C31.8911 7.02131 33.0911 8.77267 33.0911 10.3713ZM34.4911 10.3713C34.4911 15.0657 27.5515 18.8713 18.9911 18.8713C10.4307 18.8713 3.49109 15.0657 3.49109 10.3713C3.49109 5.67683 10.4307 1.87125 18.9911 1.87125C27.5515 1.87125 34.4911 5.67683 34.4911 10.3713ZM18.9911 15.8713C22.0287 15.8713 24.4911 13.4088 24.4911 10.3713C24.4911 7.33368 22.0287 4.87125 18.9911 4.87125C15.9535 4.87125 13.4911 7.33368 13.4911 10.3713C13.4911 13.4088 15.9535 15.8713 18.9911 15.8713ZM0 20L35.5 0L36.4817 1.7425L0.981687 21.7425L0 20Z"
                  fill="black"
                />
              </svg>
            </motion.span>
            <motion.span
              custom={secret}
              animate={confidentiality == 'text' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(-1);
                setConfidentiality('password');
              }}
            >
              <svg
                width="28"
                height="16"
                viewBox="0 0 28 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.6 7.93333C26.6 9.3989 25.5379 11.0055 23.2093 12.325C20.9225 13.6209 17.6694 14.4667 14 14.4667C10.3306 14.4667 7.07752 13.6209 4.79072 12.325C2.46208 11.0055 1.4 9.3989 1.4 7.93333C1.4 6.46777 2.46208 4.86121 4.79072 3.54165C7.07752 2.2458 10.3306 1.4 14 1.4C17.6694 1.4 20.9225 2.2458 23.2093 3.54165C25.5379 4.86121 26.6 6.46777 26.6 7.93333ZM28 7.93333C28 12.3148 21.732 15.8667 14 15.8667C6.26801 15.8667 0 12.3148 0 7.93333C0 3.55187 6.26801 0 14 0C21.732 0 28 3.55187 28 7.93333ZM14 13.0667C16.7436 13.0667 18.9677 10.7684 18.9677 7.93333C18.9677 5.09827 16.7436 2.8 14 2.8C11.2564 2.8 9.03226 5.09827 9.03226 7.93333C9.03226 10.7684 11.2564 13.0667 14 13.0667Z"
                  fill="black"
                />
              </svg>
            </motion.span>
          </span>
        </ConfidentialityWrapper>
      </AuthInputsWrapper>
      <ActionBtn
        style={{
          backgroundColor:
            isEmpty(psw) || isEmpty(repeatPsw) || psw != repeatPsw
              ? color.textSecondary
              : color.btnPrimary,
        }}
        disabled={
          isEmpty(psw) || isEmpty(repeatPsw) || psw != repeatPsw ? true : false
        }
        onClick={(e) => {
          e.preventDefault();
          handleResetClick(psw, router, dispatch);
        }}
      >
        Изменить пароль
      </ActionBtn>
    </Wrapper>
  );
};

const Title = styled.h2`
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }
  @media ${devices.mobileS} {
    width: 100%;
  }
`;

const AuthInputsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  position: relative;
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

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
  }
  @media ${devices.tabletL} {
    width: 90%;
  }
  @media ${devices.tabletS} {
    width: 90%;
  }
  @media ${devices.mobileL} {
    width: 90%;
  }
  @media ${devices.mobileM} {
    width: 90%;
  }
  @media ${devices.mobileS} {
    width: 90%;
  }
`;

const AuthInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 1rem;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
`;
const ConfidentialityWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32px;
  right: 5px;
  .content-confidentiality {
    width: 35px;
    height: 25px;
    overflow: hidden;
    position: relative;
    span {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
`;

const ActionBtn = styled.button`
  width: 350px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  color: ${color.textPrimary};
  cursor: pointer;
  transition: 300ms;
  &:hover {
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  span {
    font-size: 1rem;
    font-weight: 300;
    color: ${color.textPrimary};
  }
  @media ${devices.tabletL} {
    width: 90%;
  }
  @media ${devices.tabletS} {
    width: 90%;
  }
  @media ${devices.mobileL} {
    width: 90%;
  }
  @media ${devices.mobileM} {
    width: 90%;
  }
  @media ${devices.mobileS} {
    width: 90%;
  }
`;

export default ConfirmResetPsw;
