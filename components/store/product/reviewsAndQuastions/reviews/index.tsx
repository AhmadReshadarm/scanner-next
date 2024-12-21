import { useEffect, useState } from 'react';
import Stars from './Stars';
import UserImagesSlider from './UserImagesSlider';
import Review from './Reviews';
import AuthorizeReviewBtn from '../AuthorizeBtn';
import AddReview from './AddReview';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  TAuthState,
  TProductInfoState,
  TStoreCheckoutState,
} from 'redux/types';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { handleMenuState } from 'components/store/storeLayout/helpers';
import Pagination from '../../productInfo/images/Pagination';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { Role } from 'common/enums/roles.enum';
import { Checkout } from 'swagger/services';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { getAccessToken } from 'common/helpers/jwtToken.helpers';
import styles from '../../styles/review.module.css';
const Reviews = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { product } = useAppSelector<TProductInfoState>(
    (state) => state.productInfo,
  );

  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const [isReviewAlreadyPublished, setIsReviewAlreadyPublished] = useState(
    () => !!product?.reviews?.find((review) => review.user?.id == user?.id),
  );

  const thumbnails = product?.reviews?.reduce((accum: string[], review) => {
    const images = review.images ? review.images.split(', ') : [];
    return images && images.length ? accum.concat(images) : accum;
  }, []);

  const { checkouts, loading } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  const isInUserCheckout = (productId: string, checkedOuts: Checkout[]) => {
    let isInBasket = false;
    checkedOuts.map((checkout) => {
      checkout.basket?.orderProducts!.find((productInbasket) => {
        if (productInbasket.product?.id === productId) {
          isInBasket = true;
          return;
        }
      });
    });

    return isInBasket ? true : false;
  };

  useEffect(() => {
    setIsReviewAlreadyPublished(
      () => !!product?.reviews?.find((review) => review.user?.id == user?.id),
    );
  }, [product]);

  useEffect(() => {
    if (getAccessToken()) dispatch(fetchCheckouts());
  }, []);

  return (
    <div className={styles.ContentContainer}>
      <div className={styles.ContentWrapper}>
        {thumbnails?.length! > 0 ? (
          <div className={styles.ThumbnailsWrapper}>
            <h3 className={styles.title_users_images}>Фото покупателей</h3>
            <div className={styles.client_images_wrapper}>
              {thumbnails!.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={`/api/images/${image}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/img_not_found.png';
                    }}
                    className={styles.image_container}
                  />
                );
              })}
            </div>

            <button
              onClick={handleMenuState(setIsOpened, setDisplay)}
              className={styles.show_all_action_btn}
            >
              <span>Смотреть все</span>
            </button>
          </div>
        ) : (
          ''
        )}

        <div
          style={{ display }}
          className={styles.ProductImagesFullScreenWrapper}
        >
          <div className={styles.pagination_and_slider_wrapper}>
            <span
              onClick={handleMenuState(setIsOpened, setDisplay)}
              className={styles.close_btn_wrapper}
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
            </span>
            <UserImagesSlider
              images={thumbnails!}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isOpened={isOpened}
              direction={direction}
              page={page}
              paginateImage={paginateImage}
            />
            <Pagination
              images={thumbnails!}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              paginateImage={paginateImage}
              alt={product?.name}
              isOpened={isOpened}
            />
          </div>
        </div>
        {/* fullscreen mode  end */}

        <Review product={product} />
      </div>
      <div className={styles.ContentWrapper}>
        <Stars />
        {user && !loading && product ? (
          (isInUserCheckout(product?.id!, checkouts) &&
            user.isVerified &&
            !isReviewAlreadyPublished) ||
          user.role === Role.Admin ? (
            <AddReview product={product} />
          ) : (
            !isReviewAlreadyPublished && (
              <AuthorizeReviewBtn
                text="Написать отзыв"
                alertSignIn="Войдите, чтобы оставить отзыв"
                setAuthorized={user}
                isInUserCheckout={isInUserCheckout}
                productId={product.id}
                checkouts={checkouts}
              />
            )
          )
        ) : (
          !isReviewAlreadyPublished && (
            <AuthorizeReviewBtn
              text="Написать отзыв"
              alertSignIn="Войдите, чтобы оставить отзыв"
              setAuthorized={user}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Reviews;
