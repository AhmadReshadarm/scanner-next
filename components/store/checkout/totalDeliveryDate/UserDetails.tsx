import styled from 'styled-components';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import UserCommment from './UserComment';
import { useAppSelector } from 'redux/hooks';
import { TStoreCheckoutState } from 'redux/types';
import { devices } from 'components/store/lib/Devices';
import Image from 'next/image';
const UserDetails = (props: any) => {
  const { setStep, setHasAddress, setBacktoFinal } = props;
  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleNavBack = () => {
    setStep(1);
    setHasAddress(false);
    setBacktoFinal(true);
  };

  return (
    <>
      <Wrapper
        custom={0.1}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={handleNavBack}
      >
        <span>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="1"
              y="4"
              width="22"
              height="19"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23 4H1V23H11V13H23V4Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9646 18H14.0354C14.2781 19.6961 15.7368 21 17.5 21C19.3201 21 20.8156 19.6108 20.9842 17.8348C22.1576 17.4275 23 16.3121 23 15V13.3328C23 12.2514 22.6494 11.1991 22.0008 10.3338L21.0017 9.00103C20.0575 7.7414 18.5752 7 17.001 7H16C16 5.34315 14.6569 4 13 4H4C2.34315 4 1 5.34315 1 7V15C1 16.6569 2.34315 18 4 18H4.03544C4.27806 19.6961 5.73676 21 7.5 21C9.26324 21 10.7219 19.6961 10.9646 18ZM14 8C14 8.02825 14.0012 8.05623 14.0035 8.08389V10.9588C14.0035 11.5111 14.4512 11.9588 15.0035 11.9588C15.5558 11.9588 16.0035 11.5111 16.0035 10.9588V9H17.001C17.9455 9 18.8349 9.44484 19.4014 10.2006L20.4005 11.5334C20.7896 12.0526 21 12.6839 21 13.3328V15C21 15.3398 20.8306 15.64 20.5716 15.8207C19.9771 14.7357 18.8245 14 17.5 14C16.1038 14 14.8985 14.8175 14.3368 16H10.6632C10.1015 14.8175 8.8962 14 7.5 14C6.1038 14 4.89855 14.8175 4.33682 16H4C3.44772 16 3 15.5523 3 15V7C3 6.44772 3.44772 6 4 6H13C13.5523 6 14 6.44772 14 7V8ZM7.5 19C8.32843 19 9 18.3284 9 17.5C9 16.6716 8.32843 16 7.5 16C6.67157 16 6 16.6716 6 17.5C6 18.3284 6.67157 19 7.5 19ZM19 17.5C19 18.3284 18.3284 19 17.5 19C16.6716 19 16 18.3284 16 17.5C16 16.6716 16.6716 16 17.5 16C18.3284 16 19 16.6716 19 17.5Z"
                fill="#001A34"
              />
            </g>
            <path
              d="M11 16H12C12.5523 16 13 16.4477 13 17V17C13 17.5523 12.5523 18 12 18H11V16Z"
              fill="#001A34"
            />
            <path
              d="M23 13V13C23 13.5523 22.5523 14 22 14V14C21.4477 14 21 13.5523 21 13V13L23 13Z"
              fill="#001A34"
            />
            <path
              d="M23.2929 15.2929L18 20.5858L15.7071 18.2929C15.3166 17.9024 14.6835 17.9024 14.2929 18.2929C13.9024 18.6834 13.9024 19.3166 14.2929 19.7071L17.2929 22.7071C17.4882 22.9023 17.7441 23 18 23C18.256 23 18.5119 22.9023 18.7071 22.7071L24.7071 16.7071C25.0976 16.3166 25.0976 15.6835 24.7071 15.2929C24.3166 14.9024 23.6834 14.9024 23.2929 15.2929Z"
              fill="#001A34"
            />
          </svg>
        </span>
        <div className="edit-button-wrapper">
          <div className="address-wrapper">
            <h3>Курьером по адресу</h3>
            <span>{`${deliveryInfo?.address!}`}</span>
          </div>
          <span>
            <Image
              src="/icons/edit.png"
              width={20}
              height={20}
              alt="edit address"
            />
            {/* <ArrowGray /> */}
          </span>
        </div>
      </Wrapper>
      <Wrapper
        custom={0.2}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={handleNavBack}
      >
        <span>
          <svg
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 1.25C10 0.984784 10.1054 0.73043 10.2929 0.542893C10.4804 0.355357 10.7348 0.25 11 0.25C17.075 0.25 22 5.175 22 11.25C22 17.325 17.075 22.25 11 22.25C4.925 22.25 1.87828e-07 17.325 1.87828e-07 11.25C-0.00038254 9.17855 0.584141 7.14909 1.6863 5.3952C2.78845 3.6413 4.36344 2.23426 6.23 1.336C6.35303 1.27677 6.4869 1.24336 6.62334 1.23783C6.75978 1.23231 6.8959 1.25479 7.02332 1.30388C7.15074 1.35297 7.26676 1.42764 7.36422 1.52329C7.46168 1.61893 7.53852 1.73352 7.59 1.86C7.882 2.58 8.28 3.425 8.952 4.093C9.592 4.731 10.524 5.25 12 5.25C12.2652 5.25 12.5196 5.35536 12.7071 5.54289C12.8946 5.73043 13 5.98478 13 6.25C13 6.51522 12.8946 6.76957 12.7071 6.95711C12.5196 7.14464 12.2652 7.25 12 7.25C9.976 7.25 8.542 6.507 7.541 5.51C6.941 4.914 6.514 4.243 6.201 3.635C4.36624 4.7908 3.01047 6.57018 2.38304 8.64588C1.7556 10.7216 1.89869 12.954 2.78599 14.9326C3.67329 16.9113 5.24513 18.503 7.21243 19.4151C9.17972 20.3272 11.4102 20.4984 13.4936 19.8971C15.5771 19.2958 17.3733 17.9625 18.5521 16.1424C19.7309 14.3224 20.2129 12.1379 19.9095 9.99076C19.6061 7.84363 18.5377 5.87824 16.9008 4.45604C15.2638 3.03384 13.1685 2.25047 11 2.25C10.8686 2.25013 10.7385 2.22436 10.617 2.17417C10.4956 2.12397 10.3852 2.05033 10.2922 1.95746C10.1993 1.86459 10.1255 1.75431 10.0752 1.63291C10.0249 1.51152 9.999 1.38141 9.999 1.25H10Z"
              fill="black"
            />
            <path
              d="M7.6875 15.3581C8.875 16.6914 11.8625 18.5581 14.3125 15.3581"
              stroke="black"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M15.5 9.09375V11.6875"
              stroke="black"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M6.375 9.09375V11.6875"
              stroke="black"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <div className="edit-button-wrapper">
          <div className="user-comment-wrapper">
            <span>{deliveryInfo?.receiverName}</span>
            <span>{deliveryInfo?.receiverPhone}</span>
          </div>
          <span>
            <Image
              src="/icons/edit.png"
              width={20}
              height={20}
              alt="edit reciver name and phone"
            />
            {/* <ArrowGray /> */}
          </span>
        </div>
      </Wrapper>
      <Wrapper
        custom={0.3}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={() => setIsOpen(true)}
      >
        <span>
          <svg
            width="27"
            height="23"
            viewBox="0 0 27 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.875 1.7125H20.625C23.4417 1.7125 25.725 3.99585 25.725 6.8125V16.25C25.725 19.0667 23.4417 21.35 20.625 21.35H1.775V6.8125C1.775 3.99585 4.05835 1.7125 6.875 1.7125Z"
              stroke="black"
              stroke-width="1.8"
            />
            <path
              d="M6.4375 8.5H19.375"
              stroke="black"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M6.5 14.875H14.5"
              stroke="black"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <div className="edit-button-wrapper">
          <div className="user-comment-wrapper">
            <span>Комментарий</span>
          </div>
          <span>
            <Image
              src="/icons/edit.png"
              width={20}
              height={20}
              alt="edit comment"
            />
            {/* <ArrowGray /> */}
          </span>
        </div>
      </Wrapper>
      {/* <Wrapper
        custom={0.3}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
      >
        <label className="leave-on-door-wrapper" htmlFor="leave-on-door">
          <input
            type="checkbox"
            id="leave-on-door"
            title="Оставить на двери?"
          />
          <span>Оставить у двери</span>
        </label>
        <span>
          <DeliveryTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="address-room-tip"
            title={
              <React.Fragment>
                <h2>Как это работает?</h2>
                <h3>Безопасная доставка до двери</h3>
                <span>
                  Оставим заказ у двери и отправим фото с подтверждением
                  доставки. Включите «Позвонить перед доставкой», чтобы курьер
                  предупредил о прибытии.
                </span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </DeliveryTooltip>
        </span>
      </Wrapper> */}
      {isOpen ? <UserCommment setIsOpen={setIsOpen} {...props} /> : ''}
    </>
  );
};

const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px 5px;
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #00000026;

  span {
    display: flex;
    flex-direction: row;
    justify-content: cetner;
    align-items: center;
  }
  .leave-on-door-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    cursor: pointer;
    input {
      cursor: pointer;
    }
  }
  .edit-button-wrapper {
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items;center;
  
    .address-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;

      h3 {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }

  .user-comment-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    font-weight: 500;
  }
  .tool-tip {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid ${color.textSecondary};
    color: ${color.textSecondary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 500;
  }
  @media ${devices.tabletL} {
    flex-direction:column;
    align-items:flex-start;
    .user-comment-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media ${devices.tabletS} {
        flex-direction:column;
    align-items:flex-start;
    .user-comment-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media ${devices.mobileL} {
        flex-direction:column;
    align-items:flex-start;
    .user-comment-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media ${devices.mobileM} {
        flex-direction:column;
    align-items:flex-start;
    .user-comment-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media ${devices.mobileS} {
        flex-direction:column;
    align-items:flex-start;
    .user-comment-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default UserDetails;
