import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import DeliveryDetails from './DeliveryDetails';
import TotalDetails from './TotalDetails';
import { devices } from 'components/store/lib/Devices';

const TotalDeliveryDate = (props: any) => {
  const [comment, setComment] = useState('');
  const [leaveNearDoor, setLeaveNearDoor] = useState(false);

  return (
    <Container>
      <div className="back-to-cart">
        <Link href="/cart">
          <span>Вернуться в корзину</span>
        </Link>
        <h1>Оформление заказа</h1>
      </div>
      <Wrapper>
        <DeliveryDetails
          comment={comment}
          leaveNearDoor={leaveNearDoor}
          setComment={setComment}
          setLeaveNearDoor={setLeaveNearDoor}
          {...props}
        />
        <TotalDetails
          comment={comment}
          leaveNearDoor={leaveNearDoor}
          {...props}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  .back-to-cart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    a {
      &:hover {
        color: ${color.textBase};
      }
    }
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  gap: 30px;
  @media ${devices.tabletL} {
    flex-direction: column-reverse;
  }
  @media ${devices.tabletS} {
    flex-direction: column-reverse;
  }
  @media ${devices.mobileL} {
    flex-direction: column-reverse;
  }
  @media ${devices.mobileM} {
    flex-direction: column-reverse;
  }
  @media ${devices.mobileS} {
    flex-direction: column-reverse;
  }
`;

export default TotalDeliveryDate;
