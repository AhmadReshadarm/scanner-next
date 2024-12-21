import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const ReturnPolicyComp = dynamic(
  () => import('components/store/returnPolicy'),
  {
    ssr: true,
    loading: () => <LoaderMask />,
  },
);
const ReturnPolicy = () => {
  return (
    <>
      <SEOstatic
        page={{
          realName: 'NBHOZ - Опт Товаров для Дома и Бизнеса',
          name: 'NBHOZ - Опт Товаров для Дома и Бизнеса',
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
            <ReturnPolicyComp />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

ReturnPolicy.PageLayout = StoreLayout;

export default ReturnPolicy;
