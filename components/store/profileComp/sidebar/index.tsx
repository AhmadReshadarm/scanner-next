import styled from 'styled-components';
import UserInfo from './UserInfo';
import Nav from './Nav';
import { devices } from 'components/store/lib/Devices';

const SideBar = (props: any) => {
  return (
    <ContainerSideBar>
      <UserInfo {...props} />
      <Nav {...props} />
    </ContainerSideBar>
  );
};

const ContainerSideBar = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  position: sticky;
  top: 0;
  user-select: none;
  @media ${devices.laptopS} {
    width: 100%;
    position: unset;
  }
  @media ${devices.tabletL} {
    width: 100%;
    position: unset;
  }
  @media ${devices.tabletS} {
    width: 100%;
    position: unset;
  }
  @media ${devices.mobileL} {
    width: 100%;
    position: unset;
  }
`;

const Wrapper = styled.div``;
export default SideBar;
