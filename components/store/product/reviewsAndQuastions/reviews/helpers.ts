import { Reaction } from 'common/enums/reaction.enum';
import { openErrorNotification } from 'common/helpers';
import { createImage } from 'redux/slicers/imagesSlicer';
import {
  createCommentReaction,
  createReviewReaction,
  deleteCommentReaction,
  deleteReviewReaction,
} from 'redux/slicers/store/productInfoSlicer';
import { AppDispatch } from 'redux/store';
import { Dispatch, SetStateAction } from 'react';
// import { PopupDisplay } from 'components/store/storeLayout/constants';
import {
  Comment,
  CommentReaction,
  Rating,
  ReviewReaction,
  ReviewWithoutJoins,
  User,
} from 'swagger/services';

const progressBarCalc = (totalReviews: number, totalStars: number) => {
  return (totalStars * 100) / totalReviews;
};

const handleFileChange = async (
  event: any,
  setSrc: any,
  dispatch: AppDispatch,
  setUploadBtnAvailable,
) => {
  setUploadBtnAvailable(false);
  const fileObj = event.target.files;
  if (!fileObj[0]) {
    return;
  }
  if (fileObj.length > 4) {
    openErrorNotification('запрещено более 4 файлов');
    return;
  }
  const imagesUrl: any = [];
  for (let i = 0; i < fileObj.length; i++) {
    const restriction = 5242880;
    if (fileObj[i].size > restriction) {
      openErrorNotification(
        `Размер файла ${fileObj[i].name} более 5 МБ не допускается.`,
      );
      return;
    }
    imagesUrl.push(URL.createObjectURL(fileObj[i]));

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    try {
      await dispatch(
        createImage({
          config,
          file: fileObj[i],
        }),
      );
    } catch (error: any) {}
  }
  setSrc(imagesUrl);
};

const getTotalReviewsNumber = (rating: Rating | undefined): number => {
  return rating
    ? Object.entries(rating).reduce((accum, [key, number]) => {
        if (isNaN(Number(key))) {
          return accum;
        }
        return accum + number;
      }, 0)
    : 0;
};

const getReactionNumber = (
  reactions: (ReviewReaction | CommentReaction)[] | undefined,
  reactionValue: Reaction,
) => {
  return (
    reactions?.reduce((accum, reaction) => {
      return reaction.reaction === reactionValue ? accum + 1 : accum;
    }, 0) ?? 0
  );
};

const handleReviewReactionClick =
  (
    review: ReviewWithoutJoins,
    dispatch: any,
    reactionValue: Reaction,
    user: User | null,
  ) =>
  async (e) => {
    e.preventDefault();
    if (review.userId == user?.id) {
      openErrorNotification('Вы не можете реагировать на собственный отзыв');
      return;
    }
    const reaction = review.reactions?.find(
      (reaction) => reaction.userId == user?.id,
    );

    if (reaction && reaction.reaction === reactionValue) {
      dispatch(deleteReviewReaction(reaction.id!));
    } else if (reaction && reaction.reaction !== reactionValue) {
      await dispatch(deleteReviewReaction(reaction.id!));
      dispatch(
        createReviewReaction({
          userId: user?.id!,
          reviewId: review.id!,
          reaction: reactionValue,
        }),
      );
    } else {
      dispatch(
        createReviewReaction({
          userId: user?.id!,
          reviewId: review.id!,
          reaction: reactionValue,
        }),
      );
    }
  };

const handleCommentReactionClick =
  (
    review: ReviewWithoutJoins,
    comment: Comment,
    dispatch: any,
    reactionValue: Reaction,
    user: User | null,
  ) =>
  async (e) => {
    e.preventDefault();
    const reaction = comment.reactions?.find(
      (reaction) => reaction.userId == user?.id,
    );

    if (reaction && reaction.reaction === reactionValue) {
      dispatch(
        deleteCommentReaction({ id: reaction.id!, reviewId: review.id! }),
      );
    } else if (reaction && reaction.reaction !== reactionValue) {
      await dispatch(
        deleteCommentReaction({ id: reaction.id!, reviewId: review.id! }),
      );
      dispatch(
        createCommentReaction({
          userId: user?.id!,
          commentId: comment.id!,
          reviewId: review.id!,
          reaction: reactionValue,
        }),
      );
    } else {
      dispatch(
        createCommentReaction({
          userId: user?.id!,
          commentId: comment.id!,
          reviewId: review.id!,
          reaction: reactionValue,
        }),
      );
    }
  };

const handleMenuState =
  (
    setIsOpened: Dispatch<SetStateAction<boolean>>,
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    setSeletedUser: Dispatch<SetStateAction<number>>,
    key: number,
  ) =>
  () => {
    setSelectedIndex(0);
    setSeletedUser(key);
    setIsOpened((prev) => !prev);
  };

export {
  progressBarCalc,
  handleFileChange,
  getTotalReviewsNumber,
  getReactionNumber,
  handleReviewReactionClick,
  handleCommentReactionClick,
  handleMenuState,
};
