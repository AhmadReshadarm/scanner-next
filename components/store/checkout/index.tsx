import { useEffect, useState } from 'react';
import Header from './Header';
import UserData from './userdata';
import TotalDeleveryDate from './totalDeliveryDate';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState, TCartState } from 'redux/types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import Authorization from '../storeLayout/utils/HeaderAuth/authorize';
import { UsePagination } from '../storeLayout/utils/HeaderAuth/authorize/helpers';
import Loading from 'ui-kit/Loading';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
const CheckoutContent = () => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { isOneClickBuy } = useAppSelector<TCartState>((state) => state.cart);
  const [hasAddress, setHasAddress] = useState(false);
  const [backToFinal, setBacktoFinal] = useState(false);
  const [direction, authType, paginate] = UsePagination();
  const [step, setStep] = useState(0);
  const [activeUI, setActiveUI] = useState('auth');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      setStep(1);
      dispatch(setOneClickBy(false));
    }
    if (!user) {
      setStep(0);
    }
  }, [user]);
  useEffect(() => {
    if (isOneClickBuy) {
      setStep(1);
    }
  }, [isOneClickBuy]);

  useEffect(() => {
    switch (true) {
      case step == 0 && !user && !isOneClickBuy:
        setActiveUI('auth');
        break;
      case (step == 1 && isOneClickBuy && !hasAddress) ||
        (step == 1 && user && !hasAddress):
        setActiveUI('userData');
        break;
      case (step == 2 && isOneClickBuy && hasAddress) ||
        (step == 2 && user && hasAddress):
        setActiveUI('completeOrder');
        break;
      default:
        break;
    }
    console.log(user);
  }, [user, step, isOneClickBuy, hasAddress]);

  return (
    <Content>
      {isLoading ? (
        <Loader>
          <Loading />
        </Loader>
      ) : (
        ''
      )}
      <Header step={step} setStep={setStep} />
      <Contianer
        style={{
          display: activeUI == 'auth' ? 'flex' : 'none',
        }}
      >
        <Wrapper variants={variants.fadeInReveal}>
          <AuthContent>
            <Authorization
              direction={direction}
              authType={authType}
              paginate={paginate}
            />
          </AuthContent>
        </Wrapper>
      </Contianer>
      <MapContainer
        style={{
          display: activeUI == 'userData' ? 'flex' : 'none',
        }}
      >
        <UserData
          setStep={setStep}
          backToFinal={backToFinal}
          setHasAddress={setHasAddress}
        />
      </MapContainer>
      <CompleteOrderContainer
        style={{
          display: activeUI == 'completeOrder' ? 'flex' : 'none',
        }}
      >
        <TotalDeleveryDate
          setHasAddress={setHasAddress}
          setStep={setStep}
          setBacktoFinal={setBacktoFinal}
          setLoading={setLoading}
        />
      </CompleteOrderContainer>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  position: relative;
`;

const MapContainer = styled.div`
  width: 100%;
`;
const CompleteOrderContainer = styled.div`
  width: 100%;
`;

const Contianer = styled(motion.div)`
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

const Wrapper = styled(motion.div)`
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

const Loader = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff36;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default CheckoutContent;

// |if the user is not signed in bring authrization whick is first step
// |
// |---if the user is new bring user data which is second step
// |
// |
// |---|if the user is old and has delivery address bring details which is second step finished
//     |and ready to go to third step -> /payment
//     |
//     |--user can edit address and oreder reciver data
