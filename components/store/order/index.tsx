import styled from 'styled-components';
import { Checkout } from 'swagger/services';
import { devices } from '../lib/Devices';
import Order from './Order';
import color from '../lib/ui.colors';
import { useAppSelector } from 'redux/hooks';
import { TStoreCheckoutState } from 'redux/types';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import styles from './styles/main.module.css';
type Props = {
  checkouts: Checkout[];
};
const MyOrders: React.FC<Props> = ({ checkouts }) => {
  const { loading } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  return (
    <>
      {!loading ? (
        Number(checkouts.length) > 0 ? (
          <Wrapper>
            <Content>
              {checkouts.map((checkout, index) => (
                <Order
                  key={`order-${index}`}
                  checkout={checkout}
                  index={index}
                />
              ))}
            </Content>
          </Wrapper>
        ) : (
          <div className={styles.no_orders}>
            <h2 className={styles.empty_orders}>У вас пока нет заказов</h2>
          </div>
        )
      ) : (
        <LoaderMask />
      )}
    </>
  );
};

const Wrapper = styled.div`
  max-width: 1230px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-contnt: flex-start;
  align-items: center;
  gap: 30px;
  padding: 30px 20px;
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

const Content = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  border-radius: 10px;
  // box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
`;

export default MyOrders;
