import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { Container, Header } from '../common';
import { useEffect, useMemo, useState } from 'react';
import Notifactions from './Notification';
import UserData from './userData';
import { devices } from 'components/store/lib/Devices';

const Settings = (props: any) => {
  const { settingsRef, setActive } = props;
  const [isOpen, setOpen] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('settings');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(settingsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [settingsRef, observer]);
  return (
    <Container id="settings" style={{ height: 'unset' }} ref={settingsRef}>
      <Header>Настройки</Header>
      <Notifactions {...props} />
      <ChangeDataWrapper>
        <Header>Изменить личные данные</Header>
        <ChangeDataBtn onClick={() => setOpen(true)}>
          Изменить данные
        </ChangeDataBtn>
      </ChangeDataWrapper>
      <UserData isOpen={isOpen} setOpen={setOpen} {...props} />
    </Container>
  );
};

const ChangeDataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 50px 10px;
`;

const ChangeDataBtn = styled.button`
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
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }
  @media ${devices.mobileS} {
    width: 100%;
  }
`;

export default Settings;
