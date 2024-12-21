import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { useEffect, useState } from 'react';
import { handleResetClick } from './helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
const EmailResetPsw = () => {
  const [email, setEmail] = useState('');
  const [inputErr, setInputErr] = useState(false);
  const [counter, setCoutner] = useState(30);
  const [counterStart, setCounterStart] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.push('/');
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (counter == 0) {
        setCoutner(30);
        setCounterStart(false);
        return;
      }
      if (counterStart) setCoutner(counter - 1);
    }, 1000);
  }, [counter, counterStart]);
  return (
    <>
      <Title>Сброс пароля</Title>
      <span
        style={{
          width: '200px',
          textAlign: 'center',
          fontSize: '1rem',
        }}
      >
        Мы отправим вам письмо на ваш адрес электронной почты для сброса пароля
      </span>
      <InputWrapper>
        <input
          type="email"
          value={email}
          placeholder={
            (isEmpty(email) || !isEmail(email)) && inputErr
              ? 'Эл. адрес не может быть пустым'
              : 'Эл. адрес'
          }
          style={{
            border: `solid 1px ${
              (isEmpty(email) || !isEmail(email)) && inputErr
                ? color.hover
                : color.searchBtnBg
            }`,
          }}
          onChange={(e) => {
            setEmail(e.target.value);
            setInputErr(true);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleResetClick(email, dispatch);
            setCounterStart(true);
          }}
          style={{
            backgroundColor:
              isEmpty(email) || !isEmail(email) || counterStart
                ? color.textSecondary
                : color.btnPrimary,
          }}
          disabled={
            isEmpty(email) || !isEmail(email) || counterStart ? true : false
          }
        >
          <span>
            {counterStart
              ? `Повторите после: ${counter}`
              : 'Отправь мне ссылку'}
          </span>
        </button>
        <Link href="/help" className="somthing-is-wrong">
          <span>Что-то пошло не так? напишите нам</span>
        </Link>
      </InputWrapper>
    </>
  );
};

const Title = styled.h2`
  font-size: 1.5rem;
`;

const InputWrapper = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  input {
    width: 200px;
    height: 40px;
    border-radius: 3px;
    padding: 0 10px;
    background-color: ${color.searchBtnBg};
    color: ${color.textPrimary};
  }
  button {
    width: 200px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background-color: ${color.btnSecondery};
    cursor: pointer;
    transition: 300ms;
    &:hover {
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
      transform: scale(1.02);
    }
    &:active {
      transform: scale(1);
    }
    span {
      font-size: 1rem;
      font-weight: 300;
      color: ${color.textPrimary};
    }
  }
  a {
    width: 200px;
    span {
      &:hover {
        color: ${color.hoverBtnBg};
      }
    }
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;
export default EmailResetPsw;
