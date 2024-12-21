import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import styled from 'styled-components';
import { verifyUserEmailByToken } from 'redux/slicers/authSlicer';

const VerifyAcountByToken = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.asPath) {
      const regEx = /[^\/]+$/; // get everything after last /
      const token = router.asPath.match(regEx)!.toString();
      dispatch(verifyUserEmailByToken(token));
    }
  }, []);
  const [counter, setCounter] = useState(2);
  useEffect(() => {
    if (counter >= 1) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (counter < 1) {
      router.push('/checkout');
    }
  }, [counter]);

  return (
    <>
      <Counter>пожалуйста, подождите</Counter>
      <p>Мы проверяем информацию о подтверждении вашей электронной почты</p>
      <span>Вы будете перенаправлены на личные кабинет, после: {counter}</span>
    </>
  );
};

const Counter = styled.h2`
  font-size: 2rem;
  font-family: var(--font-ricordi);
`;

export default VerifyAcountByToken;
