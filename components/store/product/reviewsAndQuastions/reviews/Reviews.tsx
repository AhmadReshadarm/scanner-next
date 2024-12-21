import { Rating } from '@mui/material';
import { Modal } from 'antd';
import { Reaction } from 'common/enums/reaction.enum';
import color from 'components/store/lib/ui.colors';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import {
  createComment,
  deleteComment,
  deleteReview,
  sortReviews,
  updateComment,
} from 'redux/slicers/store/productInfoSlicer';

import { reviewDropdownOption } from '../../constants';
import Filters from '../Filters';
import LikeDisLike from '../LikeOrDisLike';
import {
  getReactionNumber,
  handleCommentReactionClick,
  handleReviewReactionClick,
} from './helpers';
import SingleUserImagesSlider from './SingleUserImagesSlider';
import { Role } from 'common/enums/roles.enum';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { handleMenuState } from './helpers';
import Pagination from '../../productInfo/images/Pagination';
import styles from '../../styles/review.module.css';

export enum ModalType {
  Review,
  Comment,
}

const Review = ({ product }) => {
  const dispatch = useAppDispatch();

  const [filterValue, setFilterValue] = useState('Сначала полезные');
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [isCommentSendVisibleMap, setIsCommentSendVisibleMap] = useState({});
  const [isCommentEditeSendVisibleMap, setIsCommentEditeSendVisibleMap] =
    useState({});
  const [commentValueMap, setCommentValueMap] = useState({});
  const [commentEditeValueMap, setCommentEditeValueMap] = useState({
    text: '',
  });
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  // ____________  user images hooks start ___________

  const [isOpened, setIsOpened] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [seleteduser, setSeletedUser] = useState(0);
  // ____________ user images hooks end ______________
  // _________________ paginition _______________________
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  // ____________________________________________________

  const onReviewRemoveClick = (id: string) => () => {
    setIsReviewModalVisible(true);
    setReviewId(id);
  };

  const handleReviewRemove = (id: string) => () => {
    setIsReviewModalVisible(false);
    dispatch(deleteReview(id));
  };

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false);
  };

  const onCommentRemoveClick = (id: string) => () => {
    setIsCommentModalVisible(true);
    setCommentId(id);
  };

  const handleCommentRemove = (id: string) => () => {
    setIsCommentModalVisible(false);
    dispatch(deleteComment(id));
  };

  const handleCommentCancel = () => {
    setIsCommentModalVisible(false);
  };

  const handleLeaveCommentClick = (reviewId: string) => () => {
    setIsCommentSendVisibleMap((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };
  const handleEditeCommentClick =
    (commentId: string, commentText: string) => () => {
      setCommentEditeValueMap((prev) => ({
        ...prev,
        text: commentText,
      }));

      setIsCommentEditeSendVisibleMap((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    };
  const handleCommentValueChange = (reviewId: string) => (e) => {
    setCommentValueMap((prev) => ({
      ...prev,
      [reviewId]: e.target.value,
    }));
  };
  const handleCommentEditeValueChange = (commentId: string) => (e) => {
    setCommentEditeValueMap((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleCreateComment =
    (reviewId: string, commentValue: string, userId: string) => async () => {
      if (commentValue == '' || commentValue == undefined) return;

      await dispatch(createComment({ reviewId, text: commentValue, userId }));
      setIsCommentSendVisibleMap((prev) => ({
        ...prev,
        [reviewId]: false,
      }));
    };

  const handleUpdateComment =
    (
      commentId: string,
      reviewId: string,
      commentValue: string,
      userId: string,
    ) =>
    async () => {
      if (commentValue == '' || commentValue == undefined) return;
      const payload = {
        reviewId,
        text: commentValue,
        userId,
      };
      await dispatch(
        updateComment({
          commentId,
          payload,
        }),
      );

      setIsCommentEditeSendVisibleMap((prev) => ({
        ...prev,
        [commentId]: false,
      }));
    };

  const handleSortChange = (option) => {
    setFilterValue(option);
    dispatch(sortReviews(option));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(sortReviews(reviewDropdownOption[1]));
    }, 1000);
  }, []);

  const getImages = (review) => {
    return review.images ? review.images?.split(', ') : [];
  };

  return (
    <>
      <Filters
        options={reviewDropdownOption}
        value={filterValue}
        setValue={handleSortChange}
      />
      <ul className={styles.ReviewContainer}>
        {!product?.reviews?.length && <li>Отзывов пока нет.</li>}
        {product?.reviews?.map((review, key) => {
          const isReviewLiked = !!review.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Like,
          );
          const isReviewDisliked = !!review.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Dislike,
          );
          const likeNum = getReactionNumber(review.reactions, Reaction.Like);
          const dislikeNum = getReactionNumber(
            review.reactions,
            Reaction.Dislike,
          );
          const thumbnails = review.images ? review.images?.split(', ') : [];

          return (
            <React.Fragment key={`review-${key}`}>
              <li className={styles.ReviewReplyWrapper}>
                <div className={styles.ReviewReplyContent}>
                  <div className={styles.UserImageWrapper}>
                    <div className={styles.user_profile_img}>
                      {review.user?.role === Role.Admin ? (
                        <span>NBHOZ</span>
                      ) : (
                        <img
                          src={
                            review.user?.image
                              ? `/api/images/${review.user.image}`
                              : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${review.user?.firstName}`
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${review.user?.firstName}`;
                          }}
                          alt={review.user?.firstName}
                        />
                      )}
                    </div>
                    <div className={styles.side_line}></div>
                  </div>
                  <div className={styles.ReviewReplyItem}>
                    <div className={styles.review_header}>
                      <h3>{review?.user?.firstName}</h3>
                      <span className={styles.date_stars}>
                        <span className={styles.post_date}>
                          {moment(review.createdAt).format('DD.MM.YYYY')}
                          {review.user?.id == user?.id &&
                          review.comments?.length == 0 ? (
                            <button onClick={onReviewRemoveClick(review.id!)}>
                              Удалить
                            </button>
                          ) : (
                            ''
                          )}
                        </span>
                        <span>
                          <Rating
                            value={review.rating}
                            size="medium"
                            readOnly
                          />
                        </span>
                      </span>
                    </div>
                    <div className={styles.user_post_text}>
                      <h3>Отзыв</h3>
                      <span>{review.text}</span>
                    </div>
                    {/* fullscreen mode  start */}
                    {thumbnails?.length! > 0 ? (
                      <div className={styles.ThumbnailsWrapper}>
                        <h3 className={styles.title_users_images}>
                          Фото покупатель
                        </h3>
                        <div className={styles.client_images_wrapper}>
                          {thumbnails.map((image, index) => {
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
                        {/* ___________ open full screen _______________ */}
                        <button
                          onClick={handleMenuState(
                            setIsOpened,
                            setSelectedIndex,
                            setSeletedUser,
                            key,
                          )}
                          className={styles.show_all_action_btn}
                        >
                          Смотреть все
                        </button>
                      </div>
                    ) : (
                      ''
                    )}

                    <div
                      style={{
                        display:
                          isOpened && seleteduser == key ? 'flex' : 'none',
                      }}
                      className={styles.ProductImagesFullScreenWrapper}
                    >
                      <div className={styles.pagination_and_slider_wrapper}>
                        <span
                          onClick={handleMenuState(
                            setIsOpened,
                            setSelectedIndex,
                            setSeletedUser,
                            key,
                          )}
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
                        <SingleUserImagesSlider
                          images={getImages(review)}
                          selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}
                          isOpened={isOpened}
                          direction={direction}
                          page={page}
                          paginateImage={paginateImage}
                        />
                        <Pagination
                          images={getImages(review)}
                          selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}
                          paginateImage={paginateImage}
                          alt={product?.name}
                          isOpened={isOpened}
                        />
                      </div>
                    </div>
                    {/* fullscreen mode  end */}
                    <LikeDisLike
                      likeNum={likeNum}
                      dislikeNum={dislikeNum}
                      isLiked={isReviewLiked}
                      isDisliked={isReviewDisliked}
                      bgColor={color.textPrimary}
                      onLikeClick={handleReviewReactionClick(
                        review,
                        dispatch,
                        Reaction.Like,
                        user,
                      )}
                      onDislikeClick={handleReviewReactionClick(
                        review,
                        dispatch,
                        Reaction.Dislike,
                        user,
                      )}
                    />
                  </div>
                </div>
              </li>
              {/* _____________  Comments Start _____________ */}

              {review.comments?.map((comment, index) => {
                const isCommentLiked = !!comment.reactions?.find(
                  (reaction) =>
                    reaction.userId == user?.id &&
                    reaction.reaction === Reaction.Like,
                );
                const isCommentDisliked = !!comment.reactions?.find(
                  (reaction) =>
                    reaction.userId == user?.id &&
                    reaction.reaction === Reaction.Dislike,
                );
                const likeNum = getReactionNumber(
                  comment.reactions,
                  Reaction.Like,
                );
                const dislikeNum = getReactionNumber(
                  comment.reactions,
                  Reaction.Dislike,
                );

                return (
                  <div className={styles.ReplyWrapper}>
                    {/* ______ edite mode start  _______ */}
                    {isCommentEditeSendVisibleMap[comment?.id!] ? (
                      <div className={styles.UserCommentWrapper}>
                        <textarea
                          className={styles.UserCommentField}
                          placeholder="Напишите комментарий"
                          value={commentEditeValueMap.text}
                          onChange={handleCommentEditeValueChange(comment?.id!)}
                        />
                        <div className={styles.comment_action_btns_wrapper}>
                          <button
                            className={styles.SendUserCommentBtn}
                            onClick={handleUpdateComment(
                              comment?.id!,
                              review?.id!,
                              commentEditeValueMap.text,
                              user?.id!,
                            )}
                          >
                            Отправить
                          </button>
                          <button
                            className={styles.SendUserCommentBtn}
                            onClick={handleEditeCommentClick(
                              comment?.id!,
                              comment.text!,
                            )}
                          >
                            Отмена
                          </button>
                        </div>
                      </div>
                    ) : (
                      // edite mode end
                      <div className={styles.ReviewReplyContent}>
                        <div className={styles.UserImageWrapper}>
                          <div className={styles.user_profile_img}>
                            {comment.user?.role === Role.Admin ? (
                              <span>NBHOZ</span>
                            ) : (
                              <img
                                src={
                                  comment.user?.image
                                    ? `/api/images/${comment.user.image}`
                                    : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${comment.user?.firstName}`
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${comment.user?.firstName}`;
                                }}
                                alt={comment.user?.firstName}
                              />
                            )}
                          </div>
                          <div className={styles.side_line}></div>
                        </div>
                        <div className={styles.ReviewReplyItem}>
                          <div className={styles.review_header}>
                            <div className={styles.replied_to_wrapper}>
                              <h3>{comment.user?.firstName}</h3>
                              <span>{`в ответ ${review.user?.firstName}`}</span>
                            </div>
                            <span className={styles.date_stars}>
                              <span className={styles.post_date}>
                                {moment(comment.createdAt).format('DD.MM.YYYY')}
                                {user?.role === Role.Admin ||
                                (comment.user?.id == user?.id && user) ? (
                                  <button
                                    onClick={onCommentRemoveClick(comment.id!)}
                                  >
                                    Удалить
                                  </button>
                                ) : (
                                  ''
                                )}
                                {user?.role === Role.Admin &&
                                comment.user?.id == user?.id ? (
                                  <button
                                    onClick={handleEditeCommentClick(
                                      comment?.id!,
                                      comment.text!,
                                    )}
                                  >
                                    Редактировать
                                  </button>
                                ) : (
                                  ''
                                )}
                              </span>
                            </span>
                          </div>
                          <div className={styles.user_post_text}>
                            <span>{comment.text}</span>
                          </div>
                          <LikeDisLike
                            likeNum={likeNum}
                            dislikeNum={dislikeNum}
                            isLiked={isCommentLiked}
                            isDisliked={isCommentDisliked}
                            bgColor={color.textPrimary}
                            onLikeClick={handleCommentReactionClick(
                              review,
                              comment,
                              dispatch,
                              Reaction.Like,
                              user,
                            )}
                            onDislikeClick={handleCommentReactionClick(
                              review,
                              comment,
                              dispatch,
                              Reaction.Dislike,
                              user,
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {/* ____________ Comments end _______________ */}
              {user ? (
                (!isCommentSendVisibleMap[review?.id!] &&
                  user.id === review.user?.id &&
                  review.comments?.length !== 0) ||
                user.role === Role.Admin ? (
                  <div className={styles.LoadMoreBtnWrapper}>
                    <button onClick={handleLeaveCommentClick(review?.id!)}>
                      Оставить комментарий
                    </button>
                  </div>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {/* ________ New comment start __________ */}
              {user && isCommentSendVisibleMap[review?.id!] && (
                <div className={styles.UserCommentWrapper}>
                  <textarea
                    className={styles.UserCommentField}
                    placeholder="Напишите комментарий"
                    onChange={handleCommentValueChange(review?.id!)}
                  />
                  <div className={styles.comment_action_btns_wrapper}>
                    <button
                      className={styles.SendUserCommentBtn}
                      onClick={handleCreateComment(
                        review?.id!,
                        commentValueMap[review?.id!],
                        user?.id!,
                      )}
                    >
                      Отправить
                    </button>
                    <button
                      className={styles.SendUserCommentBtn}
                      onClick={handleLeaveCommentClick(review?.id!)}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}
              {/* ________ New comment end __________ */}
            </React.Fragment>
          );
        })}
      </ul>
      <Modal
        title={'Вы действительно хотите удалить этот отзыв?'}
        open={isReviewModalVisible}
        onOk={handleReviewRemove(reviewId)}
        onCancel={handleReviewCancel}
      />
      <Modal
        title={'Вы действительно хотите удалить этот комментарий?'}
        open={isCommentModalVisible}
        onOk={handleCommentRemove(commentId)}
        onCancel={handleCommentCancel}
      />
    </>
  );
};

export default Review;
