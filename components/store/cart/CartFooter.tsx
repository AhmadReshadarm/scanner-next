import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getTotalPrice } from './helpers';
import color from 'components/store/lib/ui.colors';
import variants from '../lib/variants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState, TCartState } from 'redux/types';
import { devices } from '../lib/Devices';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';

const CartFooter = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleGoToCart = () => {
    dispatch(setOneClickBy(false));
  };

  return (
    <Wrapper>
      <CartTotalPrice
        style={{
          display: Number(cart?.orderProducts?.length) > 0 ? 'flex' : 'none',
        }}
      >
        <span className="total-text">Ваша корзина</span>
        <span>Итого: {getTotalPrice(cart?.orderProducts!, user)} ₽</span>
      </CartTotalPrice>
      <div className="footer-spliter">
        <div className="footer-no-border"></div>
        <div className="footer-border"></div>
      </div>
      <CheckoutBtnWrapper>
        <Link
          style={{
            display: Number(cart?.orderProducts?.length) > 0 ? 'flex' : 'none',
          }}
          href={cart?.totalAmount == 0 ? '/cart' : '/checkout'}
        >
          <CheckoutBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={handleGoToCart}
          >
            <span>Перейти к оформлению заказа</span>
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
                stroke="white"
                stroke-width="3.1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </CheckoutBtn>
        </Link>
        <Link href="/catalog">
          <CheckoutBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            style={{ backgroundColor: '#e2dad0', color: '#000000e3' }}
          >
            Продолжить покупки
          </CheckoutBtn>
        </Link>
      </CheckoutBtnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .footer-spliter {
    width: 100%;
    display: flex;
    .footer-border {
      width: 95%;
      border-top: 1px solid;
    }
    .footer-no-border {
      width: 5%;
    }
  }
`;

const CartTotalPrice = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 30px;
  gap: 50px;
  span {
    font-family: ver(--font-Jost);
    font-size: 2.5rem;
  }

  @media ${devices.tabletL} {
    padding: 10px 20px;
    gap: 10px;
    justify-content: space-between;
    .total-text {
      font-size: 1.5rem;
    }
    span {
      font-size: 1.5rem;
    }
  }
  @media ${devices.tabletS} {
    padding: 10px 20px;
    gap: 10px;
    justify-content: space-between;

    .total-text {
      font-size: 1.5rem;
    }
    span {
      font-size: 1.5rem;
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    padding: 0;
    gap: 0;
    align-items: flex-start;
    padding: 0 0 0 20px;
    .total-text {
      font-size: 1.5rem;
    }
    span {
      font-size: 1.5rem;
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    padding: 0;
    gap: 0;
    align-items: flex-start;
    padding: 0 0 0 20px;
    .total-text {
      font-size: 1.5rem;
    }
    span {
      font-size: 1.5rem;
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    padding: 0;
    gap: 0;
    align-items: flex-start;
    padding: 0 0 0 20px;
    .total-text {
      font-size: 1.5rem;
    }
    span {
      font-size: 1.5rem;
    }
  }
`;

const CheckoutBtnWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  gap: 50px;
  @media ${devices.tabletL} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
`;

const CheckoutBtn = styled(motion.button)`
  height: 50px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  font-size: 1.2rem;
  padding: 0px 20px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media ${devices.tabletL} {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
  }
  @media ${devices.tabletS} {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
  }
  @media ${devices.mobileL} {
    width: 100%;
    padding: 10px;
    font-size: 0.8rem;
  }
  @media ${devices.mobileM} {
    width: 100%;
    padding: 10px;
    font-size: 0.8rem;
  }
  @media ${devices.mobileS} {
    width: 100%;
    padding: 10px;
    font-size: 0.8rem;
  }
`;

export default CartFooter;
