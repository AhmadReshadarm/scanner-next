import FilterCheckbox from '../../../../ui-kit/FilterCheckbox';
import { FilterOption } from '../../../../ui-kit/FilterCheckbox/types';
import {
  Filter,
  FilterBody,
  FilterTitle,
  TopFilter,
  TopFilterBody,
  TopFilterTitle,
} from '../common';
import variants from '../../lib/variants';

type Props = {
  title: string;
  options?: FilterOption[];
  onChange: (selectedOptions: FilterOption[] | undefined) => void;
};

const MultipleSelectionFilter: React.FC<Props> = ({
  title,
  options,
  onChange,
}) => {
  const handleChange = (id: string) => (value: boolean) => {
    const curOption = options?.find((option) => option.id === id);
    curOption!.checked = value;
    const selectedOptions = options?.filter((option) => option.checked);

    onChange(selectedOptions);
  };

  return (
    <TopFilter>
      <TopFilterTitle
        custom={0.1}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
        variants={variants.fadInSlideUp}
      >
        {title}
      </TopFilterTitle>
      <TopFilterBody
        custom={0.2}
        initial="init"
        animate="animate"
        exit={{ y: -80, opacity: 0, transition: { delay: 0.2 } }}
        variants={variants.fadInSlideUp}
        style={{ alignItems: 'flex-start', justifyItems: 'flex-start' }}
        className="top-filter-body-special"
      >
        {options?.map((option) => (
          <FilterCheckbox
            style={{ marginBottom: '5px' }}
            key={`filter-checkbox-${option.id}`}
            label={option.name}
            checked={option.checked}
            onChange={handleChange(option.id)}
          />
        ))}
      </TopFilterBody>
    </TopFilter>
  );
};

export default MultipleSelectionFilter;
