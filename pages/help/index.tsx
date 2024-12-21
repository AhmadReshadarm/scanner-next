import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { useAppDispatch } from 'redux/hooks';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { useState } from 'react';
import { userHelpDisk } from 'redux/slicers/authSlicer';
import { useRouter } from 'next/router';
import { openErrorNotification } from 'common/helpers';
import { baseUrl } from 'common/constant';
const Help = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Помощь | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="50px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="center"
            align_items="center"
            gap="30px"
          >
            <InputWrapper>
              <span>Форма запроса помощи</span>
              <div className="input-label-wrapper">
                <label htmlFor="email">Эл. адрес</label>
                <input
                  type="text"
                  name="email"
                  placeholder={
                    isEmpty(email) || !isEmail(email)
                      ? 'Эл. адрес не может быть пустым'
                      : 'Эл. адрес'
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="inputs-wrapper"
                />
              </div>
              <div className="input-label-wrapper">
                <textarea
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="inputs-wrapper text-area-wrapper"
                  placeholder="Расскажите нам, что пошло не так"
                />
              </div>
              <button
                onClick={() => {
                  if (isEmpty(email) || !isEmail(email)) {
                    openErrorNotification(
                      'Пожалуйста, укажите адрес электронной почты',
                    );
                    return;
                  }
                  if (isEmpty(text)) {
                    openErrorNotification(
                      'Пожалуйста, расскажите нам, что пошло не так.',
                    );
                    return;
                  }
                  dispatch(userHelpDisk({ email, text }));
                  router.push('/profile');
                }}
                className="action-button"
              >
                Отправлять
              </button>
            </InputWrapper>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const InputWrapper = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .input-label-wrapper {
    width: 100%;
    .inputs-wrapper {
      width: 100%;
      height: 50px;
      border-radius: 5px;
      padding: 0 10px;
      font-size: 1rem;
      resize: none;
      padding: 5px;
      border: 1px solid ${color.textBase};
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline: none;
      }
    }
    .text-area-wrapper {
      height: 100px;
    }
  }

  .action-button {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background-color: ${color.textSecondary};
    color: ${color.textPrimary};
    cursor: pointer;
    transition: 200ms;
    font-size: 1.2rem;
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
    @media ${devices.tabletL} {
      width: 90%;
    }
    @media ${devices.tabletS} {
      width: 90%;
    }
    @media ${devices.mobileL} {
      width: 90%;
    }
    @media ${devices.mobileM} {
      width: 90%;
    }
    @media ${devices.mobileS} {
      width: 90%;
    }
  }
`;

Help.PageLayout = StoreLayout;

export default Help;
