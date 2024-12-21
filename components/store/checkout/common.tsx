import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  a {
    width: 200px;
    height: 40px;
    span {
      width: 100%;
      height: 100%;
    }
  }
`;

export { Wrapper };
