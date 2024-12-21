import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { useState } from 'react';
import { devices } from 'components/store/lib/Devices';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UsePagination, handleSubscriber, handleAdminCall } from './helpers';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { paginateTo } from 'components/store/checkout/constant';
import InputMask from 'react-input-mask';
import { changeOrderCallFormState } from 'redux/slicers/store/globalUISlicer';
import { TGlobalUIState } from 'redux/types';
import { useInViewport } from 'components/store/storeLayout/useInViewport';
import Image from 'next/image';

type StyleProps = {
  isLoginActive: boolean;
  isSingUpActive: boolean;
};

const Subscribers = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [subscriber, setSubscriber] = useState({ name: '', email: '' });
  const [client, setClient] = useState({ clientName: '', phone: '' });
  const [direction, authType, paginate] = UsePagination();
  const { isOrderCallFormActive } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const { isInViewport, ref } = useInViewport();

  return (
    <Container
      style={{
        backgroundColor: isOrderCallFormActive
          ? '#595959'
          : color.backgroundSecondery,
      }}
      ref={ref}
    >
      {isInViewport ? (
        <FormContainer
          onFocus={() => dispatch(changeOrderCallFormState(true))}
          onBlur={() => dispatch(changeOrderCallFormState(false))}
        >
          <FormContent>
            <div className="news-letter-image-wrapper">
              <Image
                src="/static/news-letter-static.jpg"
                alt="Запросить звонок"
                width={0}
                height={0}
                sizes="100vw"
                loading="lazy"
                priority={false}
              />
            </div>
            <div className="news-letter-form-wrapper">
              <div className="news-letter-content-parent">
                <AuthTabWrapper
                  isLoginActive={authType == 'call'}
                  isSingUpActive={authType == 'subscribe'}
                >
                  <motion.div
                    animate={authType == 'call' ? 'init' : 'animate'}
                    variants={{ init: { x: 0 }, animate: { x: 200 } }}
                    className="auth-page-indecator"
                  ></motion.div>
                  <div className="auth-buttons-row">
                    <h2
                      className="sign-in-tab"
                      onClick={() => paginate(paginateTo.forward, 'call')}
                    >
                      {`Заказать звонок`.toUpperCase()}
                    </h2>
                    <span>/</span>
                    <h2
                      className="sign-up-tab"
                      onClick={() => paginate(paginateTo.back, 'subscribe')}
                    >
                      {`Подпишитесь`.toUpperCase()}
                    </h2>
                  </div>
                </AuthTabWrapper>
                <div className="content-row-wrapper">
                  <Content
                    dragConstraints={{ left: 0, right: 0 }}
                    custom={direction}
                    variants={variants.authorizeSlideX}
                    animate={authType == 'call' ? 'center' : 'enter'}
                  >
                    <span className="feild-lable-text">
                      Оставьте заявку на нашем сайте и мы обязательно Вам
                      перезвоним в ближайшее время
                    </span>
                    <div className="inputs-wrapper">
                      <input
                        value={client.clientName}
                        placeholder="Введите Ваше Имя"
                        type="text"
                        onChange={(evt) =>
                          setClient({ ...client, clientName: evt.target.value })
                        }
                      />

                      <InputMask
                        mask="+7 (999) 999 99 99"
                        value={client.phone}
                        disabled={false}
                        maskChar=" "
                        onChange={(evt) =>
                          setClient({ ...client, phone: evt.target.value })
                        }
                        style={{ padding: '16.5px 14px' }}
                      >
                        {() => (
                          <input
                            placeholder="Введите Ваш номер телефона"
                            type="text"
                          />
                        )}
                      </InputMask>
                    </div>
                    <ActionBtn
                      onClick={handleAdminCall(
                        client.clientName,
                        client.phone,
                        dispatch,
                      )}
                      aria-label="ЗАКАЗАТЬ ЗВОНОК"
                    >
                      <span>ЗАКАЗАТЬ ЗВОНОК</span>
                    </ActionBtn>
                  </Content>
                  <Content
                    dragConstraints={{ left: 0, right: 0 }}
                    custom={direction}
                    variants={variants.authorizeSlideX}
                    animate={authType == 'subscribe' ? 'center' : 'enter'}
                  >
                    <span className="feild-lable-text">
                      Подпишитесь на рассылку новостей
                    </span>
                    <div className="inputs-wrapper">
                      <input
                        value={subscriber.name}
                        placeholder="Введите Ваше Имя"
                        type="text"
                        onChange={(evt) =>
                          setSubscriber({
                            ...subscriber,
                            name: evt.target.value,
                          })
                        }
                      />
                      <input
                        value={subscriber.email}
                        placeholder="Введите Ваш почтовый адрес"
                        type="email"
                        onChange={(evt) =>
                          setSubscriber({
                            ...subscriber,
                            email: evt.target.value,
                          })
                        }
                      />
                    </div>
                    <ActionBtn
                      onClick={handleSubscriber(
                        subscriber.name,
                        subscriber.email,
                        dispatch,
                      )}
                      aria-label="ПОДПИСАТЬСЯ"
                    >
                      <span>ПОДПИСАТЬСЯ</span>
                    </ActionBtn>
                  </Content>
                </div>
              </div>
            </div>
          </FormContent>
        </FormContainer>
      ) : (
        <LoaderMask></LoaderMask>
      )}
    </Container>
  );
};

const LoaderMask = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  transition: 300ms;
`;

const FormContainer = styled.div`
  max-width: 1500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  @media ${devices.laptopL} {
    max-width: 1230px;
    width: 100%;
  }
  @media ${devices.laptopS} {
    max-width: unset;
    width: 95%;
  }
  @media ${devices.tabletL} {
    max-width: unset;
    width: 95%;
  }
  @media ${devices.tabletS} {
    max-width: unset;
    width: 95%;
  }

  @media ${devices.mobileL} {
    max-width: unset;
    width: 95%;
  }
  @media ${devices.mobileM} {
    max-width: unset;
    width: 95%;
  }

  @media ${devices.mobileS} {
    max-width: unset;
    width: 95%;
  }
`;

const FormContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .news-letter-image-wrapper {
    width: 100%;
    height: 50vh;
    min-height: 500px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .news-letter-form-wrapper {
    width: 100%;
    height: 50vh;
    min-height: 500px;
    background-color: ${color.backgroundPrimary};
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .news-letter-content-parent {
      width: 450px;
      height: 450px;
      min-width: 450px;
      min-height: 450px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 40px;

      .content-row-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        overflow: hidden;
      }
    }
  }
  @media ${devices.laptopS} {
    .news-letter-form-wrapper {
      .news-letter-content-parent {
        width: 95%;
      }
    }
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    .news-letter-form-wrapper {
      .news-letter-content-parent {
        width: 95%;
      }
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    .news-letter-form-wrapper {
      height: 75vh;
      .news-letter-content-parent {
        width: 90vw;
        min-width: unset;
        .content-row-wrapper {
          overflow: hidden;
        }
      }
    }
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    .news-letter-form-wrapper {
      height: 75vh;
      .news-letter-content-parent {
        width: 90vw;
        min-width: unset;
        .content-row-wrapper {
          overflow: hidden;
        }
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    .news-letter-form-wrapper {
      height: 75vh;
      .news-letter-content-parent {
        width: 90vw;
        min-width: unset;
        padding: 30px;
        .content-row-wrapper {
          overflow: hidden;
        }
      }
    }
  }

  @media ${devices.mobileS} {
    .news-letter-form-wrapper {
      height: 75vh;
      .news-letter-content-parent {
        width: 90vw;
        min-width: unset;
        padding: 30px;
        .content-row-wrapper {
          overflow: hidden;
        }
      }
    }
  }
`;

const AuthTabWrapper = styled.div<StyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  z-index: 9;
  .auth-page-indecator {
    width: 50px;
    height: 3px;
    background-color: ${color.buttonPrimary};
  }
  .auth-buttons-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    h2 {
      font-family: var(--font-ricordi);
      font-size: 1rem;
      cursor: pointer;
      color: ${color.textTertiary};
      text-wrap: nowrap;
      &:hover {
        color: ${color.activeIcons};
      }
    }
    ${({ isLoginActive, isSingUpActive }: StyleProps) => {
      if (isLoginActive) {
        return `
          .sign-in-tab{
            color:${color.activeIcons}
          }
        `;
      }
      if (isSingUpActive) {
        return `
          .sign-up-tab{
            color:${color.activeIcons}
          }
        `;
      }
    }}
  }
  @media ${devices.tabletS} {
    .auth-page-indecator {
      display: none;
    }
    .auth-buttons-row {
      flex-direction: column;
      align-items: flex-start;
      span {
        display: none;
      }
    }
  }
  @media ${devices.mobileL} {
    .auth-page-indecator {
      display: none;
    }
    .auth-buttons-row {
      flex-direction: column;
      align-items: flex-start;
      span {
        display: none;
      }
    }
  }
  @media ${devices.mobileM} {
    .auth-page-indecator {
      display: none;
    }
    .auth-buttons-row {
      flex-direction: column;
      align-items: flex-start;
      span {
        display: none;
      }
    }
  }

  @media ${devices.mobileS} {
    .auth-page-indecator {
      display: none;
    }
    .auth-buttons-row {
      flex-direction: column;
      align-items: flex-start;
      span {
        display: none;
      }
    }
  }
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  gap: 50px;
  position: absolute;
  top: 0;
  left: 0;
  .feild-lable-text {
    padding: 30px 0 0 0;
  }
  .inputs-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    input {
      width: 100%;
      height: 40px;
      padding: 0 20px;
      border: none;
      border-bottom: 1px solid ${color.textSecondary};
      font-size: 1rem;
      font-weight: 300;
      background-color: transparent;
      &::placeholder {
        color: ${color.textBase};
      }
    }
  }
  @media ${devices.tabletS} {
    justify-content: flex-start;
    gap: 30px;
  }
  @media ${devices.mobileL} {
    justify-content: flex-start;
    gap: 30px;
  }
  @media ${devices.mobileM} {
    justify-content: flex-start;
    gap: 30px;
  }

  @media ${devices.mobileS} {
    justify-content: flex-start;
    gap: 30px;
  }
`;

const ActionBtn = styled.button`
  width: 200px;
  height: 50px;
  min-height: 50px;
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  span {
    font-family: var(--font-ricordi);
  }

  &:active {
    border: 1px solid;
    background: #ffffff;
    color: #000000;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }

  @media ${devices.mobileS} {
    width: 100%;
  }
`;

export default Subscribers;
