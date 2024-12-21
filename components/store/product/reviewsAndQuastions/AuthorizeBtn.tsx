import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { openErrorNotification } from 'common/helpers';

const AuthorizeReviewBtn = (props: any) => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { isInUserCheckout, checkouts, productId, alertSignIn, text } = props;
  return (
    <>
      <AddReviewBtn
        onClick={() => {
          if (!user) {
            openErrorNotification('Войдите, чтобы написать отзыв');
            return;
          }

          if (user) {
            if (!isInUserCheckout(productId, checkouts)) {
              openErrorNotification('Этого товара нет в списке ваших заказов');
              return;
            }
            if (!user.isVerified) {
              openErrorNotification(
                'Адрес эл. почты не подтвержден, Зайти в личный кабинет для подтверждения',
              );
              return;
            }
          }
        }}
      >
        <span>{text}</span>
      </AddReviewBtn>
    </>
  );
};

const AddReviewBtn = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.buttonPrimary};
  cursor: pointer;
  transition: 300ms;
  border-radius: 30px;

  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  span {
    font-family: ver(--font-Jost);
    font-size: 1rem;
    color: ${color.textPrimary};
  }
`;

export default AuthorizeReviewBtn;
