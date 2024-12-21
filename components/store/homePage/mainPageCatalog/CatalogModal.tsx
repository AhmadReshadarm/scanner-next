import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import InfoDropdown from './DropDownsParrent';
import { CategoryInTree } from 'swagger/services';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';
import TagsModal from 'components/store/storeLayout/utils/HeaderCatalog/Tagsmodal';

type Props = {
  categories: CategoryInTree[];
  setIndex: any;
  stateIndex: number;
  paginateImage: any;
};
const CatalogModal: React.FC<Props> = ({
  categories,
  setIndex,
  stateIndex,
  paginateImage,
}) => {
  return (
    <InfoContainer
      key="info-product-page"
      custom={0.3}
      initial="init"
      whileInView="animate"
      exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      {categories.map((category, index) => {
        return (
          <InfoDropdown
            paginateImage={paginateImage}
            setIndex={setIndex}
            index={index}
            stateIndex={stateIndex}
            key={`${category.url}${index}`}
            title={category.name!}
          >
            <div className="dropdown-content">
              <div className="dropdown-text">
                <SubCategoriesWrapper>
                  {category.children?.map((subCategory, index) => {
                    return (
                      <SubCategoriesContainer key={index}>
                        <Link
                          // onClick={handleMenuStateRedux(
                          //   dispatch,
                          //   changeCatelogState,
                          //   changeCatelogDisplayState,
                          //   isCatalogOpen,
                          //   catelogDisplay,
                          // )}
                          href={`/catalog?categories=${category.url}&subCategories=${subCategory.url}`}
                          // onMouseOver={() =>
                          //   setHoveredCategory(`/api/images/${subCategory.image}`)
                          // }
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
              </div>
              <div className="button-wrapper">
                <Link
                  href={`/catalog?categories=${category.url!}`}
                  prefetch={false}
                >
                  <button>
                    <span>ПЕРЕЙТИ К {category.name?.toLocaleUpperCase()}</span>
                  </button>
                </Link>
              </div>
            </div>
          </InfoDropdown>
        );
      })}
    </InfoContainer>
  );
};

export const InfoContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-itmes: center;
  border-radius: 15px;
  overflow: hidden;
  user-select: none;
  .dropdown-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 40px;
    .dropdown-text {
      width: 100%;
      padding: 30px 0 0 80px;
      text-align: left;
    }
    .button-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      a {
        padding: 15px 20px;
        border-radius: 60px;
        background-color: #000000;
        transition: 150ms;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: 1px solid #000;
        &:hover {
          background-color: ${color.backgroundPrimary};

          button {
            span {
              color: #000;
            }
          }
        }
        &:active {
          transform: scale(1);
        }
        button {
          cursor: pointer;
          span {
            font-family: ver(--font-Jost);
            font-size: 1rem;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
  @media ${devices.tabletS} {
    .dropdown-content {
      .dropdown-text {
        padding: 0;
      }
      .button-wrapper {
        a {
          button {
            span {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
  @media ${devices.mobileL} {
    .dropdown-content {
      .dropdown-text {
        padding: 0;
      }
      .button-wrapper {
        a {
          button {
            span {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
  @media ${devices.mobileM} {
    .dropdown-content {
      .dropdown-text {
        padding: 0;
      }
      .button-wrapper {
        a {
          button {
            span {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
  @media ${devices.mobileS} {
    .dropdown-content {
      .dropdown-text {
        padding: 0;
      }
      .button-wrapper {
        a {
          button {
            span {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
`;

const SubCategoriesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 0 0 15px 15px;
  @media ${devices.desktop} {
    grid-template-columns: repeat(2, 1fr);
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
  @media ${devices.tabletL} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.tabletS} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.mobileM} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.mobileS} {
    grid-template-columns: repeat(1, 1fr);
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
    font-size: 1rem;
    font-weight: 500;
    font-family: var(--font-Circe);
  }
`;

export default CatalogModal;
