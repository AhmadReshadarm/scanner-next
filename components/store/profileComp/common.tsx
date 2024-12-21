import styled from 'styled-components';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  padding: 50px 0;
  @media ${devices.tabletL} {
    height: 100%;
  }
  @media ${devices.tabletS} {
    height: 100%;
  }
  @media ${devices.mobileL} {
    height: 100%;
  }
  @media ${devices.mobileM} {
    height: 100%;
  }
  @media ${devices.mobileS} {
    height: 100%;
  }
`;

const Header = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
`;

const PopupContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-conetent: cneter;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  border-radius: 5px;
  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileS} {
    width: 100%;
  }
`;

export { Container, Header, PopupContainer };
