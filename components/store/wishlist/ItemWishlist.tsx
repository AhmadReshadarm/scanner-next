import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Product, Wishlist } from 'swagger/services';
import { devices } from '../lib/Devices';
import { Rating } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import color from '../lib/ui.colors';
import { TrigerhandleWishBtnClick } from '../storeLayout/utils/SearchBar/helpers';
import { handleWishBtnClick } from 'ui-kit/products/helpers';
import { TCartState } from 'redux/types';
import { AddToCart } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
type Props = {
  product: Product;
  index: number;
  wishlist: Wishlist;
};

const ItemWishlist: React.FC<Props> = ({ product, index, wishlist }) => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { name, url, rating, reviews, productVariants } = product;
  const { price } = productVariants![0];
  const images = getProductVariantsImages(productVariants);

  return (
    <Item key={index}>
      <div className="item-container">
        <ImageWrapper>
          <motion.img
            whileHover="hover"
            whileTap="tap"
            custom={1.05}
            variants={variants.grow}
            src={`/api/images/${images[0]}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/img_not_found.png';
            }}
          />
        </ImageWrapper>
        <ItemDetails>
          <Link className="product-title" href={`/product/${url}`}>
            <h4>{name}</h4>
          </Link>
          <div className="product-price-wrapper">
            <span>Цена: </span>
            <h3>{price} ₽</h3>
          </div>
          <div className="review-and-rating-Wrapper">
            <Rating value={rating?.avg} size="small" readOnly />
            <span className="reviews">{reviews?.length} отзывов</span>
          </div>

          <div className="item-action-btns-wrapper">
            <AddToCart
              product={product!}
              qty={findCartQTY(product, cart!)}
              variant={product?.productVariants![0]}
            />
          </div>
        </ItemDetails>
        <motion.button
          className="remove-btn"
          custom={1.2}
          whileTap="tap"
          whileHover="hover"
          variants={variants.grow}
          onClick={TrigerhandleWishBtnClick(
            product,
            handleWishBtnClick(product, dispatch, wishlist),
          )}
        >
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
        </motion.button>
      </div>
    </Item>
  );
};

const Item = styled.li`
  padding: 10px 0;
  .item-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    position: relative;
    background-color: ${color.bgProduct};
    box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
    border-radius: 10px;
    gap: 50px;
    .remove-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
  @media ${devices.laptopS} {
    .item-container {
      flex-direction: column;
    }
  }
  @media ${devices.tabletL} {
    .item-container {
      flex-direction: column;
    }
  }
  @media ${devices.tabletS} {
    .item-container {
      flex-direction: column;
    }
  }
  @media ${devices.mobileL} {
    .item-container {
      flex-direction: column;
    }
  }
  @media ${devices.mobileM} {
    .item-container {
      flex-direction: column;
    }
  }
  @media ${devices.mobileS} {
    .item-container {
      flex-direction: column;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  img {
    width: 220px;
    height: 220px;
    border-radius: 5px;
    object-fit: cover;
  }
  .wishlist-btn-container {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
`;

const ItemDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  .product-title {
    width: 100%;
    h4 {
      text-align: left;
      font-weight: 400;
      &:hover {
        text-decoration: underline 1px;
        color: ${color.hoverBtnBg};
      }
    }
  }
  .product-price-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-left;
    align-items: center;
    gap: 20px;
    h3 {
      font-family: ver(--font-Jost);
      font-size: 2rem;
    }
    span {
      font-family: ver(--font-Jost);
      font-size: 2rem;
    }
  }
  .review-and-rating-Wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-left;
    align-items: center;
    gap: 5px;
    span {
      font-family: ver(--font-Jost);
      font-size: 14px;
    }
    .reviews {
      color: ${color.hoverBtnBg};
    }
  }
  .item-action-btns-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-left;
    align-items: center;
    gap: 20px;
    .in-cart-sign {
      width: 200px;
      height: 40px;
      position: relative;
      overflow: hidden;
      transition: 300ms;
      &:hover {
        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
      }
      .in-cart {
        border: 1px solid;
        gap: 10px;
      }
      .not-in-cart {
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
      }
      button {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
  @media ${devices.laptopS} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      .in-cart-sign {
        width: 100%;
      }
    }
  }
  @media ${devices.tabletL} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      .in-cart-sign {
        width: 100%;
      }
    }
  }
  @media ${devices.tabletS} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      .in-cart-sign {
        width: 100%;
      }
    }
  }
  @media ${devices.mobileL} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      .in-cart-sign {
        width: 100%;
      }
    }
  }
  @media ${devices.mobileM} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      .in-cart-sign {
        width: 100%;
      }
    }
  }
  @media ${devices.mobileS} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      .in-cart-sign {
        width: 100%;
      }
    }
  }
`;

export default ItemWishlist;
