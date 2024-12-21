import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { Rating } from '@mui/material';
import Link from 'next/link';
import AddReview from './AddReview';
import { Review } from 'swagger/services';
import { devices } from 'components/store/lib/Devices';

type Props = {
  review: Review;
};
const ReviewsItems: React.FC<Props> = ({ review }) => {
  const [isOpen, setOpen] = useState(false);
  const images = review.product?.productVariants?.map((variants) =>
    variants.images?.split(', '),
  );

  return (
    <ReviewsItem
      style={{ justifyContent: isOpen ? 'center' : 'space-between' }}
    >
      {isOpen ? (
        <AddReview setOpen={setOpen} review={review} />
      ) : (
        <>
          <div className="review-info-wrapper">
            <Link href={`/product/${review.product?.url}`}>
              <h1 className="product-title">{review.product?.name}</h1>
            </Link>
            <span>
              <Rating value={review.rating} size="small" readOnly />
            </span>
            <span className="review-text">{review.text?.slice(0, 100)}</span>
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              className="add-review-btn"
              onClick={() => setOpen(true)}
            >
              Редактировать
            </motion.button>
          </div>
          <Link href={`/product/${review.product?.url}`}>
            <div className="product-image-wrapper">
              <img
                src={`/api/images/${images![0]![0]}`}
                alt={review.product?.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = '/img_not_found.png';
                }}
              />
            </div>
          </Link>
        </>
      )}
    </ReviewsItem>
  );
};

const ReviewsItem = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: ${color.bgProduct};
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  user-select: none;
  .review-info-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    .product-title {
      font-size: 1.5rem;
      line-height: 2rem;
      &:hover {
        color: ${color.hoverBtnBg};
        text-decoration: underline;
      }
    }
    .review-text {
      width: 80%;
    }
    .add-review-btn {
      width: 200px;
      height: 40px;
      border-radius: 3px;
      background-color: ${color.btnSecondery};
      cursor: pointer;
      transition: 300ms;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      &:hover {
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
      }
    }
  }
  .product-image-wrapper {
    width: 220px;
    min-width: 220px;
    height: 220px;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media ${devices.tabletL} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }
      .review-text {
        width: 90%;
        text-align: center;
      }
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }
      .review-text {
        width: 90%;
        text-align: center;
      }
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }
      .review-text {
        width: 90%;
        text-align: center;
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }
      .review-text {
        width: 90%;
        text-align: center;
      }
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }
      .review-text {
        width: 90%;
        text-align: center;
      }
    }
  }
`;

export default ReviewsItems;
