import { Reaction } from "common/enums/reaction.enum";
import { createQuestionCommentReaction, createQuestionReaction, deleteQuestionCommentReaction, deleteQuestionReaction } from "redux/slicers/store/productInfoSlicer";
import { Question, User, Comment } from "swagger/services";

const handleQuestionReactionClick =
  (question: Question, dispatch: any, reactionValue: Reaction, user: User | null) =>
    async (e) => {
      e.preventDefault();
      const reaction = question.reactions?.find(
        (reaction) => reaction.userId == user?.id,
      );

      if (reaction && reaction.reaction === reactionValue) {
        dispatch(deleteQuestionReaction(reaction.id!));
      } else if (reaction && reaction.reaction !== reactionValue) {
        await dispatch(deleteQuestionReaction(reaction.id!));
        dispatch(
          createQuestionReaction({
            userId: user?.id!,
            questionId: question.id!,
            reaction: reactionValue,
          }),
        );
      } else {
        dispatch(
          createQuestionReaction({
            userId: user?.id!,
            questionId: question.id!,
            reaction: reactionValue,
          }),
        );
      }
    };

const handleCommentReactionClick =
  (
    question: Question,
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
          deleteQuestionCommentReaction({ id: reaction.id!, questionId: question.id! }),
        );
      } else if (reaction && reaction.reaction !== reactionValue) {
        await dispatch(
          deleteQuestionCommentReaction({ id: reaction.id!, questionId: question.id! }),
        );
        dispatch(
          createQuestionCommentReaction({
            userId: user?.id!,
            commentId: comment.id!,
            questionId: question.id!,
            reaction: reactionValue,
          }),
        );
      } else {
        dispatch(
          createQuestionCommentReaction({
            userId: user?.id!,
            commentId: comment.id!,
            questionId: question.id!,
            reaction: reactionValue,
          }),
        );
      }
    };

export { handleQuestionReactionClick, handleCommentReactionClick };