import styled from 'styled-components';
import { TopFilter, TopFilterBody, TopFilterTitle } from '../common';
import { pushQueryParams } from 'common/helpers/manageQueryParams.helper';
type Props = {
  title: string;
  searchTerm: string;
  setSearchTerm: any;
  setSliderChanged: any;
};

const NameFilter: React.FC<Props> = ({
  title,
  searchTerm,
  setSearchTerm,
  setSliderChanged,
}) => {
  return (
    <TopFilter>
      <TopFilterTitle>{title}</TopFilterTitle>

      <TopFilterBody style={{ gridTemplateColumns: '1fr' }}>
        <SearchWrapper>
          <SearchInput
            value={searchTerm}
            onChange={(evt) => {
              setSearchTerm(evt.target.value);
              setSliderChanged(false);
            }}
            placeholder="Введите ключевые слова"
            type="input"
          />
          {searchTerm !== '' ? (
            <span
              onClick={() => {
                setSearchTerm('');
                pushQueryParams([{ name: 'name', value: undefined }]);
              }}
              className="search-term-clear-btn"
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
          ) : (
            ''
          )}
        </SearchWrapper>
      </TopFilterBody>
    </TopFilter>
  );
};

const SearchWrapper = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #949494;
  border-radius: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .search-term-clear-btn {
    position: absolute;
    top: 15px;
    right: 5px;
    width: 25px;
    height: 25px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: none;
  background-color: transparent;
  font-size: 16px;
`;

export default NameFilter;
