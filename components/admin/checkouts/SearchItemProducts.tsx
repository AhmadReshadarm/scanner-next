import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import { Product } from 'swagger/services';
import { handleSearchItemClick } from './helpers';

type Props = {
  product: Product;
  index: number;
  basketList: Product[];
  setBasketList: any;
};

const SearchItem: React.FC<Props> = ({
  product,
  index,
  basketList,
  setBasketList,
}) => {
  const images = getProductVariantsImages(product?.productVariants);

  return (
    <CardItemContainer
      key={`product-reasult-${index}`}
      custom={1.01}
      whileHover="hover"
      whileTap="tap"
      variants={variants.grow}
    >
      <ItemImageAndBtnWrapper>
        <img
          src={`/api/images/${images[0]}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
            currentTarget.className = 'image-on-error';
          }}
          alt={product.name}
        />
      </ItemImageAndBtnWrapper>
      <ItemTitelWrapper>{product.name}</ItemTitelWrapper>
      <button
        onClick={() =>
          handleSearchItemClick(basketList, setBasketList, product)
        }
        disabled={
          basketList.find(
            (productInBasket) => productInBasket.id === product.id,
          )
            ? true
            : false
        }
      >
        <span>Добавить в список</span>
      </button>
    </CardItemContainer>
  );
};

const CardItemContainer = styled(motion.li)`
  width: 260px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  border-radius: 10px;
  background-color: ${color.bgPrimary};
  overflow: hidden;
  padding: 0 0 10px 0;

  button {
    width: 200px;
    height: 40px;
    background-color: ${color.btnSecondery};
    cursor: pointer;
    transition: 300ms;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
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

  @media ${devices.laptopS} {
    min-width: 300px;
  }
  @media (min-width: 550px) and (max-width: 768px) {
    min-width: 225px !important;
    width: 225px !important;
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
  height: 50%;
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

const ItemTitelWrapper = styled.span`
  width: 100%;
  overflow: hidden;
  text-align: center;
  padding: 20px 10px;
`;

export default SearchItem;
