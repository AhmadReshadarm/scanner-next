import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import Link from 'next/link';
import Subscribers from 'ui-kit/Subscribers';
import { baseUrl } from 'common/constant';
import dynamic from 'next/dynamic';
const MapContainer = dynamic(
  () => import('components/store/addressContactUs/index'),
  {
    ssr: true,
    loading: () => <LoaderMask />,
  },
);
const Contacts = () => {
  return (
    <>
      <SEOstatic
        page={{
          realName:
            'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          name: 'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          url: '/',
          desc: `NBHOZ, Дешевые хозтовары оптом в интернет магазине nbhoz в Москве и все Россия`,
          keywords:
            'nbhoz, nbhoz.ru, Товары для сервировки стола,купить Кухонная утварь, Товары для ванной комнаты, Дешевые хозтовары',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />

      <Container
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="50px 0"
        gap="40px"
        bg_color={color.textPrimary}
      >
        <BackToMain>
          <Link className="back-to-main" href="/">
            <img src="/icons/back_arrow.png" alt="back button" />
            <span>Обратно на главную</span>
          </Link>
        </BackToMain>
        <HeaderWrapper>
          <div className="header-title-wrapper">
            <span>Наши контакты</span>
          </div>
          <div className="header-divder-wrapper"></div>
        </HeaderWrapper>
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            align_items="center"
            gap="30px"
          >
            <MapContainer />
          </Content>
        </Wrapper>
        <Subscribers />
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
  @media ${devices.tabletL} {
    width: 95%;
    max-width: unset;
  }
  @media ${devices.tabletS} {
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
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid ${color.textSecondary};
  position: relative;

  .header-title-wrapper {
    max-width: 1230px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 20px 30px;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
    span {
      font-size: 1.5rem;
    }
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-start;
    border-bottom: 20px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 40px;
    left: 0;
  }
  @media ${devices.laptopS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.tabletL} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.tabletS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.mobileL} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.mobileM} {
    .header-title-wrapper {
      max-width: unset;
    }
  }

  @media ${devices.mobileS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
`;

const LoaderMask = styled.div`
  width: 100vw;
  height: 100vh;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

Contacts.PageLayout = StoreLayout;

export default Contacts;
