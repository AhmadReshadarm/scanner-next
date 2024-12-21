import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import isEmpty from 'validator/lib/isEmpty';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { TAuthState, TCartState, TStoreCheckoutState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { getTotalPrice } from 'components/store/checkout/totalDeliveryDate/helpers';
import { axiosInstance } from 'common/axios.instance';

const Product = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const router = useRouter();
  const { deliveryInfo, orderInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  // useEffect(() => {
  //   (async () => {
  //     const response = await axiosInstance.post('/payments', {
  //       value: `${getTotalPrice(cart)}.0`,
  //     });

  //     if (deliveryInfo) {
  //       localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
  //       localStorage.setItem('orderInfo', JSON.stringify(orderInfo));

  //       const checkoutWidget = new (window as any).YooMoneyCheckoutWidget({
  //         confirmation_token: response.data.confirmation.confirmation_token,
  //         return_url: `${window.location.origin}/after-payment?paymentId=${response.data.id}`,

  //         //При необходимости можно изменить цвета виджета, подробные настройки см. в документации
  //         //customization: {
  //         //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX
  //         //colors: {
  //         //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля
  //         //control_primary: '#00BF96', //Значение цвета в HEX

  //         //Цвет платежной формы и ее элементов
  //         //background: '#F2F3F5' //Значение цвета в HEX
  //         //}
  //         //},
  //         error_callback: function (error) {
  //           debugger;
  //           console.log(error);
  //         },
  //       });

  //       //Отображение платежной формы в контейнере
  //       checkoutWidget.render('payment-form');
  //     }
  //   })();
  // }, [deliveryInfo]);

  return (
    <Container
      flex_direction="column"
      justify_content="space-evenly"
      padding="50px 0"
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="flex-start"
          align_items="center"
          gap="20px"
          style={{ minHeight: 'calc(70vh + 124px)' }}
        >
          <CardForm>
            <div id="payment-form"></div>
          </CardForm>
        </Content>
      </Wrapper>
    </Container>
  );
};

const CardForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding-top: 120px;
`;

Product.PageLayout = StoreLayout;
export default Product;
