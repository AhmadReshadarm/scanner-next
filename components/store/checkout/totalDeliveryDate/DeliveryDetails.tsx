import styled from 'styled-components';
import ProductDetails from './ProductDetails';
import UserDetails from './UserDetails';
import color from 'components/store/lib/ui.colors';
import { Wrapper } from './common';
import { devices } from 'components/store/lib/Devices';

const DeliveryDetails = (props: any) => {
  return (
    <Container>
      <h3 className="header-delivery">ДОСТАВКА NBHOZ</h3>
      <Wrapper>
        <UserDetails {...props} />
      </Wrapper>
      <ProductDetails />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  .header-delivery {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: ${color.textSecondary};
  }

  @media ${devices.laptopS} {
    width: 60%;
  }
`;

export default DeliveryDetails;
