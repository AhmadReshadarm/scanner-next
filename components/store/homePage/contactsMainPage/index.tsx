import { Container } from 'components/store/storeLayout/common';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';
import { useInViewport } from 'components/store/storeLayout/useInViewport';

const ContactsMainPage = (): JSX.Element => {
  const { isInViewport, ref } = useInViewport();
  return (
    <Container
      flex_direction="column"
      justify_content="center"
      align_items="center"
      padding="80px 0"
      bg_color={color.backgroundPrimary}
      ref={ref}
    >
      {isInViewport ? (
        <Wrapper>
          <ContactContentWrapper>
            <div className="header-wrapper">
              <h1>НАШИ КОНТАКТЫ</h1>
            </div>
            <div className="contact-info-wrapper">
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_317_1699)">
                      <path
                        d="M12 9.75C10.4 9.75 8.85 10 7.4 10.47V13.57C7.4 13.96 7.17 14.31 6.84 14.47C5.86 14.96 4.97 15.59 4.18 16.32C4 16.5 3.75 16.6 3.48 16.6C3.2 16.6 2.95 16.49 2.77 16.31L0.29 13.83C0.11 13.66 0 13.41 0 13.13C0 12.85 0.11 12.6 0.29 12.42C3.34 9.53 7.46 7.75 12 7.75C16.54 7.75 20.66 9.53 23.71 12.42C23.89 12.6 24 12.85 24 13.13C24 13.41 23.89 13.66 23.71 13.84L21.23 16.32C21.05 16.5 20.8 16.61 20.52 16.61C20.25 16.61 20 16.5 19.82 16.33C19.03 15.59 18.13 14.97 17.15 14.48C16.82 14.32 16.59 13.98 16.59 13.58V10.48C15.15 10 13.6 9.75 12 9.75Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_317_1699">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0 0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <div className="call-wrapper">
                  <Link href="tel:+79254865444" prefetch={false}>
                    <span title="позвонить 8-925-486-54-44">
                      8-925-486-54-44
                    </span>
                  </Link>
                  <span className="call-saperator">|</span>
                  <Link href="tel:89266999952" prefetch={false}>
                    <span title="позвонить 8-926-699-99-52">
                      8-926-699-99-52
                    </span>
                  </Link>
                  <span className="call-saperator">|</span>
                  <Link href="tel:89268999954" prefetch={false}>
                    <span title="позвонить 8-926-899-99-54">
                      8-926-899-99-54
                    </span>
                  </Link>
                </div>
              </div>
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_317_1705)">
                      <path
                        d="M20 4.5H4C2.9 4.5 2.01 5.4 2.01 6.5L2 18.5C2 19.6 2.9 20.5 4 20.5H20C21.1 20.5 22 19.6 22 18.5V6.5C22 5.4 21.1 4.5 20 4.5ZM20 18.5H4V8.5L12 13.5L20 8.5V18.5ZM12 11.5L4 6.5H20L12 11.5Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_317_1705">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <div className="call-wrapper">
                  <Link href="mailto:info@nbhoz.ru" prefetch={false}>
                    <span title="отправьте письмо по адресу info@nbhoz.ru">
                      info@nbhoz.ru
                    </span>
                  </Link>
                  <span className="call-saperator">|</span>
                  <Link href="mailto:exelon@hoz-mardon.ru" prefetch={false}>
                    <span title="отправьте письмо по адресу exelon@hoz-mardon.ru">
                      exelon@hoz-mardon.ru
                    </span>
                  </Link>
                </div>
              </div>
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_317_1708)">
                      <path
                        d="M4 16.5V22.5H20V16.5C20 15.4 19.1 14.5 18 14.5H6C4.9 14.5 4 15.4 4 16.5ZM18 18.5H6V16.5H18V18.5ZM12 2.5C9.24 2.5 7 4.74 7 7.5L12 14.5L17 7.5C17 4.74 14.76 2.5 12 2.5ZM12 11.5L9 7.5C9 5.84 10.34 4.5 12 4.5C13.66 4.5 15 5.84 15 7.5L12 11.5Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_317_1708">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span title="адрес г. Москва, Каширское шоссе">
                  г. Москва, Каширское шоссе
                </span>
              </div>
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 2.5C9.02219 2.5 7.08879 3.08649 5.4443 4.1853C3.79981 5.28412 2.51809 6.8459 1.76121 8.67317C1.00433 10.5004 0.806299 12.5111 1.19215 14.4509C1.578 16.3907 2.53041 18.1725 3.92894 19.5711C5.32746 20.9696 7.10929 21.922 9.0491 22.3079C10.9889 22.6937 12.9996 22.4957 14.8268 21.7388C16.6541 20.9819 18.2159 19.7002 19.3147 18.0557C20.4135 16.4112 21 14.4778 21 12.5C21 11.1868 20.7413 9.88642 20.2388 8.67317C19.7363 7.45991 18.9997 6.35752 18.0711 5.42893C17.1425 4.50035 16.0401 3.76375 14.8268 3.2612C13.6136 2.75866 12.3132 2.5 11 2.5ZM11 20.5C9.41775 20.5 7.87104 20.0308 6.55544 19.1518C5.23985 18.2727 4.21447 17.0233 3.60897 15.5615C3.00347 14.0997 2.84504 12.4911 3.15372 10.9393C3.4624 9.38743 4.22433 7.96197 5.34315 6.84315C6.46197 5.72433 7.88743 4.9624 9.43928 4.65372C10.9911 4.34504 12.5997 4.50346 14.0615 5.10896C15.5233 5.71447 16.7727 6.73984 17.6518 8.05544C18.5308 9.37103 19 10.9177 19 12.5C19 14.6217 18.1572 16.6566 16.6569 18.1569C15.1566 19.6571 13.1217 20.5 11 20.5ZM14.1 13.13L12 11.92V7.5C12 7.23478 11.8946 6.98043 11.7071 6.79289C11.5196 6.60536 11.2652 6.5 11 6.5C10.7348 6.5 10.4804 6.60536 10.2929 6.79289C10.1054 6.98043 10 7.23478 10 7.5V12.5C10 12.5 10 12.58 10 12.62C10.0059 12.6889 10.0228 12.7564 10.05 12.82C10.0706 12.8793 10.0974 12.9363 10.13 12.99C10.1574 13.0468 10.1909 13.1005 10.23 13.15L10.39 13.28L10.48 13.37L13.08 14.87C13.2324 14.9564 13.4048 15.0012 13.58 15C13.8014 15.0015 14.0171 14.9296 14.1932 14.7953C14.3693 14.6611 14.4959 14.4722 14.5531 14.2583C14.6103 14.0444 14.5948 13.8176 14.5092 13.6134C14.4236 13.4092 14.2726 13.2392 14.08 13.13H14.1Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span title="график работы понедельник-суббота с 10:00 до 21:00">
                  Понедельник-Суббота с 10:00 до 21:00
                </span>
              </div>
            </div>
          </ContactContentWrapper>
        </Wrapper>
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

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: cneter;
  @media ${devices.laptopL} {
    max-width: 1230px;
  }

  @media ${devices.laptopM} {
    max-width: 1230px;
  }
  @media ${devices.laptopS} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.tabletL} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.tabletS} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.mobileL} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.mobileM} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.mobileS} {
    width: 90%;
    max-width: unset;
  }
`;

const ContactContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 90px;
  .header-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    h1 {
      font-size: 3rem;
      font-family: var(--font-ricordi);
      text-align: left;
    }
  }
  .contact-info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    .contents-rows {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      .call-saperator {
        font-size: 1.5rem;
      }
      .icons-wrapper {
        width: 30px;
        height: 30px;
      }
      .call-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        .call-saperator {
          font-size: 1.5rem;
        }
      }
    }
  }
  @media ${devices.tabletL} {
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.tabletS} {
    .header-wrapper {
      h1 {
        font-size: 2rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.mobileL} {
    .header-wrapper {
      h1 {
        font-size: 1.5rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.mobileM} {
    .header-wrapper {
      h1 {
        font-size: 1.3rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.mobileS} {
    .header-wrapper {
      h1 {
        font-size: 1rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
`;

export default ContactsMainPage;
