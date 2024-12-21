import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import MapContainer from './MapContainer';
import { useEffect, useState, useRef } from 'react';
import { styleProps } from 'components/store/lib/types';
import { geoLocatClick } from './helpers';
import AutoFill from './Autofill';
import ReciverData from './ReciverData';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchAddress,
  setDeliveryInfo,
} from 'redux/slicers/store/checkoutSlicer';
import { TStoreCheckoutState, TCartState } from 'redux/types';
import { devices } from 'components/store/lib/Devices';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { initialStateAdress } from './constant';
import { openErrorNotification } from 'common/helpers';

const UserData = ({ setStep, backToFinal, setHasAddress }) => {
  const dispatch = useAppDispatch();
  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const { isOneClickBuy } = useAppSelector<TCartState>((state) => state.cart);

  const mapRef: any = useRef(null);

  const [viewport, setViewPort] = useState({ ...initialStateAdress });

  const [address, setAddress] = useState('');
  const [zipCode, setPostCode] = useState('');
  const [roomOrOffice, setRoomOrOffice] = useState('');
  const [door, setDoor] = useState('');
  const [floor, setFloor] = useState('');
  const [rignBell, setRingBell] = useState('');
  const [receiverName, setFullname] = useState('');
  const [receiverPhone, setPhone] = useState('+7');
  const [emailWithoutRegister, setEmailWithoutRegister] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleClickBack = () => {
    if (address == '') {
      openErrorNotification('Адрес пуст');
      return;
    }
    if (receiverName == '') {
      openErrorNotification('Имя пусто');
      return;
    }
    if (receiverPhone == '') {
      openErrorNotification('Телефон пуст');
      return;
    }
    if (emailWithoutRegister == '' && isOneClickBuy) {
      openErrorNotification('Адрес электронной почты пуст');
      return;
    }
    if (!isEmail(emailWithoutRegister) && isOneClickBuy) {
      openErrorNotification('Неправильный адрес электронной почты');
      return;
    }
    const payload = {
      address,
      receiverName,
      receiverPhone,
      receiverEmail: emailWithoutRegister,
      floor,
      door,
      roomOrOffice,
      zipCode,
      rignBell,
    };
    dispatch(setDeliveryInfo(payload));
    setStep(2);
    setHasAddress(true);
  };

  const handleClickSave = () => {
    if (address == '') {
      openErrorNotification('Адрес пуст');
      return;
    }
    if (receiverName == '') {
      openErrorNotification('Имя пусто');
      return;
    }
    if (receiverPhone == '') {
      openErrorNotification('Телефон пуст');
      return;
    }
    if (emailWithoutRegister == '' && isOneClickBuy) {
      openErrorNotification('Адрес электронной почты пуст');
      return;
    }
    if (!isEmail(emailWithoutRegister) && isOneClickBuy) {
      openErrorNotification('Неправильный адрес электронной почты');
      return;
    }
    const payload = {
      address,
      receiverName,
      receiverPhone,
      receiverEmail: emailWithoutRegister,
      floor,
      door,
      roomOrOffice,
      zipCode,
      rignBell,
    };
    dispatch(setDeliveryInfo(payload));
    setStep(2);
    setHasAddress(true);
  };

  useEffect(() => {
    setAddress(deliveryInfo?.address ?? '');
    setPostCode(deliveryInfo?.zipCode ?? '');
    setRoomOrOffice(deliveryInfo?.roomOrOffice ?? '');
    setDoor(deliveryInfo?.door ?? '');
    setFloor(deliveryInfo?.floor ?? '');
    setRingBell(deliveryInfo?.rignBell ?? '');
    setFullname(deliveryInfo?.receiverName ?? '');
    setPhone(deliveryInfo?.receiverPhone ?? '');
    setEmailWithoutRegister(deliveryInfo?.receiverEmail ?? '');
    setAddress(deliveryInfo?.address ?? '');
  }, []);

  useEffect(() => {
    dispatch(fetchCheckouts());
    dispatch(fetchAddress());
  }, []);

  useEffect(() => {
    isEmpty(address) || isEmpty(receiverName) || isEmpty(receiverPhone)
      ? setSubmitDisabled(true)
      : setSubmitDisabled(false);
    if (isOneClickBuy) {
      isEmpty(address) ||
      isEmpty(receiverName) ||
      isEmpty(receiverPhone) ||
      !isEmail(emailWithoutRegister) ||
      isEmpty(emailWithoutRegister)
        ? setSubmitDisabled(true)
        : setSubmitDisabled(false);
    }
  }, [address, receiverName, receiverPhone, emailWithoutRegister]);

  return (
    <Container>
      <MapContainer
        viewport={viewport}
        setViewPort={setViewPort}
        setAddress={setAddress}
        mapRef={mapRef}
        setPostCode={setPostCode}
      />
      <FormContainer
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
      >
        {backToFinal ? (
          <ActionBtns bgcolor={color.textSecondary} onClick={handleClickBack}>
            Назад
          </ActionBtns>
        ) : (
          ''
        )}
        <FormWrapper>
          <h3>Куда доставить заказ?</h3>
          <span className="sub-addres-info">
            Укажите адрес на карте или нажмите кнопку "Определить
            местоположение"
          </span>
          <AutoFill
            address={address}
            setAddress={setAddress}
            setPostCode={setPostCode}
            setViewPort={setViewPort}
            mapRef={mapRef}
          />
          <button
            className="geolocate"
            onTouchStart={geoLocatClick}
            onClick={geoLocatClick}
          >
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
            <span>Определить местоположение</span>
          </button>
          {/* <AddressDetails
            roomOrOffice={roomOrOffice}
            setRoomOrOffice={setRoomOrOffice}
            postCode={zipCode}
            setPostCode={setPostCode}
            door={door}
            setDoor={setDoor}
            floor={floor}
            setFloor={setFloor}
            rignBell={rignBell}
            setRingBell={setRingBell}
          /> */}
          <ReciverData
            fullName={receiverName}
            setFullname={setFullname}
            phone={receiverPhone}
            setPhone={setPhone}
            emailWithoutRegister={emailWithoutRegister}
            setEmailWithoutRegister={setEmailWithoutRegister}
          />
          <ActionBtns
            bgcolor={color.textSecondary}
            // disabled={submitDisabled}
            onClick={handleClickSave}
          >
            Сохранить и продолжить
          </ActionBtns>
        </FormWrapper>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 30px;
  @media (min-width: 768px) and (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.tabletL} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.tabletS} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.mobileL} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.mobileM} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.mobileS} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
`;

const FormContainer = styled(motion.div)`
  width: 450px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;
  padding: 20px;
  gap: 20px;
  user-select: none;
  &::-webkit-scrollbar {
    width: 5px;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.tabletL} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.tabletS} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.mobileL} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.mobileM} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.mobileS} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
`;

const ActionBtns = styled.button`
  width: 100%;
  height: 50px;
  min-height: 50px;
  border-radius: 30px;
  background-color: ${(p: styleProps) => p.bgcolor};
  cursor: pointer;
  transition: 150ms;
  color: ${color.textPrimary};
  font-size: 1.2rem;
  &:active {
    background-color: ${color.textPrimary};
    color: ${color.textSecondary};
    border: 1px solid ${color.textSecondary};
  }
  span {
    font-family: ver(--font-Jost);
    font-size: 1rem;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  .sub-addres-info {
    color: ${color.textSecondary};
  }
  .geolocate {
    width: 100%;
    display: flex;
    flex-direction: row;
    jusitfy-content: flex-start;
    align-items: center;
    gap: 10px;
    span {
      color: ${color.ok};
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
    }
    &:hover {
      color: ${color.hover};
    }
  }
  @media ${devices.mobileL} {
    .geolocate {
      flex-direction: column;
      align-items: flex-start;
      span {
        text-align: left;
      }
    }
  }
  @media ${devices.mobileM} {
    .geolocate {
      flex-direction: column;
      align-items: flex-start;
      span {
        text-align: left;
      }
    }
  }
  @media ${devices.mobileS} {
    .geolocate {
      flex-direction: column;
      align-items: flex-start;
      span {
        text-align: left;
      }
    }
  }
`;

export default UserData;
