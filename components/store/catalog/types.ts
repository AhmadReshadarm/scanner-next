import { TFilters } from 'redux/types';
import {
  // Brand,
  Category,
  Color,
  PriceRange,
  // Size,
  Tag,
} from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { FilterType } from './constants';

export type Filter = {
  title: string;
  type: FilterType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  onChange: (
    selectedOptions: (FilterOption[] | undefined) &
      FilterOption &
      [number, number],
  ) => void;
};

export type TFiltersConfig = {
  categories: Category[];
  subCategories: Category[];
  // brands: Brand[];
  colors: Color[];
  tags: Tag[];
  priceRange: PriceRange;
  filters: TFilters;
};
