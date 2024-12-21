import variants from 'components/store/lib/variants';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FilterOption } from '../../../../ui-kit/FilterCheckbox/types';
import { Filter, FilterBody, FilterTitle } from '../common';
import color from 'components/store/lib/ui.colors';
type Props = {
  title: string;
  options?: FilterOption[];
  onChange: (selectedOption: FilterOption) => void;
};

const SingleSelectionFilter: React.FC<Props> = ({
  title,
  options,
  onChange,
}) => {
  const [stateOptions, setStateOptions] = useState(options);

  useEffect(() => {
    setStateOptions(options);
  }, [options]);

  const handleChange = (id: string) => () => {
    const options = [...stateOptions!];
    const activeOption = options?.find((option) => option.checked);

    if (activeOption) {
      activeOption!.checked = false;
    }

    const curOption = options?.find((option) => option.id === id);
    curOption!.checked = true;

    setStateOptions(options);
    onChange(curOption!);
  };

  return (
    <Filter>
      <FilterTitle
        custom={0.05}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.05 } }}
        variants={variants.fadInSlideUp}
      >
        {title}
      </FilterTitle>
      <FilterBody
        custom={0.1}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
        variants={variants.fadInSlideUp}
      >
        {stateOptions?.map((option) => (
          <Selection
            key={`filter-selection-${option.id}`}
            selected={!!option.checked}
            onClick={handleChange(option.id)}
          >
            <span>{option.name}</span>
          </Selection>
        ))}
      </FilterBody>
    </Filter>
  );
};

const Selection = styled.div<{
  selected: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  }
  ${(props) => {
    if (props.selected) {
      return css`
        box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
      `;
    }
  }}
  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 8px;
    font-size: 1rem;
    text-align: center;
    ${(props) => {
      if (props.selected) {
        return css`
          background: ${color.selected};
          color: ${color.btnPrimary};
          text-align: center;
        `;
      }
    }}
  }
`;

export default SingleSelectionFilter;
