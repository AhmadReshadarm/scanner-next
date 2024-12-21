import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import color from '../../lib/ui.colors';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TStoreCheckoutState } from 'redux/types';
import { getDiscount, getTotalPrice, generateInvoiceTemplet } from './helpers';
import { formatNumber } from 'common/helpers/number.helper';
import { NextRouter, useRouter } from 'next/router';
import { devices } from 'components/store/lib/Devices';
import { AddressService, CheckoutService, CheckoutDTO } from 'swagger/services';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';
import { TAuthState } from 'redux/types';
import { Role } from 'common/enums/roles.enum';
import DropDowns from './DropDowns';
import { useMetrica, YandexMetricaProvider } from 'next-yandex-metrica';
const TotalDetails = ({ comment, leaveNearDoor, setLoading }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reachGoal } = useMetrica();
  const { cart, isOneClickBuy } = useAppSelector<TCartState>(
    (state) => state.cart,
  );
  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  const [withDelivery, setWithDelivery] = useState(true);
  const [totalUI, setTotalUI] = useState(getTotalPrice(cart, withDelivery));
  const handleCheckoutWithoutRegister = (router: NextRouter) => async () => {
    setLoading(true);
    reachGoal('cta-click-order');
    const payload = {
      receiverName: deliveryInfo?.receiverName,
      receiverPhone: deliveryInfo?.receiverPhone,
      receiverEmail: deliveryInfo?.receiverEmail,
      address: deliveryInfo?.address,
      roomOrOffice: deliveryInfo?.roomOrOffice,
      door: deliveryInfo?.door,
      floor: deliveryInfo?.floor,
      rignBell: deliveryInfo?.rignBell,
      zipCode: deliveryInfo?.zipCode,
      comment,
      cart,
    };

    const generatedHtml = generateInvoiceTemplet(payload);

    if (deliveryInfo && payload && cart) {
      try {
        await CheckoutService.createCheckoutWithoutRegister({
          body: {
            to: payload.receiverEmail,
            subject: `Заказ ${payload.receiverName}`,
            html: `${generatedHtml}`,
          },
        });
        // await dispatch(createCart());

        // const basketId = localStorage.getItem('basketId') ?? '';

        // dispatch(fetchCart(basketId));
        openSuccessNotification('Ваш Заказ успешно');

        router.push('/checkout/after-checkout');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openErrorNotification('Ваш Заказ не прошел, Попробуйте еще раз');
      }
    }
  };
  const handlePayClick = (router: NextRouter) => async () => {
    setLoading(true);
    reachGoal('cta-click-order');

    const payload = {
      comment,
      leaveNearDoor,
    };

    if (deliveryInfo && payload && cart) {
      try {
        const responseAdress = await AddressService.createAddress({
          body: {
            receiverName: deliveryInfo.receiverName,
            receiverPhone: deliveryInfo.receiverPhone,
            address: deliveryInfo.address,
            roomOrOffice: deliveryInfo.roomOrOffice,
            door: deliveryInfo.door,
            floor: deliveryInfo.floor,
            rignBell: deliveryInfo.rignBell,
            zipCode: deliveryInfo.zipCode,
          },
        });

        await CheckoutService.createCheckout({
          body: {
            address: responseAdress,
            basket: cart,
            totalAmount: getTotalPrice(cart, withDelivery),
            comment: payload.comment,
            leaveNearDoor: payload.leaveNearDoor,
            userId: user?.id,
          } as CheckoutDTO,
        });

        await dispatch(createCart());

        const basketId = localStorage.getItem('basketId') ?? '';

        dispatch(fetchCart(basketId));
        openSuccessNotification('Ваш Заказ успешно');

        router.push('/orders');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openErrorNotification('Ваш Заказ не прошел');
      }

      return;
    }
  };

  useEffect(() => {
    setTotalUI(getTotalPrice(cart, withDelivery));
  });

  const estimated_delivery_date = new Date().toISOString().split('T')[0];

  return (
    <>
      <YandexMetricaProvider
        tagID={96632717}
        initParameters={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
        }}
      >
        <Container>
          <h3 className="total-header">Ваша сумма</h3>
          <Wrapper>
            <Content>
              <ItemColumn>
                <span>
                  <button
                    onClick={
                      isOneClickBuy
                        ? handleCheckoutWithoutRegister(router)
                        : handlePayClick(router)
                    }
                    className="checkout-action-btn"
                  >
                    Завершить мой заказ
                  </button>
                </span>
                <span className="user-agreement-text">
                  Нажимая на кнопку, вы соглашаетесь с{' '}
                  <Link href="/privacy">
                    <span>Политика безопасности</span>
                  </Link>
                  , а также с{' '}
                  <Link href="/user-agreement">
                    <span>Пользовательское соглашение</span>
                  </Link>
                </span>
              </ItemColumn>
              <ItemRowWrapper>
                <ItemRow>
                  <h3>Ваш заказ</h3>
                  <span className="product-wheight">
                    {cart?.orderProducts?.length} товар(ов) •
                  </span>
                </ItemRow>
                {cart?.orderProducts?.map((product: any, index) => {
                  return (
                    <ItemRow key={index}>
                      <span>{product.product?.name?.slice(0, 20)}..</span>
                      <p className="product-price-mobile-wrapper">
                        <span>{product!.qty} шт</span> *{'  '}
                        <span>
                          {user?.role === Role.SuperUser
                            ? product.productVariant?.wholeSalePrice
                            : product.productVariant?.price}{' '}
                          ₽
                        </span>
                        {'  '}
                        <span>=</span>
                        {'  '}
                        <span style={{ whiteSpace: 'nowrap' }}>
                          {user?.role === Role.SuperUser
                            ? product.productVariant?.wholeSalePrice *
                              product.qty
                            : product.productVariant?.price * product.qty}{' '}
                          ₽
                        </span>
                      </p>
                    </ItemRow>
                  );
                })}
                {user?.role === Role.SuperUser ? (
                  ''
                ) : (
                  <ItemRow>
                    <span>Скидка</span>
                    <b>
                      <span style={{ color: color.ok }}>
                        {`${formatNumber(getDiscount(cart))}`} ₽
                      </span>
                    </b>
                  </ItemRow>
                )}
              </ItemRowWrapper>
              <ItemRow>
                <h3 className="total">Итого</h3>
                <h3 className="total">{formatNumber(totalUI)} ₽</h3>
              </ItemRow>
            </Content>

            <DropDowns />
          </Wrapper>
        </Container>

        <script
          src="https://apis.google.com/js/platform.js?onload=renderOptIn"
          async
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `  window.renderOptIn = function()
        {window.gapi.load('surveyoptin', function () {
          window.gapi.surveyoptin.render({
            // REQUIRED FIELDS
            merchant_id: 5338706929,
            order_id: ${cart?.id},
            email: ${isOneClickBuy ? deliveryInfo?.receiverEmail : user?.email},
            delivery_country: 'RU',
            estimated_delivery_date: ${estimated_delivery_date},
          });
        })}`,
          }}
        />
      </YandexMetricaProvider>
    </>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  position: sticky;
  top: 0;
  .total-header {
    color: ${color.textSecondary};
  }
  @media ${devices.tabletL} {
    width: 100%;
    position: unset;
  }
  @media ${devices.tabletS} {
    width: 100%;
    position: unset;
  }
  @media ${devices.mobileL} {
    width: 100%;
    position: unset;
  }
  @media ${devices.mobileM} {
    width: 100%;
    position: unset;
  }
  @media ${devices.mobileS} {
    width: 100%;
    position: unset;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  gap: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const ItemColumn = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  span {
    width: 100%;
    .checkout-action-btn {
      width: 100%;
      height: 50px;
      border-radius: 30px;
      background-color: ${color.textSecondary};
      cursor: pointer;
      transition: 150ms;
      color: ${color.textPrimary};
      font-size: 1.2rem;
      &:active {
        background-color: ${color.textPrimary};
        color: ${color.textSecondary};
        border: 1px solid ${color.textSecondary};
      }
      &:hover {
        scale: 1.01;
        background-color: ${color.textPrimary};
        color: ${color.textSecondary};
        border: 1px solid ${color.textSecondary};
        box-shadow: 0px 4px 10px 5px rgb(0 0 0 / 12%);
      }
      span {
        font-size: 1rem;
      }
    }
  }
  .user-agreement-text {
    width: 100%;
    a {
      color: ${color.hoverBtnBg};
      &:hover {
        color: ${color.ok};
      }
    }
  }
`;

const ItemRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  padding: 10px 0;
`;

const ItemRow = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .self-pick-up {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    input {
      cursor: pointer;
    }
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
  .product-wheight {
    color: ${color.textTertiary};
  }
  .total {
    font-size: 1.1rem;
  }
  @media ${devices.laptopS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.tabletL} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.tabletS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }

  @media ${devices.mobileL} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.mobileM} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.mobileS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
`;

export default TotalDetails;
