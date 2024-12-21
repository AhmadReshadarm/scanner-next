// import { Input, Slider as SliderInit } from 'antd';
import SliderInit from 'antd/es/slider';
import Input from 'antd/es/input';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Filter, FilterBody, FilterTitle } from '../common';
import debounce from 'lodash/debounce';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';

type Props = {
  title: string;
  min: number;
  max: number;
  onChange: (values: [number, number]) => void;
};

const RangeFilter: React.FC<Props> = ({ title, min, max, onChange }) => {
  const [[minVal, maxVal], setValues] = useState([min, max]);
  const Slider = SliderInit as any;

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  const handleSliderChange = (values: [number, number]) => {
    setValues(values);
    delayedChange(values);
  };

  const handleMinValChange = (e) => {
    setValues([e.target.value, maxVal]);
    delayedChange([e.target.value, maxVal]);
  };

  const handleMaxValChange = (e) => {
    setValues([minVal, e.target.value]);
    delayedChange([minVal, e.target.value]);
  };

  const delayedChange = useCallback(
    debounce((values) => onChange(values), 500),
    [],
  );

  return (
    <Filter>
      <FilterTitle
        custom={0.3}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.3 } }}
        variants={variants.fadInSlideUp}
      >
        {title}
      </FilterTitle>
      <FilterBody
        custom={0.4}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.4 } }}
        variants={variants.fadInSlideUp}
        style={{ display: 'block' }}
      >
        <FieldsWrapper>
          <div className="fields-wrapper">
            <span className="field-label">От</span>
            <Input
              min={min}
              max={max}
              value={minVal}
              suffix={<Suffix>₽</Suffix>}
              style={{
                maxWidth: '95px',
                marginRight: '50px',
                borderRadius: '4px',
                backgroundColor: color.rangeBgcolor,
              }}
              onChange={handleMinValChange}
            />
          </div>
          <div className="fields-wrapper">
            <span className="field-label">До</span>
            <Input
              min={min}
              max={max}
              value={maxVal}
              suffix={<Suffix>₽</Suffix>}
              style={{
                maxWidth: '95px',
                borderRadius: '4px',
                backgroundColor: color.rangeBgcolor,
              }}
              onChange={handleMaxValChange}
            />
          </div>
        </FieldsWrapper>
        <SliderWrapper>
          <Slider
            range
            step={10}
            min={min}
            max={max}
            handleStyle={{
              // backgroundColor: color.textTertiary,
              borderColor: color.textTertiary,
            }}
            trackStyle={{
              background:
                'linear-gradient(90deg, #769A48 -17.97%, #C5D083 47.26%, #8BA46C 113.87%)',
              height: '5px',
              marginTop: '1px',
            }}
            railStyle={{
              backgroundColor: color.textTertiary,
              height: '5px',
            }}
            defaultValue={[min, max]}
            onChange={handleSliderChange}
            value={[minVal, maxVal]}
          />
        </SliderWrapper>
      </FilterBody>
    </Filter>
  );
};

const SliderWrapper = styled.div`
  margin-top: 20px;

  .ant-slider-rail {
    height: 2px;
    margin-top: 1px;
  }
  .ant-slider {
    .ant-slider-handle {
      &::after {
        box-shadow: 0 0 0 4px #737678;
      }
    }
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .ant-input-affix-wrapper {
    &:hover {
      border-color: ${color.hoverBtnBg};
    }
    &:focus {
      border-color: ${color.hoverBtnBg};
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: ${color.hoverBtnBg};
  }
  .fields-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    input {
      background-color: ${color.rangeBgcolor};
    }
    .field-label {
      font-size: 14px;
    }
  }
`;

const Suffix = styled.div`
  font-size: 14px;
`;

export default RangeFilter;
