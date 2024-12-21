import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
const Nav = (props: any) => {
  const {
    isActive,
    setActive,
    userInfoRef,
    reveiwsRef,
    changePswRef,
    settingsRef,
  } = props;

  const handleActive = (value, setActive, ref) => {
    setActive(value);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };
  return (
    <WrapperNav>
      <motion.li
        animate={{
          backgroundColor: isActive == 'profile' ? '#0000000d' : '#00000003',
          borderRight:
            isActive == 'profile' ? `2px solid ${color.hover}` : '0 solid',
        }}
        onClick={() => handleActive('profile', setActive, userInfoRef)}
      >
        <span
          style={{
            color: isActive == 'profile' ? color.hover : color.btnPrimary,
          }}
        >
          Личные данные
        </span>
      </motion.li>
      <motion.li
        animate={{
          backgroundColor: isActive == 'reveiws' ? '#0000000d' : '#00000003',
          borderRight:
            isActive == 'reveiws' ? `2px solid ${color.hover}` : '0 solid',
        }}
        onClick={() => handleActive('reveiws', setActive, reveiwsRef)}
      >
        <span
          style={{
            color: isActive == 'reveiws' ? color.hover : color.btnPrimary,
          }}
        >
          Отзывы
        </span>
      </motion.li>
      <motion.li
        animate={{
          backgroundColor: isActive == 'changePsw' ? '#0000000d' : '#00000003',
          borderRight:
            isActive == 'changePsw' ? `2px solid ${color.hover}` : '0 solid',
        }}
        onClick={() => handleActive('changePsw', setActive, changePswRef)}
      >
        <span
          style={{
            color: isActive == 'changePsw' ? color.hover : color.btnPrimary,
          }}
        >
          Изменить пароль
        </span>
      </motion.li>
      <motion.li
        animate={{
          backgroundColor: isActive == 'settings' ? '#0000000d' : '#00000003',
          borderRight:
            isActive == 'settings' ? `2px solid ${color.hover}` : '0 solid',
        }}
        onClick={() => handleActive('settings', setActive, settingsRef)}
      >
        <span
          style={{
            color: isActive == 'settings' ? color.hover : color.btnPrimary,
          }}
        >
          Настройки
        </span>
      </motion.li>
    </WrapperNav>
  );
};

const WrapperNav = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  background-color: ${color.bgProduct};
  @media ${devices.tabletL} {
    display: none;
  }
  @media ${devices.tabletS} {
    display: none;
  }
  @media ${devices.mobileL} {
    display: none;
  }
  @media ${devices.mobileM} {
    display: none;
  }
  @media ${devices.mobileS} {
    display: none;
  }

  .active {
    background-color: #0000000d;
    border-right: 2px solid ${color.hover};
  }
  li {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 0 20px;
    background-color: #00000003;
    cursor: pointer;
    span {
      width: 100%;
      height: 100%;
      font-size: 1.2rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      &:hover {
        color: ${color.hover};
      }
    }
  }
`;

export default Nav;
