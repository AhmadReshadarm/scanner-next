import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { PopupDisplay } from 'components/store/storeLayout/constants';

const Filters = (props: any) => {
  // _______________ menu hooks _______________
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);

  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setOpen,
      setDisplay,
    ),
  );
  const closeHandler = () => {
    setOpen(!isOpen);
    setTimeout(() => {
      setDisplay(
        display == PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    }, 100);
  };
  return (
    <FilterWrapper>
      <FilterDropDownBtn
        whileHover="hover"
        whileTap="tap"
        variants={variants.boxShadow}
        onClick={closeHandler}
        ref={btnNode}
      >
        <span>{props.value}</span>
        <motion.span
          animate={isOpen ? 'open' : 'close'}
          variants={variants.rotate}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
              stroke="white"
              stroke-width="3.1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.span>
      </FilterDropDownBtn>
      <FilterDropDownWrapper
        animate={isOpen ? 'animate' : 'init'}
        variants={variants.fadInSlideUp}
        style={{ display: display }}
        ref={menuNode}
      >
        <DropdownContentWrapper>
          {props.options.map((option, index) => {
            return (
              <li
                key={`filter-review-option-${index}`}
                style={{ color: props.value == option ? color.hover : '' }}
                onClick={() => {
                  closeHandler();
                  props.setValue(option);
                }}
              >
                <span>{option}</span>
              </li>
            );
          })}
        </DropdownContentWrapper>
      </FilterDropDownWrapper>
    </FilterWrapper>
  );
};

const FilterWrapper = styled(motion.div)`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #e2e7ec;
  position: relative;
`;

const FilterDropDownBtn = styled(motion.button)`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 30px;
  padding: 0 15px;
  gap: 20px;
  background-color: ${color.btnPrimary};
  span {
    color: ${color.textPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const FilterDropDownWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  position: absolute;
  top: 75px;
  left: 0;
  z-index: 2;
`;

const DropdownContentWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  user-select: none;
  li {
    width: 100%;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: ${color.hover};
    }
  }
`;

export default Filters;
