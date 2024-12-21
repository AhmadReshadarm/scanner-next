import styled from 'styled-components';
import WishlistItems from './wishlistItems';

const Wishlist = () => {
  return (
    <Wrapper>
      <ItemWrapper>
        <WishlistItems />
      </ItemWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .header-spliter {
    width: 100%;
    .border-header {
      width: 95%;
      border-top: 1px solid;
    }
    .none-border-header {
      width: 10%;
    }
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

export default Wishlist;
