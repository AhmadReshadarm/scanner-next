import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import { Rating } from '@mui/material';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import { Wrapper } from '../storeLayout/common';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TReviewState } from 'redux/types';
import { useEffect, useState } from 'react';
import { fetchReviews } from 'redux/slicers/reviewsSlicer';
import Subscribers from 'ui-kit/Subscribers';
// import { Pagination } from 'antd';
import Pagination from 'antd/es/pagination';

const ReviewsItems = () => {
  const dispatch = useAppDispatch();
  const { reviewsLenght, reviews, loading } = useAppSelector<TReviewState>(
    (state) => state.reviews,
  );

  useEffect(() => {
    dispatch(fetchReviews({ limit: '20', offset: '0' }));
  }, []);
  // _____________________ paginition start ________________________

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]: [number, any] = useState(20);
  const handlePageChange = (
    page: number,
    pageSize: number,
    current: number,
  ) => {
    setPageSize(pageSize);
    setCurrentPage(current);

    const offset = Number(pageSize) * (Number(page ?? 1) - 1);
    dispatch(
      fetchReviews({
        offset: `${offset}`,
        limit: `${pageSize}`,
      }),
    );
  };
  // _____________________ paginition end ________________________

  return (
    <>
      <Wrapper
        flex_direction="column"
        gap="40px"
        style={{ flexDirection: 'column', padding: '50px 0' }}
      >
        {!loading ? (
          reviews.length !== 0 ? (
            <ReviewsList>
              {reviews?.map((review, index) => {
                const images = getProductVariantsImages(
                  review.product?.productVariants,
                );

                return (
                  <ReviewsItem key={index}>
                    <div className="review-info-wrapper">
                      <Link href={`/product/${review.product?.url}`}>
                        <h1
                          title={review.product?.name}
                          className="product-title"
                        >
                          {review.product?.name}
                        </h1>
                      </Link>
                      <div className="review-and-profile-wrapper">
                        <div className="profile-rating-wrapper">
                          <span
                            title={`${
                              review.rating == 0
                                ? review.rating + ' звезд'
                                : review.rating == 4
                                ? review.rating + ' звезда'
                                : review.rating + ' звезды'
                            } `}
                            className="rating-wrapper"
                          >
                            <Rating
                              value={review.rating}
                              size="small"
                              readOnly
                            />
                          </span>
                          <ReviewWrapper>
                            <img
                              title={
                                review.user?.firstName
                                  ? review.user?.firstName
                                  : 'Unknown'
                              }
                              src={
                                review.user?.image
                                  ? `/api/images/${review.user.image}`
                                  : `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${
                                      review.user?.firstName
                                        ? review.user?.firstName
                                        : 'Unknown'
                                    }`
                              }
                              alt={review.user?.firstName}
                              className="image-wrapper"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${
                                  review.user?.firstName
                                    ? review.user?.firstName
                                    : 'Unknown'
                                }`;
                              }}
                            />
                            <div className="review-text-btn-wrapper">
                              <h2 className="user-name-wrapper">
                                {review.user?.firstName}
                              </h2>
                            </div>
                          </ReviewWrapper>
                        </div>
                        <span title={review.text} className="review-text">
                          {review.text}
                        </span>
                      </div>
                    </div>

                    <div className="product-image-wrapper">
                      <img
                        src={`/api/images/${images[0]!}`}
                        alt={review.product?.name}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = '/img_not_found.png';
                        }}
                      />
                    </div>
                  </ReviewsItem>
                );
              })}
            </ReviewsList>
          ) : (
            <div>Пако Нет отзывов</div>
          )
        ) : (
          <LoaderMask />
        )}
        <Pagination
          style={{ marginTop: '20px' }}
          current={currentPage}
          total={reviewsLenght}
          pageSize={pageSize}
          pageSizeOptions={[12, 24, 36, 50, 100]}
          onChange={(current, pageSize) => {
            handlePageChange(current, pageSize, current);
          }}
          locale={{ items_per_page: '/ странице' }}
        />
      </Wrapper>
      <Subscribers />
    </>
  );
};

const ReviewsList = styled.ul`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;
const ReviewsItem = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: ${color.bgProduct};
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  user-select: none;
  gap: 30px;
  .review-info-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    .product-title {
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 400;
      &:hover {
        color: ${color.hoverBtnBg};
        text-decoration: underline;
      }
    }

    .review-and-profile-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 50px;
      .profile-rating-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;
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

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
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

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
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

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
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

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
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

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
      }
    }
  }
`;

const ReviewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 0;
  gap: 10px;
  .image-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media ${devices.tabletL} {
    align-items: center;
  }
  @media ${devices.tabletS} {
    align-items: center;
  }
  @media ${devices.mobileL} {
    align-items: center;
  }
  @media ${devices.mobileM} {
    align-items: center;
  }
  @media ${devices.mobileS} {
    align-items: center;
  }
`;

export default ReviewsItems;
