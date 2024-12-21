import styled from 'styled-components';
import { Container, Header } from '../common';
import KeyValue from './KeyValue';
import { useMemo, useEffect } from 'react';
import { devices } from 'components/store/lib/Devices';

const UserInfo = (props: any) => {
  const { userInfoRef, setActive, user } = props;
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('profile');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(userInfoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [userInfoRef, observer]);
  return (
    <Container id="userinfo" ref={userInfoRef}>
      <Header>Личные данные</Header>
      <Wrapper>
        <KeyValue
          {...props}
          delay={0.05}
          keyData="Имя и фамилия"
          valueData={`${user.firstName} ${user.lastName}`}
        />
        <KeyValue
          {...props}
          delay={0.2}
          keyData="Почта"
          valueData={user.email}
        />
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  user-select: none;
  h2 {
    padding: 0 20px;
  }
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

export default UserInfo;
