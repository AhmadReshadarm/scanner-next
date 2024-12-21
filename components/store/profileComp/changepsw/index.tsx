import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { Container, Header } from '../common';
import { InputsTooltip, handleChangePsw } from './helpers';
import React, { useState, useMemo, useEffect } from 'react';

const Changepsw = (props: any) => {
  const { changePswRef, setActive, user } = props;
  const [isCap, setCap] = useState(false);
  const [psw, setPsw] = useState('');
  const [oldPsw, setOldPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);
  const [oldPswSecret, setOldPswSecret] = useState('password');
  const [[oldPswInput, pswInput, repeatPswInput], setInputsErr] = useState([
    false,
    false,
    false,
  ]);
  const payload = {
    user,
    psw,
    repeatPsw,
    oldPassword: oldPsw,
  };

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('changePsw');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(changePswRef.current);

    return () => {
      observer.disconnect();
    };
  }, [changePswRef, observer]);

  return (
    <Container id="changepsw" ref={changePswRef}>
      <Header>Изменить пароль</Header>
      <Wrapper>
        <span className="errors">{isCap ? 'Капслок включен' : ''}</span>
        <FormWrapper>
          <AuthInputsWrapper>
            <label htmlFor="old-psw">
              <b>
                <span>Старый пароль</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="old-psw-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                    <span>
                      Используйте буквенно-цифровые английские символы
                    </span>
                    <span style={{ color: color.hover }}>
                      Напишите свой предыдущий пароль
                    </span>
                  </React.Fragment>
                }
              >
                <span className="tool-tip">?</span>
              </InputsTooltip>
            </label>
            <AuthInput
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={
                isEmpty(oldPsw) && pswInput
                  ? 'не может быть пустым'
                  : 'Старый пароль'
              }
              type={oldPswSecret}
              id="old-psw"
              value={oldPsw}
              style={{
                border: `solid 1px ${
                  isEmpty(psw) && pswInput ? color.hover : color.btnSecondery
                }`,
              }}
              onChange={(e) => {
                setOldPsw(e.target.value);
                setInputsErr([
                  true,
                  pswInput ? true : false,
                  repeatPswInput ? true : false,
                ]);
              }}
              onKeyUp={(e) =>
                setCap(e.getModifierState('CapsLock') ? true : false)
              }
            />
            <ConfidentialityWrapper>
              <span className="content-confidentiality">
                <motion.span
                  custom={secret}
                  animate={oldPswSecret == 'password' ? 'show' : 'hide'}
                  variants={variants.pswConfidential}
                  onClick={() => {
                    setSecret(1);
                    setOldPswSecret('text');
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
                  animate={oldPswSecret == 'text' ? 'show' : 'hide'}
                  variants={variants.pswConfidential}
                  onClick={() => {
                    setSecret(-1);
                    setOldPswSecret('password');
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
            <label htmlFor="signup-psw">
              <b>
                <span>Новый пароль</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="psw-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                    <span>
                      Используйте буквенно-цифровые английские символы для
                      пароля
                    </span>
                    <span style={{ color: color.hover }}>
                      минимальное допустимое количество символов восемь
                    </span>
                  </React.Fragment>
                }
              >
                <span className="tool-tip">?</span>
              </InputsTooltip>
            </label>
            <AuthInput
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={
                isEmpty(psw) && pswInput
                  ? 'Пароль не может быть пустым'
                  : 'Пароль'
              }
              type={confidentiality}
              id="signup-psw"
              value={psw}
              style={{
                border: `solid 1px ${
                  isEmpty(psw) && pswInput ? color.hover : color.btnSecondery
                }`,
              }}
              onChange={(e) => {
                setPsw(e.target.value);
                setInputsErr([
                  oldPswInput ? true : false,
                  true,
                  repeatPswInput ? true : false,
                ]);
              }}
              onKeyUp={(e) =>
                setCap(e.getModifierState('CapsLock') ? true : false)
              }
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
                <span>Повторите новый пароль</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="psw-tip"
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
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={
                isEmpty(repeatPsw) && repeatPswInput
                  ? 'Пароль не может быть пустым'
                  : 'Повторите пароль'
              }
              type={confidentiality}
              id="signup-psw-repeat"
              value={repeatPsw}
              style={{
                border: `solid 1px  ${
                  isEmpty(repeatPsw) && repeatPswInput
                    ? color.hover
                    : color.btnSecondery
                }`,
              }}
              onChange={(e) => {
                setRepeatPsw(e.target.value);
                setInputsErr([
                  oldPswInput ? true : false,
                  pswInput ? true : false,
                  true,
                ]);
              }}
              onKeyUp={(e) =>
                setCap(e.getModifierState('CapsLock') ? true : false)
              }
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
        </FormWrapper>

        <AuthBtns
          disabled={
            isEmpty(oldPsw) || isEmpty(psw) || isEmpty(repeatPsw) ? true : false
          }
          onClick={(e) => {
            e.preventDefault();
            handleChangePsw(payload);
          }}
        >
          Изменить пароль
        </AuthBtns>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  user-select: none;
  .errors {
    color: ${color.hover};
    font-size: 1rem;
  }
  .success {
    color: ${color.ok};
    font-size: 1rem;
  }
  @media ${devices.tabletL} {
    align-items: center;
  }
  @media ${devices.tabletS} {
    align-items: center;
  }
  @media ${devices.mobileL} {
    align-items: center;
  }
  @media ${devices.mobileM} {
    align-items: center;
  }
  @media ${devices.mobileS} {
    align-items: center;
  }
`;

const AuthBtns = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
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
    font-family: ver(--font-Jost);
    font-size: 1rem;
  }
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

const FormWrapper = styled.form`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  h4 {
    font-size: 1rem;
  }
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
  align-items: flex-start;
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
`;

const AuthInput = styled(motion.input)`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 300;
  background-color: ${color.btnSecondery};
  border: none;
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

export default Changepsw;
