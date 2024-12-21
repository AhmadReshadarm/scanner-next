import CartItem from 'components/store/cart/cartItem';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { handleRemoveClick } from './helpers';
import color from '../lib/ui.colors';
import { devices } from '../lib/Devices';
import { LoaderMask } from 'ui-kit/generalLoaderMask';

type Props = {};
const BasketItems: React.FC<Props> = ({}) => {
  const { cart, loading } = useAppSelector<TCartState>((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <>
      {cart?.orderProducts?.length && !loading ? (
        <>
          <ItemsWrapper>
            <div className="action-btn-wrapper">
              <button onClick={() => handleRemoveClick(dispatch)}>
                <span>ОЧИСТИТЬ КОРЗИНУ</span>
              </button>
            </div>
            <CartBody>
              {cart?.orderProducts?.map((orderProduct, index) => {
                return (
                  <CartItem
                    key={`cart-item-page-${index}`}
                    orderProduct={orderProduct}
                  />
                );
              })}
            </CartBody>
          </ItemsWrapper>
        </>
      ) : loading ? (
        <LoaderMask />
      ) : (
        <NoCartItem>
          <h2>Ваша корзина пуста</h2>
        </NoCartItem>
      )}
    </>
  );
};

const ItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .action-btn-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    button {
      width: 200px;
      height: 50px;
      background: linear-gradient(94deg, #f2d099 9.58%, #c6986a 106.37%);
      border-radius: 30px;
      cursor: pointer;
      transition: 300ms;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span {
        color: #000;
      }
      &:hover {
        background-color: ${color.searchBtnBg};

        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
      }
      span {
        font-family: ver(--font-Jost);
        font-size: 1rem;
      }
    }
  }
`;

const CartBody = styled.ul`
  width: 100%;
  height: 700px;
  overflow-y: scroll;
  display: inline-block;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const NoCartItem = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 3rem;
    text-align: center;
  }
  @media ${devices.laptopS} {
    h2 {
      font-size: 2.8rem;
    }
  }
  @media ${devices.tabletL} {
    h2 {
      font-size: 2rem;
    }
  }
  @media ${devices.tabletS} {
    h2 {
      font-size: 2rem;
    }
  }
  @media ${devices.mobileL} {
    h2 {
      font-size: 1.5rem;
    }
  }
  @media ${devices.mobileM} {
    h2 {
      font-size: 1.5rem;
    }
  }
  @media ${devices.mobileS} {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export default BasketItems;
