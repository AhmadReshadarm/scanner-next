import {
  clearQueryParams,
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import { FilterType, getFilters } from 'components/store/catalog/constants';
import ColorFilter from 'components/store/catalog/topFilters/ColorFilter';
import MultipleSelectionFilter from 'components/store/catalog/topFilters/MultipleSelectionFilter';
import RangeFilter from 'components/store/catalog/topFilters/RangeFilter';
import SingleSelectionFilter from 'components/store/catalog/topFilters/SingleSelectionFilter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, Color, PriceRange, Tag } from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { convertQueryParams, getFiltersConfig } from './helpers';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import { motion } from 'framer-motion';
import NameFilter from './topFilters/NameFilter';
import { useAppSelector } from 'redux/hooks';
import { TCatalogState } from 'redux/types';

type Props = {
  categories: Category[];
  subCategories: Category[];
  colors: Color[];
  tags: Tag[];
  priceRange: PriceRange;
  expanded: boolean;
  handleExpantionChange: any;
  setSelectedCategory: any;
  setCurrentPage: any;
  setPageSize: any;
  // setHasActiveFilters: any;
};

type StyleProps = {
  display: string;
};

const TopFilterBar: React.FC<Props> = ({
  categories,
  subCategories,
  colors,
  tags,
  priceRange,
  expanded,
  handleExpantionChange,
  setSelectedCategory,
  setCurrentPage,
  setPageSize,
  // setHasActiveFilters,
}) => {
  const router = useRouter();
  const filters = convertQueryParams(router.query);
  const [filtersConfig, setFiltersConfig] = useState(
    getFiltersConfig({
      categories,
      subCategories,
      colors,
      priceRange,
      filters,
      tags,
    }),
  );

  const [isMoreFilters, setMoreFilters] = useState(false);
  const [ActivateResetBtn, setActivateResetBtn] = useState(false);
  const [resetSlider, setResetSlider] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));
  const [sliderChanged, setSliderChanged] = useState(false);
  const handleResetFilters = () => {
    clearQueryParams();
  };

  const hanldeResetBtnClick = () => {
    setSearchTerm('');
    setSelectedCategory(undefined);
    setCurrentPage(1);
    setPageSize(12);
    handleResetFilters();
    setResetSlider(true);
    setActivateResetBtn(false);
    setSliderChanged(false);
  };

  useEffect(() => {
    const filters = convertQueryParams(getQueryParams(window.location.search));

    setFiltersConfig(
      getFiltersConfig({
        categories,
        subCategories,
        colors,
        priceRange,
        filters,
        tags,
      }),
    );
  }, [categories, subCategories, colors, priceRange, tags]);

  useEffect(() => {
    setLocalFilters(getFilters(filtersConfig));
  }, [filtersConfig]);

  useEffect(() => {
    searchTerm !== '' ? setActivateResetBtn(true) : setActivateResetBtn(false);
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      setPageSize(12);

      pushQueryParams([
        { name: 'name', value: searchTerm },
        { name: 'page', value: 1 },
      ]);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const queryParams = getQueryParams(window.location.search);
    const { name } = queryParams;
    if (!ActivateResetBtn && name !== undefined) {
      setSearchTerm(name);
    }
  }, []);

  // ---------------------- UI hooks ------------------------

  const [isHoverMobile, setIsHoverMobile] = useState(false);
  useEffect(() => {
    setIsHoverMobile(true);
    const timer = setTimeout(() => {
      setIsHoverMobile(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [
    ActivateResetBtn,
    subCategories.length !== 0,
    searchTerm,
    priceRange.maxPrice,
    priceRange.minPrice,
  ]);
  const { uiPriceRang } = useAppSelector<TCatalogState>(
    (state) => state.catalog,
  );
  // useEffect(() => {
  //   const child = document.querySelector('.selected-filter-child');

  //   function isInPage(node) {
  //     return node === document.body ? false : document.body.contains(node);
  //   }
  //   isInPage(child) ? setHasActiveFilters(true) : setActivateResetBtn(false);
  // });

  return (
    <FilterBarContent expanded={expanded}>
      <div className="mobile-background"></div>
      <FiltersWrapper
        expanded={expanded}
        animate={{ height: isMoreFilters ? 'unset' : '0px' }}
      >
        <div
          style={{
            justifyContent:
              subCategories.length !== 0 || ActivateResetBtn
                ? 'space-between'
                : 'flex-end',
          }}
          className="mobile-filter-action-buttons"
        >
          <span
            style={{
              display:
                subCategories.length !== 0 || ActivateResetBtn
                  ? 'flex'
                  : 'none',
            }}
            className="clear-filter-mobile"
            onClick={hanldeResetBtnClick}
          >
            Сбросить
          </span>
          <span
            className={`save-and-close-btn-mobile ${
              isHoverMobile ? 'save-and-close-btn-mobile-animation' : ''
            }`}
            onClick={() => {
              setMoreFilters(!isMoreFilters);
              handleExpantionChange();
            }}
            onMouseOver={() => setIsHoverMobile(true)}
            onMouseLeave={() => setIsHoverMobile(false)}
          >
            <span>Сохранить и закрыть</span>
            {isHoverMobile ? (
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
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <line
                  x1="1"
                  y1="-1"
                  x2="26.3044"
                  y2="-1"
                  transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            ) : (
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
            )}
          </span>
        </div>
        {localFilters.map(
          (filter, key) =>
            (filter.type === FilterType.SINGLE_SELECTION &&
              !!filter.options?.length &&
              isMoreFilters && (
                <SearchAndCategoryWrapper>
                  {filter.title === 'Выберите категории' ? (
                    <NameFilter
                      title="Напишите название товара"
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      setSliderChanged={setSliderChanged}
                    />
                  ) : (
                    ''
                  )}

                  <SingleSelectionFilter
                    key={`filter-${key}`}
                    title={filter.title}
                    options={filter.options}
                    setSelectedCategory={setSelectedCategory}
                    setSliderChanged={setSliderChanged}
                    onChange={
                      filter.onChange as (selectedOptions: FilterOption) => void
                    }
                  />
                </SearchAndCategoryWrapper>
              )) ||
            (filter.type === FilterType.MULTIPLE_SELECTION &&
              !!filter.options?.length &&
              isMoreFilters && (
                <MultipleSelectionFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  options={filter.options}
                  onChange={
                    filter.onChange as (
                      selectedOptions: FilterOption[] | undefined,
                    ) => void
                  }
                />
              )) ||
            (filter.type === FilterType.COLOR &&
              !!filter.options?.length &&
              isMoreFilters && (
                <ColorFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  options={filter.options}
                  onChange={
                    filter.onChange as (
                      selectedOptions: FilterOption[] | undefined,
                    ) => void
                  }
                />
              )) ||
            (filter.type === FilterType.RANGE &&
              !!filter.min &&
              !!filter.max &&
              isMoreFilters && (
                <RangeFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  min={filter.min!}
                  max={filter.max!}
                  onChange={
                    filter.onChange as (values: [number, number]) => void
                  }
                  setActivateResetBtn={setActivateResetBtn}
                  setResetSlider={setResetSlider}
                  resetSlider={resetSlider}
                  sliderChanged={sliderChanged}
                  setSliderChanged={setSliderChanged}
                />
              )),
        )}
      </FiltersWrapper>
      <ActionButtonsWrapper>
        <MoreFiltersButton
          onClick={() => {
            setMoreFilters(!isMoreFilters);
            handleExpantionChange();
          }}
          style={{
            color: isMoreFilters ? color.textPrimary : color.textSecondary,
            backgroundColor: isMoreFilters
              ? color.textSecondary
              : color.textPrimary,
          }}
        >
          <span style={{ fontWeight: '500', fontFamily: 'Circe' }}>
            {isMoreFilters ? 'Закрыть категории' : 'Открытые категории'}
          </span>
          <span className="more-filter-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0003 15.9999H20.0003C20.3539 15.9999 20.6931 15.8594 20.9431 15.6094C21.1932 15.3593 21.3337 15.0202 21.3337 14.6666V6.66659C21.3337 6.31296 21.1932 5.97382 20.9431 5.72378C20.6931 5.47373 20.3539 5.33325 20.0003 5.33325H12.0003C11.6467 5.33325 11.3076 5.47373 11.0575 5.72378C10.8075 5.97382 10.667 6.31296 10.667 6.66659V14.6666C10.667 15.0202 10.8075 15.3593 11.0575 15.6094C11.3076 15.8594 11.6467 15.9999 12.0003 15.9999ZM13.3337 7.99992H18.667V13.3333H13.3337V7.99992ZM28.0003 13.3333H25.3337C24.98 13.3333 24.6409 13.4737 24.3909 13.7238C24.1408 13.9738 24.0003 14.313 24.0003 14.6666C24.0003 15.0202 24.1408 15.3593 24.3909 15.6094C24.6409 15.8594 24.98 15.9999 25.3337 15.9999H28.0003C28.3539 15.9999 28.6931 15.8594 28.9431 15.6094C29.1932 15.3593 29.3337 15.0202 29.3337 14.6666C29.3337 14.313 29.1932 13.9738 28.9431 13.7238C28.6931 13.4737 28.3539 13.3333 28.0003 13.3333ZM25.3337 10.6666H28.0003C28.3539 10.6666 28.6931 10.5261 28.9431 10.2761C29.1932 10.026 29.3337 9.68687 29.3337 9.33325C29.3337 8.97963 29.1932 8.64049 28.9431 8.39044C28.6931 8.14039 28.3539 7.99992 28.0003 7.99992H25.3337C24.98 7.99992 24.6409 8.14039 24.3909 8.39044C24.1408 8.64049 24.0003 8.97963 24.0003 9.33325C24.0003 9.68687 24.1408 10.026 24.3909 10.2761C24.6409 10.5261 24.98 10.6666 25.3337 10.6666ZM4.00033 10.6666H6.66699C7.02061 10.6666 7.35975 10.5261 7.6098 10.2761C7.85985 10.026 8.00033 9.68687 8.00033 9.33325C8.00033 8.97963 7.85985 8.64049 7.6098 8.39044C7.35975 8.14039 7.02061 7.99992 6.66699 7.99992H4.00033C3.6467 7.99992 3.30756 8.14039 3.05752 8.39044C2.80747 8.64049 2.66699 8.97963 2.66699 9.33325C2.66699 9.68687 2.80747 10.026 3.05752 10.2761C3.30756 10.5261 3.6467 10.6666 4.00033 10.6666ZM4.00033 15.9999H6.66699C7.02061 15.9999 7.35975 15.8594 7.6098 15.6094C7.85985 15.3593 8.00033 15.0202 8.00033 14.6666C8.00033 14.313 7.85985 13.9738 7.6098 13.7238C7.35975 13.4737 7.02061 13.3333 6.66699 13.3333H4.00033C3.6467 13.3333 3.30756 13.4737 3.05752 13.7238C2.80747 13.9738 2.66699 14.313 2.66699 14.6666C2.66699 15.0202 2.80747 15.3593 3.05752 15.6094C3.30756 15.8594 3.6467 15.9999 4.00033 15.9999ZM28.0003 18.6666H4.00033C3.6467 18.6666 3.30756 18.8071 3.05752 19.0571C2.80747 19.3072 2.66699 19.6463 2.66699 19.9999C2.66699 20.3535 2.80747 20.6927 3.05752 20.9427C3.30756 21.1928 3.6467 21.3333 4.00033 21.3333H28.0003C28.3539 21.3333 28.6931 21.1928 28.9431 20.9427C29.1932 20.6927 29.3337 20.3535 29.3337 19.9999C29.3337 19.6463 29.1932 19.3072 28.9431 19.0571C28.6931 18.8071 28.3539 18.6666 28.0003 18.6666ZM17.3337 23.9999H4.00033C3.6467 23.9999 3.30756 24.1404 3.05752 24.3904C2.80747 24.6405 2.66699 24.9796 2.66699 25.3333C2.66699 25.6869 2.80747 26.026 3.05752 26.2761C3.30756 26.5261 3.6467 26.6666 4.00033 26.6666H17.3337C17.6873 26.6666 18.0264 26.5261 18.2765 26.2761C18.5265 26.026 18.667 25.6869 18.667 25.3333C18.667 24.9796 18.5265 24.6405 18.2765 24.3904C18.0264 24.1404 17.6873 23.9999 17.3337 23.9999Z"
                fill={isMoreFilters ? 'white' : 'black'}
              />
            </svg>
          </span>
        </MoreFiltersButton>
        <ResetButton
          onClick={hanldeResetBtnClick}
          display={
            (subCategories.length !== 0 || ActivateResetBtn) && isMoreFilters
              ? 'flex'
              : 'none'
          }
        >
          <span>Сбросить фильтры</span>
        </ResetButton>
      </ActionButtonsWrapper>
      <SelectedFiltersWrapper className="selected-parent">
        {/* ----------------------------------------- seleceted Filters start ------------------------------------------- */}

        {localFilters.map((selectedFilter, indexSelectedFilter) => {
          switch (selectedFilter.title) {
            case 'Выберите цвет':
              return (
                <>
                  {selectedFilter.options!.map((selectedColor, index) => {
                    return (
                      <>
                        {selectedColor.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedColor.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <div className="selected-color-warpper">
                              <span>Цвет</span>
                              <div
                                style={{
                                  backgroundColor: `${selectedColor.color}`,
                                }}
                                className="selected-color-indecator"
                              ></div>
                            </div>

                            <span
                              onClick={() => {
                                const curOption = selectedFilter.options?.find(
                                  (option) => option.id === selectedColor.id,
                                );
                                curOption!.checked = false;

                                const selectedOptions: any =
                                  selectedFilter.options?.filter(
                                    (option) => option.checked,
                                  );

                                selectedFilter.onChange(selectedOptions);
                              }}
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
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Выберите тип товара':
              return (
                <>
                  {selectedFilter.options!.map((selectedType, index) => {
                    return (
                      <>
                        {selectedType.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedType.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <span>{selectedType.name}</span>
                            <span
                              onClick={() => {
                                const curOption = selectedFilter.options?.find(
                                  (option) => option.id === selectedType.id,
                                );
                                curOption!.checked = false;

                                const selectedOptions: any =
                                  selectedFilter.options?.filter(
                                    (option) => option.checked,
                                  );

                                selectedFilter.onChange(selectedOptions);
                              }}
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
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Выберите категории':
              return (
                <>
                  {selectedFilter.options!.map((selectedCategory, index) => {
                    return (
                      <>
                        {selectedCategory.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedCategory.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <span>{selectedCategory.name}</span>
                            <span
                              onClick={() => {
                                const curOption: any =
                                  selectedFilter.options?.find(
                                    (option) =>
                                      option.id === selectedCategory.id,
                                  );
                                curOption!.checked = false;
                                curOption.url = '';
                                selectedFilter.onChange(curOption);
                                setResetSlider(true);
                                setSliderChanged(false);
                                setSelectedCategory(undefined);
                              }}
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
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Выберите подкатегорию':
              return (
                <>
                  {selectedFilter.options!.map((selectedSubCategory, index) => {
                    return (
                      <>
                        {selectedSubCategory.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedSubCategory.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <span>{selectedSubCategory.name}</span>
                            <span
                              onClick={() => {
                                const curOption: any =
                                  selectedFilter.options?.find(
                                    (option) =>
                                      option.id === selectedSubCategory.id,
                                  );
                                curOption!.checked = false;
                                curOption.url = '';
                                selectedFilter.onChange(curOption);
                                setResetSlider(true);
                                setSliderChanged(false);
                                // set header to parent category on filter close
                                localFilters.map((filter) => {
                                  if (filter.title == 'Выберите категории') {
                                    const curOptionChecked =
                                      filter.options?.find(
                                        (option) => option.checked,
                                      );
                                    setSelectedCategory(curOptionChecked);
                                  }
                                });
                              }}
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
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Установить ценовой диапозон':
              return (
                <>
                  {sliderChanged ? (
                    <SelectedFiltersButtons
                      key={`${selectedFilter.min}-${selectedFilter.max}`}
                      className="selected-filter-child"
                    >
                      <span>
                        От ${uiPriceRang.minPrice} ₽ до ${uiPriceRang.maxPrice}{' '}
                        ₽
                      </span>
                      <span
                        onClick={() => {
                          setResetSlider(true);
                          setSliderChanged(false);
                          const values: any = [null, null];
                          selectedFilter.onChange(values);
                        }}
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
                      </span>
                    </SelectedFiltersButtons>
                  ) : (
                    ''
                  )}
                </>
              );
            default:
              break;
          }
        })}

        {/* ------------------------------------ end of selected filters -------------------------------------- */}
      </SelectedFiltersWrapper>
    </FilterBarContent>
  );
};

const SearchAndCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const FilterBarContent = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 10px 20px;
  background-color: #f3f2f0;
  border-radius: 30px;
  @media ${devices.laptopS} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }
  @media ${devices.tabletL} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }

  @media ${devices.tabletS} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }
  @media ${devices.mobileL} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }

  @media ${devices.mobileM} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }

  @media ${devices.mobileS} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }
`;

const SelectedFiltersWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 30px;
  padding: 40px 10px 0 10px;
  justify-items: flex-start;
  @media ${devices.desktop} {
    grid-template-columns: repeat(5, 1fr);
    width: 70%;
  }
  @media ${devices.laptopL} {
    grid-template-columns: repeat(4, 1fr);
    width: 70%;
  }
  @media ${devices.laptopM} {
    grid-template-columns: repeat(3, 1fr);
     width: 60%;
  }
  @media ${devices.laptopS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.tabletL} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
   15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.tabletS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
   15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.mobileL} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
   15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.mobileM} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.mobileS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    15px 20px 0 20px;
    gap: 20px;
  }
`;

const SelectedFiltersButtons = styled.button`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid #c1ab93;
  background-color: #e8d9ca;
  transition: 150ms;
  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 8px;
    font-size: 1rem;
    text-align: center;
    white-space: nowrap;
    color: #000;
  }
  .selected-color-warpper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .selected-color-indecator {
      width: 25px;
      height: 25px;
      min-width: 25px;
      min-height: 25px;
      border-radius: 50%;
      border: 1px solid #00000052;
    }
  }
`;

const FiltersWrapper = styled<any>(motion.div)`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 50px;
  row-gap: 30px;
  padding: 10px;
  justify-items: center;

  .mobile-filter-action-buttons {
    display: none;
    width: 100%;
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    padding: 20px 0px;
    background-color: #fff;
    z-index: 10;
    span {
      cursor: pointer;
    }
    .clear-filter-mobile {
      border: 1px solid #00000047;
      padding: 5px 15px;
      border-radius: 50px;
    }
    .save-and-close-btn-mobile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border: 1px solid #00000047;
      padding: 5px 15px;
      border-radius: 50px;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        width: 0;
        height: 100%;
        top: 0;
        right: 0;
        z-index: -1;
        background-color: #000;
        border-radius: 50px;
        transition: all 0.3s ease;
      }
    }

    .save-and-close-btn-mobile-animation {
      color: #fff;
      &:before {
        left: 0;
        width: 100%;
      }
    }
  }
  @media ${devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.laptopM} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.laptopS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
      .clear-filter-mobile {
        font-size: 1.5rem;
        font-weight: 500;
      }
      .save-and-close-btn-mobile {
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
  }
  @media ${devices.tabletL} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
      .clear-filter-mobile {
        font-size: 1.2rem;
      }
      .save-and-close-btn-mobile {
        font-size: 1.2rem;
      }
    }
  }
  @media ${devices.tabletS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
      .clear-filter-mobile {
        font-size: 14px;
      }
      .save-and-close-btn-mobile {
        font-size: 14px;
      }
    }
  }
  @media ${devices.mobileL} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
      .clear-filter-mobile {
        font-size: 12px;
      }
      .save-and-close-btn-mobile {
        font-size: 12px;
      }
    }
  }
  @media ${devices.mobileM} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};

    .mobile-filter-action-buttons {
      display: flex;
      .clear-filter-mobile {
        font-size: 9px;
      }
      .save-and-close-btn-mobile {
        font-size: 9px;
      }
    }
  }
  @media ${devices.mobileS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
      .clear-filter-mobile {
        font-size: 9px;
      }
      .save-and-close-btn-mobile {
        font-size: 9px;
      }
    }
  }
`;

const ActionButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  @media ${devices.tabletS} {
    flex-direction: column;
    align-items: flex-end;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-end;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    align-items: flex-end;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const MoreFiltersButton = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  gap: 20px;
  border: 1px solid #949494;
  cursor: pointer;
  transition: 300ms;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
  .more-filter-icon {
    width: 30px;
    height: 30px;
  }
`;

const ResetButton = styled.button`
  width: 200px;
  height: 40px;
  display: ${(p: StyleProps) => p.display};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  gap: 20px;
  border: 1px solid #949494;
  cursor: pointer;
  transition: 150ms;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
  .more-filter-icon {
    width: 30px;
    height: 30px;
  }
  @media ${devices.laptopS} {
    display: none;
  }
  @media ${devices.tabletL} {
    display: none;
  }
  @media ${devices.tabletS} {
    display: none;
  }
  @media ${devices.mobileL} {
    display: none;
  }
  @media ${devices.mobileM} {
    display: none;
  }
  @media ${devices.mobileS} {
    display: none;
  }
`;

export default TopFilterBar;
