import AdminLayout from '../../../components/admin/adminLayout/layout';
import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import styles from './index.module.scss';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import Link from 'next/link';
import Orders from 'components/store/order/Order';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearCheckout,
  fetchCheckoutById,
  updateCheckout,
} from '../../../redux/slicers/checkoutsSlicer';
import Head from 'next/head';
const Constants = [
  'Изменить на (Новый заказ)',
  'Изменить на (В пути)',
  'Изменить на (Завершен)',
  'Изменить на (Отменено)',
];
const CheckoutsPage = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { checkout, loading, saveLoading } = useAppSelector(
    (state) => state.checkouts,
  );

  useEffect(() => {
    dispatch(fetchCheckoutById({ checkoutId: router.query.id as string }));
    return () => {
      dispatch(clearCheckout());
    };
  }, []);

  const handleOrderStaus = async (
    checkoutId: string,
    status: CheckoutStatus,
  ) => {
    setOpen(false);
    dispatch(updateCheckout({ checkoutId, status }));
  };

  const statusSetter = (index: number) => {
    switch (index) {
      case 0:
        return CheckoutStatus.New;
      case 1:
        return CheckoutStatus.InDelivery;
      case 2:
        return CheckoutStatus.Completed;
      case 3:
        return CheckoutStatus.Canceled;

      default:
        return CheckoutStatus.New;
    }
  };

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Заказы {`>`} Редактирование Заказа | NBHOZ
        </title>
      </Head>
      {loading || saveLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Wrapper>
          <Content>
            <ActionButtonsWrapper>
              <Link href="/admin/checkouts">
                <ActionButtons>назад</ActionButtons>
              </Link>
              <ActionButtons onClick={() => setOpen(!isOpen)}>
                Изменить статус заказа
              </ActionButtons>
              {isOpen ? (
                <StatusOptionsWappper>
                  {Constants.map((status, index) => (
                    <li
                      onClick={() =>
                        handleOrderStaus(checkout.id, statusSetter(index))
                      }
                    >
                      {status}
                    </li>
                  ))}
                </StatusOptionsWappper>
              ) : (
                ''
              )}
            </ActionButtonsWrapper>
            {checkout.user ? <Orders checkout={checkout} index={0} /> : ''}
          </Content>
        </Wrapper>
      )}
    </>
  );
};

const ActionButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  position: relative;
  padding: 20px 50px;
`;

const ActionButtons = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  cursor: pointer;
  transition: 300ms;
  &:hover {
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  span {
    font-family: ver(--font-Jost);
    font-size: 1rem;
  }
`;

const StatusOptionsWappper = styled.ul`
  width: 350px;
  background-color: ${color.textPrimary};
  border-radius: 15px;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  display: flex;
  flex-direction: column;
  justify-contetn: flex-start;
  algin-items: center;
  overflow: hidden;
  position: absolute;
  top: 50px;
  left: 150px;
  li {
    cursor: pointer;
    width: 100%;
    text-align: center;
    padding: 15px;
    color: ${color.btnPrimary};
    &:hover {
      background-color: ${color.textSecondary};
    }
  }
`;

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
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
`;

CheckoutsPage.PageLayout = AdminLayout;

export default CheckoutsPage;
