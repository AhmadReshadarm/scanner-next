import styled from 'styled-components';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { PopupContainer } from '../common';
import { InputsTooltip } from './helpers';
import { handleDataChange } from './helpers';
import { useAppDispatch } from 'redux/hooks';
const UserData = (props: any) => {
  const { isOpen, setOpen, user } = props;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [serverResponse, setServerResponse] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState('+7999999999');
  const [address, setAddress] = useState('some adress');
  const [
    [firstNameInput, lastNameInput, phoneNumberInput, addressInput],
    setInputsErr,
  ] = useState([false, false, false, false]);
  const [success, setSuccess] = useState(false);
  const payload = {
    firstName,
    lastName,
  };
  const dispatch = useAppDispatch();
  return (
    <PopupContainer style={{ display: isOpen ? 'flex' : 'none' }}>
      <UserDataContainer
        custom={0}
        initial="init"
        whileInView="animate"
        variants={variants.fadeOutSlideOut}
      >
        <span onClick={() => setOpen(false)} className="close-btn">
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
        <h2>Личные данные</h2>
        <InputsDvider>
          <InputsWrapper>
            <label htmlFor="user-firstname">
              <b>
                <span>Имя</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="firstname-tip"
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
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={firstNameInput ? 'не может быть пустым' : 'Имя'}
              type="text"
              id="user-firstname"
              value={firstName}
              style={{
                border: `solid 1px ${
                  isEmpty(firstName) && firstNameInput
                    ? color.hover
                    : color.btnPrimary
                }`,
              }}
              onChange={(e) => {
                setFirstName(e.target.value);
                setInputsErr([
                  true,
                  lastNameInput ? true : false,
                  phoneNumberInput ? true : false,
                  addressInput ? true : false,
                ]);
              }}
            />
          </InputsWrapper>
          <InputsWrapper>
            <label htmlFor="user-familyname">
              <b>
                <span>Фамилия</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="lastname-tip"
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
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={firstNameInput ? 'не может быть пустым' : 'Фамилия'}
              type="text"
              id="user-familyname"
              value={lastName}
              style={{
                border: `solid 1px ${
                  isEmpty(lastName) && lastNameInput
                    ? color.hover
                    : color.btnPrimary
                }`,
              }}
              onChange={(e) => {
                setLastName(e.target.value);
                setInputsErr([
                  firstNameInput ? true : false,
                  true,
                  phoneNumberInput ? true : false,
                  addressInput ? true : false,
                ]);
              }}
            />
          </InputsWrapper>
        </InputsDvider>
        <SaveBtn
          style={{
            backgroundColor:
              isEmpty(firstName) ||
              isEmpty(lastName) ||
              isEmpty(phoneNumber) ||
              isEmpty(address)
                ? color.textSecondary
                : color.btnPrimary,
          }}
          disabled={
            isEmpty(firstName) ||
            isEmpty(lastName) ||
            isEmpty(phoneNumber) ||
            isEmpty(address)
              ? true
              : false
          }
          onClick={(e) => {
            e.preventDefault();
            handleDataChange({ user, payload, setServerResponse, dispatch });
            setOpen(false);
            setSuccess(serverResponse == 200 ? true : false);
            setTimeout(() => {
              setSuccess(false);
            }, 800);
          }}
        >
          Сохранить изменения
        </SaveBtn>
        <span className="success">{success ? 'Изменения сохранены' : ''}</span>
        <span style={{ color: color.hover }}>
          {serverResponse != 200 && serverResponse != undefined
            ? 'Ошибка сервера'
            : ''}
        </span>
      </UserDataContainer>
    </PopupContainer>
  );
};

const UserDataContainer = styled(motion.form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  border-radius: 20px;
  gap: 20px;
  position: relative;
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .success {
    color: ${color.ok};
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
`;

const InputsDvider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

const InputsWrapper = styled(motion.div)`
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
`;

const AuthInput = styled(motion.input)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 500;
`;

const SaveBtn = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${color.btnPrimary};
  color: ${color.textPrimary};
  cursor: pointer;
`;

export default UserData;
