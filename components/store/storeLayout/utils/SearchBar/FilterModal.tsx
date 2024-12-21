import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { CategoryInTree } from 'swagger/services';
import { PopupDisplay } from '../../constants';
import { handleMenuState } from '../../helpers';

type Props = {
  isOpened: boolean;
  display: string;
  setSelectedCategory: Dispatch<SetStateAction<CategoryInTree | undefined>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  menuNode: any;
  selectedCategory: CategoryInTree;
};

const FilterModal: React.FC<Props> = ({
  isOpened,
  display,
  setSelectedCategory,
  selectedCategory,
  setIsOpened,
  setDisplay,
  menuNode,
}) => {
  const { categories } = useAppSelector<TGlobalState>((state) => state.global);
  const handleSelect = (category: CategoryInTree) => () => {
    setSelectedCategory(category);
    setIsOpened(false);
    setTimeout(() => setDisplay(PopupDisplay.None), 150);
  };

  return (
    <PopupContainer style={{ display: display }}>
      <PopupWrapper>
        <Content
          initial="init"
          ref={menuNode}
          animate={isOpened ? 'animate' : 'exit'}
          custom={0.2}
          variants={variants.fadInSlideUp}
          id="filter-content"
        >
          <motion.button
            custom={1.1}
            whileTap="tap"
            whileHover="hover"
            variants={variants.grow}
            onClick={handleMenuState(setIsOpened, setDisplay)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="-1"
                x2="26.3541"
                y2="-1"
                transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="1"
                y1="-1"
                x2="26.3044"
                y2="-1"
                transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </motion.button>
          <h3>Искать в категории</h3>
          <ContentInner>
            {categories.map((category, index: any) => {
              return (
                <Selection key={index} onClick={handleSelect(category)}>
                  {/* <span className="catalog-icon">
                    <img
                      src={`/api/images/${category.image}`}
                      alt={category.name}
                    />
                  </span> */}

                  <span className="catalog-name">
                    {category.name?.toUpperCase()}
                  </span>
                </Selection>
              );
            })}
          </ContentInner>
        </Content>
      </PopupWrapper>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 8vh);
  top: 0;
  left: 0;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Content = styled(motion.div)`
  padding: 40px;
  background-color: ${color.textPrimary};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  gap: 20px;
  button {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media ${devices.laptopS} {
    padding: 15px;
    border-radius: 5px;
    button {
      top: -30px;
      right: 0;
    }
  }
  @media ${devices.mobileL} {
    padding: 15px;
    border-radius: 5px;
    button {
      top: -30px;
      right: 0;
    }
  }
  @media ${devices.mobileM} {
    padding: 15px;
    border-radius: 5px;
    button {
      top: -30px;
      right: 0;
    }
  }
  @media ${devices.mobileS} {
    padding: 15px;
    border-radius: 5px;
    button {
      top: -30px;
      right: 0;
    }
  }
`;

const ContentInner = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const Selection = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
  transition: 200ms;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  &:hover {
    box-shadow: 0px 3px 8px 0px ${color.boxShadowBtn};
  }
  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 8px;
    font-size: 1rem;
    background: ${color.selected};
    color: ${color.btnPrimary};
  }
  @media ${devices.laptopS} {
    span {
      font-size: 12px;
    }
  }
  @media ${devices.mobileL} {
    span {
      font-size: 12px;
    }
  }
  @media ${devices.mobileM} {
    span {
      font-size: 10px;
    }
  }
  @media ${devices.mobileS} {
    span {
      font-size: 8px;
    }
  }
`;

export default FilterModal;
