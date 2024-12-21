import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { goToNextPage, goToPrevPage } from './helpers';

type Props = {
  currentPage: number;
  setCurrentPage: any;
  nPages: number;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  nPages,
}) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  return (
    <PaginationNav>
      <PaginationWrapper className="pagination justify-content-center">
        <li className="page-item">
          <div
            className="page-link"
            onClick={goToPrevPage(currentPage, setCurrentPage)}
          >
            <span>
              <img
                src="/icons/arrow_left_black.png"
                alt="pagination back button"
              />
            </span>
            <span>Назад</span>
          </div>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            onClick={() => setCurrentPage(pgNumber)}
            className={`page-item-numbers ${
              currentPage == pgNumber ? 'active' : ''
            } `}
          >
            <div className="page-link">
              <span>{pgNumber}</span>
            </div>
          </li>
        ))}
        <li className="page-item">
          <div
            className="page-link"
            onClick={goToNextPage(nPages, currentPage, setCurrentPage)}
          >
            <span>Вперед</span>
            <span>
              <img
                src="/icons/arrow_right_black.png"
                alt="pagination back button"
              />
            </span>
          </div>
        </li>
      </PaginationWrapper>
    </PaginationNav>
  );
};

const PaginationNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const PaginationWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  .active {
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    transition: 300ms;
  }
  .page-item-numbers {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    transition: 300ms;
    cursor: pointer;
  }
  .page-item {
    padding: 10px;
    cursor: pointer;
    transition: 300ms;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(1);
    }
    .page-link {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      span {
        display: flex;
        font-size: 1.2rem;
      }
    }
  }
`;

export default Pagination;
