// import { Input, Slider as SliderInit } from 'antd';
import SliderInit from 'antd/es/slider';
import Input from 'antd/es/input';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { TopFilter, TopFilterBody, TopFilterTitle } from '../common';
import debounce from 'lodash/debounce';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCatalogState } from 'redux/types';
import { setUIPriceRange } from 'redux/slicers/store/catalogSlicer';

type Props = {
  title: string;
  min: number;
  max: number;
  onChange: (values: [number, number]) => void;
  setActivateResetBtn: any;
  setResetSlider: any;
  resetSlider: boolean;
  sliderChanged: boolean;
  setSliderChanged: any;
};

const RangeFilter: React.FC<Props> = ({
  title,
  min,
  max,
  onChange,
  setActivateResetBtn,
  setResetSlider,
  resetSlider,
  sliderChanged,
  setSliderChanged,
}) => {
  const dispatch = useAppDispatch();
  const { uiPriceRang } = useAppSelector<TCatalogState>(
    (state) => state.catalog,
  );

  const Slider = SliderInit as any;

  useEffect(() => {
    if (!sliderChanged) {
      dispatch(setUIPriceRange({ minPrice: min, maxPrice: max }));
    }
  }, [min, max]);

  const handleSliderChange = (values: [number, number]) => {
    setActivateResetBtn(true);
    setResetSlider(false);
    delayedChange(values);
    dispatch(setUIPriceRange({ minPrice: values[0], maxPrice: values[1] }));
    setSliderChanged(true);
  };

  const handleMinValChange = (e) => {
    setActivateResetBtn(true);
    setResetSlider(false);
    delayedChange([e.target.value, uiPriceRang.maxPrice]);
    dispatch(
      setUIPriceRange({
        minPrice: e.target.value,
        maxPrice: uiPriceRang.maxPrice,
      }),
    );
    setSliderChanged(true);
  };

  const handleMaxValChange = (e) => {
    setActivateResetBtn(true);
    setResetSlider(false);
    delayedChange([uiPriceRang.minPrice, e.target.value]);
    dispatch(
      setUIPriceRange({
        minPrice: uiPriceRang.minPrice,
        maxPrice: e.target.value,
      }),
    );
    setSliderChanged(true);
  };

  const delayedChange = useCallback(
    debounce((values) => onChange(values), 500),
    [],
  );
  useEffect(() => {
    if (resetSlider) {
      dispatch(setUIPriceRange({ minPrice: min, maxPrice: max }));
    }
  }, [resetSlider]);

  return (
    <TopFilter>
      <TopFilterTitle
        custom={0.3}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.3 } }}
        variants={variants.fadInSlideUp}
      >
        {title}
      </TopFilterTitle>
      <TopFilterBody
        custom={0.4}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.4 } }}
        variants={variants.fadInSlideUp}
        style={{ display: 'block', minWidth: '250px', maxWidth: '350px' }}
      >
        <FieldsWrapper>
          <div className="fields-wrapper">
            <span className="field-label">От</span>
            <Input
              title="Мин. цена"
              placeholder="Установить мин., макс. цену"
              min={min}
              max={max}
              // value={minVal}
              value={uiPriceRang.minPrice}
              suffix={<Suffix>₽</Suffix>}
              style={{
                maxWidth: '95px',
                borderRadius: '30px',
                backgroundColor: '#E9E9E9',
              }}
              onChange={handleMinValChange}
            />
          </div>
          <div className="fields-wrapper">
            <span className="field-label">До</span>
            <Input
              title="Макс. цена"
              placeholder="Установить мин., макс. цену"
              min={min}
              max={max}
              // value={maxVal}
              value={uiPriceRang.maxPrice}
              suffix={<Suffix>₽</Suffix>}
              style={{
                maxWidth: '95px',
                borderRadius: '30px',
                backgroundColor: '#E9E9E9',
              }}
              onChange={handleMaxValChange}
            />
          </div>
        </FieldsWrapper>
        <SliderWrapper>
          <Slider
            range
            step={1}
            min={min}
            max={max}
            handleStyle={{
              borderColor: color.textTertiary,
            }}
            trackStyle={{
              background:
                'linear-gradient(94deg, #c6986a 9.58%, #f2d099  106.37%)',
              height: '5px',
              marginTop: '1px',
            }}
            railStyle={{
              backgroundColor: color.textTertiary,
              height: '5px',
            }}
            defaultValue={[min, max]}
            onChange={handleSliderChange}
            // value={[minVal, maxVal]}
            value={[uiPriceRang.minPrice, uiPriceRang.maxPrice]}
          />
        </SliderWrapper>
      </TopFilterBody>
    </TopFilter>
  );
};

const SliderWrapper = styled.div`
  margin-top: 20px;
  width: 90%;
  .ant-slider-rail {
    height: 2px;
    margin-top: 1px;
  }
  .ant-slider {
    .ant-slider-handle {
      &::after {
        box-shadow: 0 0 0 4px ${color.backgroundSecondery};
      }
    }
  }

  @media ${devices.mobileM} {
    max-width: 60vw;
  }
  @media ${devices.mobileS} {
    max-width: 60vw;
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .ant-input-affix-wrapper {
    &:hover {
      border-color: ${color.activeIcons};
    }
    &:focus {
      border-color: ${color.activeIcons};
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: ${color.activeIcons};
  }
  .fields-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 5px 5px 5px 10px;
    border-radius: 30px;
    box-shadow: 3px 13px 25px 0px #00000026;
    border: 1px solid #c9c9c9;
    input {
      background-color: #e9e9e9;
    }
    .field-label {
      font-size: 14px;
    }
  }
  @media ${devices.laptopS} {
    justify-content: flex-start;
  }
  @media ${devices.tabletL} {
    justify-content: flex-start;
  }
  @media ${devices.tabletS} {
    justify-content: flex-start;
  }
  @media ${devices.mobileL} {
    justify-content: flex-start;
  }
  @media ${devices.mobileM} {
    justify-content: flex-start;
    flex-direction: column;
    .fields-wrapper {
      max-width: 60vw;
    }
  }
  @media ${devices.mobileS} {
    justify-content: flex-start;
    flex-direction: column;
    .fields-wrapper {
      max-width: 60vw;
    }
  }
`;

const Suffix = styled.div`
  font-size: 14px;
`;

export default RangeFilter;
