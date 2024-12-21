import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { devices } from '../lib/Devices';
type props = {
  width?: string;
  height?: string;
  flex_direction?: string;
  justify_content?: string;
  align_items?: string;
  position?: string;
  padding?: string;
  top?: string;
  z_index?: string;
  bg_color?: string;
  gap?: string;
  box_shadow?: string;
};

const Btns = styled(motion.button)`
  width: 25px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;

  span {
    width: 100%;
    height: 100%;
    .user-profile-image {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: ${(p: props) => p.flex_direction};
  justify-content: ${(p: props) => p.justify_content};
  align-items: ${(p: props) => p.align_items};
  position: ${(p: props) => p.position};
  padding: ${(p: props) => p.padding};
  top: ${(p: props) => p.top};
  z-index: ${(p: props) => p.z_index};
  background: ${(p: props) => p.bg_color};
  box-shadow: ${(p: props) => p.box_shadow};
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: row;
  gap: ${(p: props) => p.gap};
  align-items: center;
  position: ${(p: props) => p.position};
  @media ${devices.laptopL} {
    max-width: 1230px;
  }
  @media ${devices.laptopM} {
    max-width: unset;
  }
  @media ${devices.laptopS} {
    max-width: unset;
    width: 95%;
    flex-direction: ${(p?: props) => p?.flex_direction};
  }
  @media ${devices.tabletL} {
    max-width: unset;
    width: 95%;
    flex-direction: ${(p?: props) => p?.flex_direction};
  }
  @media ${devices.tabletS} {
    max-width: unset;
    width: 95%;
    flex-direction: ${(p?: props) => p?.flex_direction};
  }
  @media ${devices.mobileL} {
    max-width: unset;
    width: 95%;
    flex-direction: ${(p?: props) => p?.flex_direction};
  }
  @media ${devices.mobileM} {
    max-width: unset;
    width: 95%;
    flex-direction: ${(p?: props) => p?.flex_direction};
  }
  @media ${devices.mobileS} {
    max-width: unset;
    width: 95%;
    flex-direction: ${(p?: props) => p?.flex_direction};
  }
`;

const Content = styled.div`
  width: 100%;
  height: ${(p: props) => p.height};
  display: flex;
  flex-direction: ${(p: props) => p.flex_direction};
  justify-content: ${(p: props) => p.justify_content};
  align-items: ${(p: props) => p.align_items};
  gap: ${(p: props) => p.gap};
`;

const Headers = styled.h1`
  width: 100%;
  text-align: start;
  font-size: 1.5rem;
  @media ${devices.mobileL} {
    max-width: 95vw;
  }
`;

const Contents = styled.span`
  width: 80%;
  text-align: start;
  line-height: 1.5rem;
  font-size: 1rem;
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const Links = styled.span`
  color: ${color.hoverBtnBg};
  &:hover {
    color: ${color.ok};
  }
`;

const ListsDots = styled.ul`
  width: 80%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    list-style-type: circle;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;
const ListNumbers = styled.ol`
  width: 80%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    list-style-type: number;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export {
  Container,
  Wrapper,
  Content,
  Btns,
  Headers,
  Contents,
  Links,
  ListsDots,
  ListNumbers,
};
