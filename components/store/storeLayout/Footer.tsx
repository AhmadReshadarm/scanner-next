import Link from 'next/link';
import { handleCookiesClick, acceptedCookies } from './helpers';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
import {
  LocationPointerSVG,
  MailSVG,
  PhoneSVG,
  WatchSVG,
} from './utils/headerIcons/SVGIconsFooter';
import { content } from './constants';
import { useInViewport } from './useInViewport';
import Image from 'next/image';
import { fetchCategories, fetchTags } from 'redux/slicers/store/globalSlicer';
import styles from './styles/footer.module.css';
const Footer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector<TGlobalState>((state) => state.global);
  const copyRighYear = new Date().getFullYear();
  const [isOpen, setOpen] = useState(true);
  const [showCookiesNotifi, setShowCookiesNotifi] = useState(false);
  const { isInViewport, ref } = useInViewport();
  useEffect(() => {
    acceptedCookies(setOpen);
  }, []);

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
    setTimeout(() => {
      setShowCookiesNotifi(true);
    }, 15000);
  }, []);

  useEffect(() => {
    if (isInViewport) {
      dispatch(fetchCategories());
      dispatch(fetchTags());
    }
  }, [isInViewport]);

  return (
    <>
      {isClient ? (
        <>
          <div className={styles.Container} ref={ref}>
            {isInViewport && (
              <div className={styles.Wrapper}>
                <div className={styles.FooterContentWrapper}>
                  <div className={styles.FooterTopContentWrapper}>
                    <div className={styles.FooterLeftContentWrapper}>
                      <div className={styles.footer_columns_wrapper}>
                        <span title="Каталог" className={styles.columns_header}>
                          Каталог
                        </span>
                        {categories.map((category, index) => {
                          return (
                            <Link
                              title={category.name}
                              key={`${category.url}-${index}`}
                              href={`/catalog?categories=${category.url}`}
                              prefetch={false}
                            >
                              <span>{category.name}</span>
                            </Link>
                          );
                        })}
                      </div>

                      <div className={styles.footer_columns_wrapper}>
                        <span className={styles.columns_header}>О нас</span>
                        {content.aboutUs.map((service, index) => {
                          return (
                            <Link
                              title={service.text}
                              key={`${service.url}-${index}`}
                              href={`${service.url}`}
                              prefetch={false}
                            >
                              <span>{service.text}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles.FooterRightContentWrapper}>
                      <div className={styles.right_column_content}>
                        <PhoneSVG />
                        <div className={styles.call_row_wrapper}>
                          <Link
                            aria-label="позвонить 89254865444"
                            href="tel:+79254865444"
                            prefetch={false}
                          >
                            <span title="позвонить 8-925-486-54-44">
                              8-925-486-54-44
                            </span>
                          </Link>
                          <span className={styles.call_saperator}>|</span>
                          <Link
                            aria-label="позвонить 89266999952"
                            href="tel:89266999952"
                            prefetch={false}
                          >
                            <span title="позвонить 8-926-699-99-52">
                              8-926-699-99-52
                            </span>
                          </Link>
                          <span className={styles.call_saperator}>|</span>
                          <Link
                            aria-label="позвонить 89268999954"
                            href="tel:89268999954"
                          >
                            <span title="позвонить 8-926-899-99-54">
                              8-926-899-99-54
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className={styles.right_column_content}>
                        <MailSVG />
                        <div className={styles.call_row_wrapper}>
                          <Link
                            aria-label="отправьте письмо по адресу info@nbhoz.ru"
                            href="mailto:info@nbhoz.ru"
                            prefetch={false}
                          >
                            <span title="отправьте письмо по адресу info@nbhoz.ru">
                              info@nbhoz.ru
                            </span>
                          </Link>
                          <span className={styles.call_saperator}>|</span>
                          <Link
                            aria-label="отправьте письмо по адресу exelon@hoz-mardon.ru"
                            href="mailto:exelon@hoz-mardon.ru"
                            prefetch={false}
                          >
                            <span title="отправьте письмо по адресу exelon@hoz-mardon.ru">
                              exelon@hoz-mardon.ru
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className={styles.right_column_content}>
                        <div className={styles.call_row_wrapper}>
                          <Link
                            href="https://vk.com/nbhoz"
                            target="__blank"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              gap: '5px',
                            }}
                            title="Подпишитесь на нас в ВКонтакте"
                            prefetch={false}
                          >
                            <Image
                              src="/icons/vk.png"
                              alt="nbhoz vk"
                              width={0}
                              height={0}
                              sizes="100vw"
                              loading="lazy"
                            />
                            <span>/nbhoz</span>
                          </Link>
                          <span className={styles.call_saperator}>|</span>
                          <Link
                            href="https://t.me/nbhoz"
                            target="__blank"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              gap: '5px',
                            }}
                            title="Подпишитесь на нас в Telegram"
                            prefetch={false}
                          >
                            <Image
                              src="/icons/telegram.png"
                              alt="nbhoz telegram"
                              width={0}
                              height={0}
                              sizes="100vw"
                              loading="lazy"
                            />
                            <span>/nbhoz</span>
                          </Link>
                        </div>
                      </div>
                      <div className={styles.right_column_content}>
                        <WatchSVG />
                        <span title="график работы понедельник-суббота с 10:00 до 21:00">
                          Понедельник-Суббота с 10:00 до 21:00
                        </span>
                      </div>
                      <div className={styles.right_column_content}>
                        <LocationPointerSVG />
                        <span title="адрес г. Москва, Каширское шоссе">
                          г. Москва, Каширское шоссе
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.FooterBottomContentWrapper}>
                    <div className={styles.bottom_left_wrapper}>
                      <Link
                        title="Пользовательское соглашение"
                        href="/user-agreement"
                        prefetch={false}
                      >
                        <span>Пользовательское соглашение</span>
                      </Link>
                      <Link
                        title="Политика безопасности"
                        href="/privacy"
                        prefetch={false}
                      >
                        <span>Политика безопасности</span>
                      </Link>
                    </div>
                    <div className={styles.bottom_right_wrapper}>
                      <span
                        title={`Nbhoz. All rights reserved. Все права защищены © ${copyRighYear}`}
                      >
                        Nbhoz. All rights reserved. Все права защищены ©{' '}
                        {copyRighYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {showCookiesNotifi ? (
            <div
              title="Политикой использования файлов cookies."
              style={{ display: isOpen ? 'flex' : 'none' }}
              className={styles.CookiesNotification}
            >
              <div className={styles.close_cookies}>
                <span
                  onClick={() => {
                    setOpen(false);
                    localStorage.setItem('agree-cookies', '0');
                  }}
                  className={styles.close_btn_wrapper}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1"
                      y1="-1"
                      x2="26.3541"
                      y2="-1"
                      transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="26.3044"
                      y2="-1"
                      transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </div>
              <div className={styles.notification_cookies}>
                <span>
                  При нажимая «Принять все файлы cookies», вы соглашаетесь, что
                  NBHOZ может сохранять файлы cookies на вашем устройстве и
                  раскрывать информацию в соответствии с нашей{' '}
                  <Link
                    style={{ color: '#5A6445' }}
                    href="/privacy#cookies"
                    prefetch={false}
                  >
                    <span>Политикой использования файлов cookies.</span>
                  </Link>
                </span>
              </div>
              <button
                className={styles.accept_cookies}
                onClick={() => handleCookiesClick(setOpen)}
                title="Принять все файлы cookies"
              >
                Принять все файлы cookies
              </button>
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Footer;
