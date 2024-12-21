import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import variants from 'components/store/lib/variants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import {
  handleSearchItemClick,
  TrigerhandleWishBtnClick,
  TrigerhandleCartBtnClick,
} from './helpers';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import { ArrowBtns } from 'ui-kit/ArrowBtns';
import { Basket, Product } from 'swagger/services';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { TWishlistState } from 'redux/types';
import {
  handleCartBtnClick,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';

type Props = {
  product: Product;
  index: number;
};

const SearchItem: React.FC<Props> = ({ product, index }) => {
  const dispatch = useAppDispatch();
  const images = getProductVariantsImages(product?.productVariants);
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  return (
    <>
      <Link key={index} href={`/product/${product.url}`} prefetch={false}>
        <CardItemContainer
          custom={1.01}
          whileHover="hover"
          whileTap="tap"
          variants={variants.grow}
        >
          <ItemImageAndBtnWrapper>
            <span className="ItemPriceWrapper">
              Цена: {product?.productVariants![0].price ?? 1} ₽
            </span>
            <ItemActionBtnsWrapper>
              <ArrowBtns
                bgcolor={color.glassmorphismSeconderBG}
                filterdropback="blur(9px);"
                position="relative"
                onClick={TrigerhandleCartBtnClick(
                  product,
                  handleCartBtnClick(
                    product,
                    dispatch,
                    product.productVariants![0],
                    cart,
                  ),
                )}
              ></ArrowBtns>
              <ArrowBtns
                bgcolor={color.glassmorphismSeconderBG}
                filterdropback="blur(9px);"
                position="relative"
                onClick={TrigerhandleWishBtnClick(
                  product,
                  handleWishBtnClick(product, dispatch, wishlist!),
                )}
              ></ArrowBtns>
            </ItemActionBtnsWrapper>
            <img
              onClick={handleSearchItemClick(dispatch)}
              src={`/api/images/${images[0]}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/img_not_found.png';
                currentTarget.className = 'image-on-error';
              }}
              alt={product.name}
            />
          </ItemImageAndBtnWrapper>
        </CardItemContainer>
      </Link>
      <AddToWishlist product={product} />
      <AddToCart
        product={product}
        qty={1}
        variant={product?.productVariants![0]}
      />
    </>
  );
};

const CardItemContainer = styled(motion.li)`
  width: 260px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  border-radius: 10px;
  background-color: ${color.bgPrimary};
  overflow: hidden;
  @media ${devices.laptopS} {
    min-width: 300px;
  }
  @media (min-width: 550px) and (max-width: 768px) {
    min-width: 225px !important;
    width: 225px !important;
  }
  @media ${devices.tabletL} {
    min-width: 280px;
  }
  @media ${devices.tabletS} {
    min-width: 280px;
  }
  @media ${devices.mobileL} {
    min-width: 280px;
  }
  @media ${devices.mobileM} {
    min-width: 250px;
  }
  @media ${devices.mobileS} {
    min-width: 190px;
  }
`;

const ItemImageAndBtnWrapper = styled.div`
  width: 100%;
  height: 75%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-on-error {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  .ItemPriceWrapper {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 120px;
    height: 40px;
    background-color: ${color.glassmorphismSeconderBG};
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    border-radius: 5px;
    color: ${color.textPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const ItemActionBtnsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
`;

export default SearchItem;
