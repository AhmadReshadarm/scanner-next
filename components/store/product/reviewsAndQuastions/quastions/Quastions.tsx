import { motion } from 'framer-motion';
import { useState } from 'react';
import Filters from '../Filters';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import LikeDisLike from '../LikeOrDisLike';
import { quastionsDropdownOption } from '../../constants';
import {
  LoadMoreBtnWrapper,
  ReviewContainer,
  ReviewReplyWrapper,
  ReviewReplyContent,
  ReviewReplyItem,
  UserImageWrapper,
  ReplyWrapper,
} from '../../common';
import moment from 'moment';
// import { Modal } from 'antd';
import Modal from 'antd/es/modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  createQuestionComment,
  deleteQuestion,
  deleteQuestionComment,
  sortQuestions,
  updateCommentQuestion,
} from 'redux/slicers/store/productInfoSlicer';

import { Reaction } from 'common/enums/reaction.enum';
import { getReactionNumber } from '../reviews/helpers';
import {
  handleCommentReactionClick,
  handleQuestionReactionClick,
} from './helpers';
import styled from 'styled-components';
import { Role } from 'common/enums/roles.enum';
import { TAuthState } from 'redux/types';
import { useRouter } from 'next/router';

const Quastion = ({ product }) => {
  const dispatch = useAppDispatch();
  const [filterValue, setFilterValue] = useState('Сначала новые');
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [questionId, setQuestion] = useState('');
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [isCommentSendVisibleMap, setIsCommentSendVisibleMap] = useState({});
  const [commentValueMap, setCommentValueMap] = useState({});
  const [commentEditeValueMap, setCommentEditeValueMap] = useState({
    text: '',
  });
  const [isCommentEditeSendVisibleMap, setIsCommentEditeSendVisibleMap] =
    useState({});

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

  const handleCommentEditeValueChange = (commentId: string) => (e) => {
    setCommentEditeValueMap((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleUpdateComment =
    (
      commentId: string,
      questionId: string,
      commentValue: string,
      userId: string,
    ) =>
    async () => {
      if (commentValue == '' || commentValue == undefined) return;
      const payload = {
        questionId,
        text: commentValue,
        userId,
      };
      await dispatch(
        updateCommentQuestion({
          commentId,
          payload,
        }),
      );

      setIsCommentEditeSendVisibleMap((prev) => ({
        ...prev,
        [commentId]: false,
      }));
    };

  const onQuestionRemoveClick = (id: string) => () => {
    setIsQuestionModalVisible(true);
    setQuestion(id);
  };

  const handleQuestionRemove = (id: string) => () => {
    setIsQuestionModalVisible(false);
    dispatch(deleteQuestion(id));
  };

  const handleQuestionCancel = () => {
    setIsQuestionModalVisible(false);
  };

  const onCommentRemoveClick = (id: string) => () => {
    setIsCommentModalVisible(true);
    setCommentId(id);
  };

  const handleCommentRemove = (id: string) => () => {
    setIsCommentModalVisible(false);
    dispatch(deleteQuestionComment(id));
  };

  const handleCommentCancel = () => {
    setIsCommentModalVisible(false);
  };

  const handleLeaveCommentClick = (questionId: string) => () => {
    setIsCommentSendVisibleMap((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleCommentValueChange = (questionId: string) => (e) => {
    setCommentValueMap((prev) => ({
      ...prev,
      [questionId]: e.target.value,
    }));
  };

  const handleCreateComment =
    (questionId: string, commentValue: string, userId: string) => async () => {
      if (commentValue == '' || commentValue == undefined) return;

      await dispatch(
        createQuestionComment({ questionId, text: commentValue, userId }),
      );
      setIsCommentSendVisibleMap((prev) => ({
        ...prev,
        [questionId]: false,
      }));
    };

  const handleSortChange = (option) => {
    setFilterValue(option);
    dispatch(sortQuestions(option));
  };

  const router = useRouter();

  return (
    <>
      {router.pathname.includes('/admin') ? (
        ''
      ) : (
        <Filters
          options={quastionsDropdownOption}
          value={filterValue}
          setValue={handleSortChange}
        />
      )}
      <ReviewContainer>
        {product?.questions?.map((question) => {
          const isReviewLiked = !!question.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Like,
          );
          const isReviewDisliked = !!question.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Dislike,
          );
          const likeNum = getReactionNumber(question.reactions, Reaction.Like);
          const dislikeNum = getReactionNumber(
            question.reactions,
            Reaction.Dislike,
          );

          return (
            <div className="comment-map-func-wrapper" key={question.id}>
              <ReviewReplyWrapper
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.2}
                variants={variants.fadInSlideUp}
              >
                <ReviewReplyContent>
                  <UserImageWrapper>
                    <div className="user-profile-img">
                      {question.user.role === Role.Admin ? (
                        <span>NBHOZ</span>
                      ) : (
                        <img
                          src={
                            question.user?.image
                              ? `/api/images/${question.user.image}`
                              : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${question.user?.firstName}`
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${question.user?.firstName}`;
                          }}
                          alt={question.user?.firstName}
                        />
                      )}
                    </div>
                    <div className="side-line"></div>
                  </UserImageWrapper>
                  <ReviewReplyItem>
                    <div className="review-header">
                      <h3>{question.user?.firstName}</h3>
                      <span className="date-stars">
                        <span className="post-date">
                          {moment(question.createdAt!).format('DD.MM.YYYY')}
                          {(question.user?.id == user?.id &&
                            question.comments?.length == 0) ||
                          (user?.role === Role.Admin &&
                            question.comments?.length == 0) ? (
                            <button
                              onClick={onQuestionRemoveClick(question.id!)}
                            >
                              Удалить
                            </button>
                          ) : (
                            ''
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="user-post-text">
                      <h3>Вопрос</h3>
                      <span>{question.text}</span>
                    </div>
                    <LikeDisLike
                      likeNum={likeNum}
                      dislikeNum={dislikeNum}
                      isLiked={isReviewLiked}
                      isDisliked={isReviewDisliked}
                      bgColor={color.textPrimary}
                      onLikeClick={handleQuestionReactionClick(
                        question,
                        dispatch,
                        Reaction.Like,
                        user,
                      )}
                      onDislikeClick={handleQuestionReactionClick(
                        question,
                        dispatch,
                        Reaction.Dislike,
                        user,
                      )}
                    />
                  </ReviewReplyItem>
                </ReviewReplyContent>
              </ReviewReplyWrapper>
              {question.comments.map((comment) => {
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
                  <ReplyWrapper
                    initial="init"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={0.3}
                    variants={variants.fadInSlideUp}
                    key={comment.id}
                  >
                    {/* ______ edite mode start  _______ */}
                    {isCommentEditeSendVisibleMap[comment?.id!] ? (
                      <UserCommentWrapper>
                        <UserCommentField
                          placeholder="Напишите комментарий"
                          value={commentEditeValueMap.text}
                          onChange={handleCommentEditeValueChange(comment?.id!)}
                        />
                        <div className="comment-action-btns-wrapper">
                          <SendUserCommentBtn
                            onClick={handleUpdateComment(
                              comment?.id!,
                              question?.id!,
                              commentEditeValueMap.text,
                              user?.id!,
                            )}
                          >
                            Отправить
                          </SendUserCommentBtn>
                          <SendUserCommentBtn
                            onClick={handleEditeCommentClick(
                              comment?.id!,
                              comment.text!,
                            )}
                          >
                            Отмена
                          </SendUserCommentBtn>
                        </div>
                      </UserCommentWrapper>
                    ) : (
                      // edite mode end
                      <ReviewReplyContent>
                        <UserImageWrapper>
                          <span className="reply-logo">NBHOZ</span>
                          <div className="side-line"></div>
                        </UserImageWrapper>
                        <ReviewReplyItem>
                          <div className="review-header">
                            <div className="replied-to-wrapper">
                              <h3>{comment.user.firstName}</h3>
                              <span>{`в ответ ${question.user?.firstName}`}</span>
                            </div>
                            <span className="date-stars">
                              <span className="post-date">
                                {moment(comment.createdAt).format('DD.MM.YYYY')}
                                {comment.user?.id == user?.id && (
                                  <button
                                    onClick={onCommentRemoveClick(comment.id!)}
                                  >
                                    Удалить
                                  </button>
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
                          <div className="user-post-text">
                            <span>{comment.text}</span>
                          </div>
                          <LikeDisLike
                            likeNum={likeNum}
                            dislikeNum={dislikeNum}
                            isLiked={isCommentLiked}
                            isDisliked={isCommentDisliked}
                            bgColor={color.textPrimary}
                            onLikeClick={handleCommentReactionClick(
                              question,
                              comment,
                              dispatch,
                              Reaction.Like,
                              user,
                            )}
                            onDislikeClick={handleCommentReactionClick(
                              question,
                              comment,
                              dispatch,
                              Reaction.Dislike,
                              user,
                            )}
                          />
                        </ReviewReplyItem>
                      </ReviewReplyContent>
                    )}
                  </ReplyWrapper>
                );
              })}
              {!isCommentSendVisibleMap[question?.id!] &&
                user?.role === Role.Admin && (
                  <LoadMoreBtnWrapper>
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={variants.boxShadow}
                      onClick={handleLeaveCommentClick(question?.id!)}
                    >
                      Оставить комментарий
                    </motion.button>
                  </LoadMoreBtnWrapper>
                )}
              {isCommentSendVisibleMap[question?.id!] && (
                <UserCommentWrapper>
                  <UserCommentField
                    placeholder="Напишите комментарий"
                    onChange={handleCommentValueChange(question?.id!)}
                  />
                  <div className="comment-action-btns-wrapper">
                    <SendUserCommentBtn
                      onClick={handleCreateComment(
                        question?.id!,
                        commentValueMap[question?.id!],
                        user?.id!,
                      )}
                    >
                      Отправить
                    </SendUserCommentBtn>
                    <SendUserCommentBtn
                      onClick={handleLeaveCommentClick(question?.id!)}
                    >
                      Отмена
                    </SendUserCommentBtn>
                  </div>
                </UserCommentWrapper>
              )}
            </div>
          );
        })}
      </ReviewContainer>
      <Modal
        title={'Вы действительно хотите удалить этот вопрос?'}
        open={isQuestionModalVisible}
        onOk={handleQuestionRemove(questionId)}
        onCancel={handleQuestionCancel}
      ></Modal>
      <Modal
        title={'Вы действительно хотите удалить этот комментарий?'}
        open={isCommentModalVisible}
        onOk={handleCommentRemove(commentId)}
        onCancel={handleCommentCancel}
      ></Modal>
    </>
  );
};

const UserCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .comment-action-btns-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px 0;
  }
`;

const UserCommentField = styled.textarea`
  width: 100%;
  max-width: 660px;
  min-height: 100px;
  max-height: 400px;
  display: block;
  background: #ccc;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  padding: 20px;
  outline: none;
  user-select: none;
`;

const SendUserCommentBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 30px;
  background-color: ${color.btnPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${color.textPrimary};
  &:active {
    background-color: ${color.backgroundPrimary};
    color: ${color.activeIcons};
    border: 1px solid;
  }
`;

export default Quastion;
