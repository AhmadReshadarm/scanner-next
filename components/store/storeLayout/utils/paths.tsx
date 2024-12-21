import { motion } from 'framer-motion';
import styled from 'styled-components';

type StyleProps = {
  transform: string;
};
const Path = (props: any) => (
  <Paths
    transform={props.transform}
    fill="transparent"
    strokeWidth="2"
    strokeLinecap="round"
    {...props}
  />
);

// const PathCircle = (props: any) => <motion.path {...props} />;

const Paths = styled(motion.path)`
  transform-origin: ${(p: StyleProps) => p.transform} !important;
`;
// PathCircle
export { Path };
