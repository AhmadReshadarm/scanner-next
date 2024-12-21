import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import Link from 'next/link';
const ReturnPolicy = () => {
  return (
    <>
      <SEOstatic
        page={{
          realName: 'NBHOZ - Опт Товаров для Дома и Бизнеса | О доставке',
          name: 'NBHOZ - Опт Товаров для Дома и Бизнеса | О доставке',
          url: '',
          desc: 'Оптовый поставщик товаров для дома и бизнеса. У нас вы найдете широкий ассортимент хозяйственных товаров, включая уборочный инвентарь, товары для ремонта, и многое другое. Закажите оптом и получите выгодные цены!',
          keywords:
            'оптом, товары для дома, хозяйственные товары, мелкая оптовая торговля, купить оптом, продажа оптом, оптовый склад, оптовый поставщик, швабры, губки, столовые приборы, инструменты, коврики, спортивный инвентарь',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />
      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="200px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            gap="30px"
          >
            <Headers>О доставке</Headers>
            <Headers className="dilevery-title">
              КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?
            </Headers>

            <Contents>
              Бесплатная доставка по Москве и в любую транспортную компанию при
              заказе от 70 000 рублей.
            </Contents>
            <Contents>
              При меньшей сумме заказа возможен самовывоз или платная доставка.
            </Contents>
            <Contents>
              Стоимость платной доставки определяется после оформления заказа.
              Наш менеджер свяжется с вами, чтобы уточнить адрес доставки и
              цену.
            </Contents>
            <Headers className="dilevery-title">
              {`Где находятся наши склады`.toUpperCase()}?
            </Headers>
            <Contents>
              Наши склады находятся в разных районах Москвы. После оформления
              заказа мы свяжемся с вами, чтобы уточнить адрес доставки или
              самовывоза с ближайшего к вам склада.
            </Contents>
            <Contents>
              По дополнительным вопросам обращаться по номеру телефона:{' '}
              <Link style={{ color: color.ok }} href="tel:89254865444">
                <span>8-925-486-54-44</span>
              </Link>
              .
            </Contents>
            <Contents>
              Дополнительная скидка рассчитывается индивидуально и зависит от
              количества заказанного товара.
            </Contents>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const Headers = styled.h1`
  width: 100%;
  text-align: start;
  font-size: 1.5rem;
  font-weight: 500;
  @media ${devices.mobileL} {
    max-width: 95vw;
  }
`;

const Contents = styled.span`
  width: 80%;
  text-align: start;
  line-height: 1.5rem;
  font-size: 1rem;
  .dilevery-title {
    font-weight: 500;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

ReturnPolicy.PageLayout = StoreLayout;

export default ReturnPolicy;
