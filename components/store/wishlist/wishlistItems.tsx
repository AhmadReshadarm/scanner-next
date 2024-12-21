import Loading from 'ui-kit/Loading';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TWishlistState } from 'redux/types';
import color from '../lib/ui.colors';
import { useEffect } from 'react';
import { fetchWishlistProducts } from 'redux/slicers/store/wishlistSlicer';
import ItemWishlist from './ItemWishlist';
import { devices } from '../lib/Devices';

const WishlistItems = () => {
  const dispatch = useAppDispatch();

  const { wishlist, loading }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  useEffect(() => {
    const wishlistId = localStorage.getItem('wishlistId') ?? '';

    dispatch(fetchWishlistProducts(wishlistId));
  }, [dispatch]);

  return (
    <>
      {wishlist?.items?.length && !loading ? (
        <>
          <ItemsWrapper>
            <CartBody>
              {wishlist.products!.map((product, index) => {
                return (
                  <ItemWishlist
                    key={index}
                    wishlist={wishlist}
                    index={index}
                    product={product}
                  />
                );
              })}
            </CartBody>
          </ItemsWrapper>
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <NoCartItem>
          <h2>Список избранного пуста</h2>
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
      width: 150px;
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
    }
  }
`;

const CartBody = styled.ul`
  width: 100%;
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: inline-block;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const NoCartItem = styled.div`
  width: 90%;
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 3rem;
    text-align: center;
    font-weight: 400;
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

export default WishlistItems;
