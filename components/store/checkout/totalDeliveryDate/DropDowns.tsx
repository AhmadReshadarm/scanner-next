import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import InfoDropdown from './DropDownsParrent';
import { devices } from 'components/store/lib/Devices';
import Link from 'next/link';

const DropDowns = () => {
  return (
    <InfoContainer
      key="info-product-page"
      custom={0.3}
      initial="init"
      whileInView="animate"
      exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      <InfoDropdown title="О Доставка">
        <h3>КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?</h3>

        <Contents>
          Бесплатная доставка по Москве и в любую транспортную компанию при
          заказе от 70 000 рублей.
        </Contents>
        <Contents>
          При меньшей сумме заказа возможен самовывоз или платная доставка.
        </Contents>
        <Contents>
          Стоимость платной доставки определяется после оформления заказа. Наш
          менеджер свяжется с вами, чтобы уточнить адрес доставки и цену.
        </Contents>
        <h3>ГДЕ НАХОДЯТСЯ НАШИ СКЛАДЫ?</h3>
        <Contents>
          Наши склады находятся в разных районах Москвы. После оформления заказа
          мы свяжемся с вами, чтобы уточнить адрес доставки или самовывоза с
          ближайшего к вам склада.
        </Contents>
        <Contents>
          По дополнительным вопросам обращаться по номеру телефона:{' '}
          <Link
            title="По дополнительным вопросам обращаться по номеру телефона 8-925-486-54-44"
            href="tel:89254865444"
            prefetch={false}
          >
            <span
              style={{
                fontWeight: 500,
                fontFamily: 'var(--font-Circe)',
                whiteSpace: 'nowrap',
              }}
            >
              8-925-486-54-44
            </span>
          </Link>
          .
        </Contents>
        <Contents>
          Дополнительная скидка рассчитывается индивидуально и зависит от
          количества заказанного товара.
        </Contents>
      </InfoDropdown>
    </InfoContainer>
  );
};

const InfoContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: flex-start;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${color.textPrimary};
  margin-top: ${(P: styleProps) => P.margintop};
  user-select: none;
`;

const Contents = styled.span`
  width: 100%;
  text-align: start;
  line-height: 1.5rem;
  font-size: 1rem;
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }
  @media ${devices.mobileS} {
    width: 100%;
  }
`;

export default DropDowns;
