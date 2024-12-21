import color from 'components/store/lib/ui.colors';
import { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SideBar from './sidebar';
import UserInfo from './userInfo';
import Reveiws from './reveiws';
import Changepsw from './changepsw';
import Settings from './settings';
import { devices } from '../lib/Devices';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { UsePagination } from '../storeLayout/utils/HeaderAuth/authorize/helpers';
import Authorization from '../storeLayout/utils/HeaderAuth/authorize';
const ProfileComp = (props: any) => {
  const { setActive } = props;
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  const [direction, authType, paginate] = UsePagination();
  const userInfoRef = useRef(null);
  const reveiwsRef = useRef<any>(null);
  const changePswRef = useRef(null);
  const settingsRef = useRef(null);

  return (
    <>
      {!user ? (
        <AuthContainer>
          <AuthWrapper>
            <AuthContent>
              <Authorization
                direction={direction}
                authType={authType}
                paginate={paginate}
              />
            </AuthContent>
          </AuthWrapper>
        </AuthContainer>
      ) : (
        <Container>
          <SideBar
            userInfoRef={userInfoRef}
            reveiwsRef={reveiwsRef}
            changePswRef={changePswRef}
            settingsRef={settingsRef}
            {...props}
          />
          <Wrapper>
            <UserInfo
              settingsRef={settingsRef}
              userInfoRef={userInfoRef}
              setActive={setActive}
              user={user}
              {...props}
            />
            <Reveiws {...props} reveiwsRef={reveiwsRef} />
            <Changepsw {...props} changePswRef={changePswRef} user={user} />
            <Settings {...props} settingsRef={settingsRef} user={user} />
          </Wrapper>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  @media ${devices.laptopS} {
    flex-direction: column;
  }
  @media ${devices.tabletL} {
    flex-direction: column;
  }
  @media ${devices.tabletS} {
    flex-direction: column;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
`;

const AuthContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(/auth_bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 350px;
`;

const AuthWrapper = styled(motion.div)`
  width: 100vw;
  height: 100%;
  position: relative;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
`;

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    text-align: center;
  }
`;

export default ProfileComp;
