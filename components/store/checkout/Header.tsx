import variants from '../lib/variants';
import { Wrapper } from './common';
import { overrideDefaultIOSZoom } from '../storeLayout/helpers';
import Progress from './Progress';
import { useEffect } from 'react';

const Header = (props: any) => {
  useEffect(() => overrideDefaultIOSZoom(), []);
  return (
    <>
      <Wrapper
        key={`header-checkout`}
        custom={0.05}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.05 } }}
        variants={variants.fadInSlideUp}
      ></Wrapper>
      <Progress {...props} />
    </>
  );
};

export default Header;
