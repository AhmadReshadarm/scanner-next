import StoreLayout from 'components/store/storeLayout/layouts';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import Head from 'next/head';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import styled from 'styled-components';
import Link from 'next/link';
import { baseUrl } from 'common/constant';
import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';

const AfterCheckout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const clearCart = async () => {
      await dispatch(createCart());
      const basketId = localStorage.getItem('basketId') ?? '';
      dispatch(fetchCart(basketId));
    };
    clearCart();
  }, []);
  return (
    <>
      <Head>
        <title>Заказ выполнен успешно | NBHOZ</title>
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
        <BackToMain>
          <Link className="back-to-main" href="/catalog">
            <img src="/icons/back_arrow.png" alt="back button" />
            <span>Продолжить покупки</span>
          </Link>
        </BackToMain>

        <Wrapper
          flex_direction="column"
          gap="40px"
          style={{ flexDirection: 'column', padding: '50px 0' }}
        >
          <ContentWarpper>
            <h1>Ваш заказ был успешно офомрлен</h1>
            <span className="order-complet-text">
              Наш оператор свяжется с Вами в ближайшее время. Оператор
              проинформирует Вас о дальнейших действиях по Вашему заказу. Так же
              на Ваш почтовый адрес будет выслана выписка по оплате Ваших
              товаров.
            </span>
            <div className="back-to-catelog-btn-wrapper">
              <div className="back-to-catelog-text-wrapper">
                <span>
                  <b>Спасибо за Ваш выбор. </b>
                </span>
                <span>
                  <b>С Уважением, Ваш NBHOZ</b>
                </span>
              </div>
              <Link href="/catalog">
                <button>{`Продолжить покупки`.toUpperCase()}</button>
              </Link>
            </div>
          </ContentWarpper>
        </Wrapper>
      </Container>
    </>
  );
};

const BackToMain = styled.div`
  width: 100%;
  max-width: 1230px;
  padding: 0 0 50px 0;
  .back-to-main {
    display: flex;
    felx-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    img {
      width: 40px;
    }
  }
  @media ${devices.laptopS} {
    width: 95%;
    max-width: unset;
  }

  @media ${devices.mobileL} {
    width: 95%;
    max-width: unset;
  }
  @media ${devices.mobileM} {
    width: 95%;
    max-width: unset;
  }

  @media ${devices.mobileS} {
    width: 95%;
    max-width: unset;
  }
`;

const ContentWarpper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
  padding: 50px;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  border-radius: 15px;

  .order-complet-text {
    width: 50%;
    color: #5a6445;
  }
  .back-to-catelog-btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 15px;
    .back-to-catelog-text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;
      color: #606060;
    }
    button {
      height: 50px;
      background-color: ${color.textSecondary};
      color: ${color.textPrimary};
      cursor: pointer;
      transition: 300ms;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      padding: 0 15px;
      &:hover {
        background-color: ${color.textPrimary};
        color: ${color.textSecondary};
        border: 1px solid ${color.textSecondary};
        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
        background-color: ${color.textPrimary};
        color: ${color.textSecondary};
        border: 1px solid ${color.textSecondary};
      }
      span {
        font-family: ver(--font-Jost);
        font-size: 1rem;
      }
    }
  }
  @media ${devices.laptopS} {
    h1 {
      font-size: 1.5rem;
    }
    .order-complet-text {
      width: 100%;
    }
  }
  @media ${devices.tabletL} {
    padding: 20px 15px 20px 15px;
    h1 {
      font-size: 1.2rem;
    }
    .order-complet-text {
      width: 100%;
    }
  }
  @media ${devices.tabletS} {
    align-items: center;
    padding: 10px;
    text-align: center;
    h1 {
      font-size: 1rem;
    }
    .order-complet-text {
      width: 100%;
    }
  }
  @media ${devices.mobileL} {
    align-items: center;
    padding: 10px;
    text-align: center;
    h1 {
      font-size: 1rem;
    }
    .order-complet-text {
      width: 100%;
    }
  }
  @media ${devices.mobileM} {
    align-items: center;
    padding: 10px;
    text-align: center;
    h1 {
      font-size: 1rem;
    }
    .order-complet-text {
      width: 100%;
    }
  }
  @media ${devices.mobileS} {
    align-items: center;
    padding: 10px;
    text-align: center;
    h1 {
      font-size: 1.5rem;
    }
    .order-complet-text {
      width: 100%;
    }
  }
`;

AfterCheckout.PageLayout = StoreLayout;

export default AfterCheckout;
