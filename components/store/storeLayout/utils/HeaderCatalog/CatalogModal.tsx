import Link from 'next/link';
import styled from 'styled-components';
import { TGlobalState, TGlobalUIState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import TagsModal from './Tagsmodal';
import { handleMenuStateRedux } from '../../helpers';
import {
  changeCatelogDisplayState,
  changeCatelogState,
} from 'redux/slicers/store/globalUISlicer';
import { devices } from 'components/store/lib/Devices';
import { emptyLoading } from 'common/constants';
import { useEffect } from 'react';
import { fetchCategories, fetchTags } from 'redux/slicers/store/globalSlicer';
type Props = {
  setHoveredCategory;
};
const CatalogModal: React.FC<Props> = ({ setHoveredCategory }) => {
  const { categories, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
  const dispatch = useAppDispatch();
  const { isCatalogOpen, catelogDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, []);

  return (
    <CatalogContentWrapper>
      {!loading && categories.length !== 0
        ? categories.map((category, indexmain) => {
            return (
              <MainCatalogWrapper key={indexmain}>
                <div className="main-catagory">
                  <Link
                    onClick={handleMenuStateRedux(
                      dispatch,
                      changeCatelogState,
                      changeCatelogDisplayState,
                      isCatalogOpen,
                      catelogDisplay,
                    )}
                    href={`/catalog?categories=${category.url}`}
                    onMouseOver={() =>
                      setHoveredCategory(`/api/images/${category.image}`)
                    }
                    prefetch={false}
                  >
                    <span>{category.name}</span>
                  </Link>
                </div>
                <SubCategoriesWrapper>
                  {category.children?.map((subCategory, index) => {
                    return (
                      <SubCategoriesContainer key={index}>
                        <Link
                          onClick={handleMenuStateRedux(
                            dispatch,
                            changeCatelogState,
                            changeCatelogDisplayState,
                            isCatalogOpen,
                            catelogDisplay,
                          )}
                          href={`/catalog?categories=${category.url}&subCategories=${subCategory.url}`}
                          onMouseOver={() =>
                            setHoveredCategory(
                              `/api/images/${subCategory.image}`,
                            )
                          }
                          prefetch={false}
                        >
                          <span className="sub-category">
                            {subCategory.name}
                          </span>
                        </Link>
                        <TagsModal
                          category={category.url!}
                          subCategory={subCategory.url!}
                        />
                      </SubCategoriesContainer>
                    );
                  })}
                </SubCategoriesWrapper>
              </MainCatalogWrapper>
            );
          })
        : emptyLoading.map((item, index) => (
            <MainCatalogWrapper key={index}>
              <div className="main-catagory">
                <CatelogLoader style={{ width: '120px', height: '20px' }} />
              </div>
              <SubCategoriesWrapper>
                {emptyLoading.map((item, subIndex) => (
                  <SubCategoriesContainer key={subIndex}>
                    <CatelogLoader style={{ width: '120px', height: '15px' }} />
                  </SubCategoriesContainer>
                ))}
              </SubCategoriesWrapper>
            </MainCatalogWrapper>
          ))}
    </CatalogContentWrapper>
  );
};

const CatelogLoader = styled.div`
  border-radius: 3px;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

const CatalogContentWrapper = styled.div`
  width: 95%;
  height: 100%;
  padding: 30px 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  transition: 300ms;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const MainCatalogWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .main-catagory {
    width: 100%;
    padding: 0 0 15px 15px;
    margin: auto;
    border-bottom: none;
    background: linear-gradient(black, black) bottom no-repeat;
    background-size: 50% 1px;
    background-position: left;
    background-position-y: 45px;
    span {
      font-size: 1.5rem;
      transition: 200ms;
      font-family: var(--font-ricordi);
    }
  }
`;

const SubCategoriesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 0 0 15px 15px;
  @media ${devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.laptopL} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.laptopM} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.laptopS} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SubCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .sub-category {
    transition: 200ms;
    font-size: 1.1rem;
    font-weight: 500;
    font-family: var(--font-Circe);
  }
`;

export default CatalogModal;
