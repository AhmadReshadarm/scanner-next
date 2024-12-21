import styled from 'styled-components';
import { Container, Header } from '../common';
import ReviewsItems from './ReviewItems';
import { useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchUserReviews } from 'redux/slicers/store/profileSlicer';
import { TProfileState } from 'redux/types';
import { TAuthState } from 'redux/types';
import Loading from 'ui-kit/Loading';
const Reveiws = (props: any) => {
  const dispatch = useAppDispatch();
  const { reveiwsRef, setActive } = props;
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { reviews, loading } = useAppSelector<TProfileState>(
    (state) => state.profile,
  );
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('reveiws');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(reveiwsRef.current);
    dispatch(fetchUserReviews(user?.id!));

    return () => {
      observer.disconnect();
    };
  }, [reveiwsRef, observer]);
  return (
    <Container id="reviews" ref={reveiwsRef}>
      <Header>Мои отзывы</Header>
      {!loading ? (
        reviews.length !== 0 ? (
          <ReviewsList>
            {reviews?.map((review, index) => {
              return <ReviewsItems review={review} key={index} />;
            })}
          </ReviewsList>
        ) : (
          <div>У вас еще нет отзывов</div>
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const ReviewsList = styled.ul`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

export default Reveiws;
