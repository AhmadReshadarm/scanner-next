import { pushQueryParams } from 'common/helpers/manageQueryParams.helper';
import {
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';
import { TCatalogState } from 'redux/types';
import styled from 'styled-components';
import { Category, Product } from 'swagger/services';
import SEOstatic from 'components/store/SEO/SEOstatic';
// import { Pagination } from 'antd';
import Pagination from 'antd/es/pagination';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const TopFilterBar = dynamic(
  () => import('components/store/catalog/TopFilterBar'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);
const ProductGrid = dynamic(() => import('ui-kit/products/productGrid'), {
  ssr: false,
  loading: () => <LoaderMask />,
});

const queryStringToObject = (url) =>
  Object.fromEntries([...new URLSearchParams(url.split('?')[1])]);

export const getServerSideProps = (async (context) => {
  const query = context.resolvedUrl;

  const queryObj = {
    categories:
      queryStringToObject(query).categories == undefined
        ? null
        : queryStringToObject(query).categories,
    subCategories:
      queryStringToObject(query).subCategories == undefined
        ? null
        : queryStringToObject(query).subCategories,
  };

  const url = `${process.env.API_URL}/products?${
    queryObj.categories ? 'parent=' + queryObj.categories : ''
  }${
    queryObj.subCategories
      ? queryObj.categories
        ? '&categories[]=' + queryObj.subCategories
        : 'categories[]=' + queryObj.subCategories
      : ''
  }`;

  // Fetch data from external API
  try {
    const res = await fetch(url);
    const repo = await res.json();
    const randomProduct = Math.floor(Math.random() * repo.rows?.length);
    // Pass data to the page via props
    return {
      props: {
        repo: repo.rows,
        randomProduct,
      },
    };
  } catch (error) {
    return {
      props: {
        repo: [],
        randomProduct: 0,
      },
    };
  }
}) as GetServerSideProps<{ repo: Product[]; randomProduct: number }>;

const CatalogPage = ({
  repo,
  randomProduct,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  const {
    // products,
    categories,
    subCategories,
    colors,
    tags,
    priceRange,
    // loading,
  } = useAppSelector<TCatalogState>((state) => state.catalog);

  const handleLocationChange = onLocationChange(dispatch);
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    localStorage.removeItem('location');
    window.addEventListener('locationChange', () => {
      handleLocationChange();
    });
    setPriceRange(dispatch);

    (async () => {
      if (firstLoad) {
        await dispatch(fetchParentCategories());
        await handleLocationChange();
        setFirstLoad(false);
      }
    })();

    return () => {
      window.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  const filteredTags: any = tags.filter((tag) => {
    if (
      tag.url?.match(/(?:^|\W)best_product(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W)main_page(?:$|\W)/) ||
      tag.url == '-' ||
      tag.url == '_' ||
      tag.url == ' '
    ) {
      return;
    }
    return tag;
  });

  const filteredColors: any = colors.filter((color) => {
    if (
      color.url?.match(/(?:^|\W)-(?:$|\W)/) ||
      color.url?.match(/(?:^|\W)_(?:$|\W)/) ||
      color.url?.match(/(?:^|\W) (?:$|\W)/)
    ) {
      return;
    }
    return color;
  });

  const [expanded, setExpanded] = useState(false);

  const handleExpantionChange = () => {
    setExpanded((prev) => !prev);
  };

  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );

  // ------------------------- pagination handlers ---------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]: [number, any] = useState(12);
  const handlePageChange = (
    page: number,
    pageSize: number,
    current: number,
  ) => {
    setPageSize(pageSize);
    setCurrentPage(current);
    pushQueryParams([
      { name: 'page', value: page },
      { name: 'limit', value: pageSize },
    ]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  // ---------------------------------------------------------------------------

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      {repo.length !== 0 ? (
        <SEOstatic
          page={{
            realName: `${selectedCategory?.name ?? 'Каталог'} | NBHOZ`,
            name: `${
              repo[randomProduct].category?.parent?.name +
              ' > ' +
              repo[randomProduct].category?.name
            }`,
            url: `${router.asPath}`,
            desc: `${
              repo[0].category?.name ?? 'Каталог'
            } - покупайте Опт на NBHOZ по выгодным ценам! оптом ${
              repo[randomProduct]?.shortDesc ?? selectedCategory?.desc
            }`,
            keywords: `${repo[randomProduct]?.keywords}`,
            createdAt:
              repo[randomProduct]?.createdAt ?? selectedCategory?.createdAt,
            updatedAt:
              repo[randomProduct]?.updatedAt ?? selectedCategory?.updatedAt,
          }}
          image={`https://nbhoz.ru/api/images/${repo[0]?.category?.parent?.image}`}
        />
      ) : (
        ''
      )}
      <Head>
        <link rel="canonical" href="https://nbhoz.ru/catalog" />
      </Head>

      {isClient ? (
        <Container
          variants={variants.fadInOut}
          key="header"
          initial="start"
          animate="middle"
          exit="end"
          flex_direction="column"
          justify_content="center"
          align_items="center"
          padding="10px 0"
        >
          <Wrapper flex_direction="column">
            <CatelogContentWrapper>
              <TopFilterBar
                categories={categories}
                subCategories={subCategories}
                colors={filteredColors}
                priceRange={priceRange}
                tags={filteredTags}
                expanded={expanded}
                handleExpantionChange={handleExpantionChange}
                setSelectedCategory={setSelectedCategory}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
              />

              <Content>
                <Products>
                  <ProductGrid
                  // emptyProductsTitle={'По вашему запросу ничего не найдено.'}
                  />
                </Products>
                <Pagination
                  style={{ marginTop: '20px' }}
                  defaultCurrent={currentPage}
                  current={currentPage}
                  total={paginationLength}
                  pageSize={pageSize}
                  pageSizeOptions={[12, 24, 36, 50, 100]}
                  onChange={(current, pageSize) => {
                    handlePageChange(current, pageSize, current);
                  }}
                  locale={{ items_per_page: '/ странице' }}
                />
              </Content>
            </CatelogContentWrapper>
          </Wrapper>
        </Container>
      ) : (
        ''
      )}
    </>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .ant-pagination {
    .ant-pagination-options {
      .ant-pagination-options-size-changer {
        .ant-select-selector {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  @media ${devices.mobileL} {
    margin-left: 0;
    padding: 10px 15px;
  }
`;

const CatelogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  @media ${devices.mobileM} {
    flex-direction: column;
  }

  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;

const Products = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  @media ${devices.laptopS} {
    padding: 0 10px;
  }

  @media ${devices.mobileL} {
    padding: 0 10px;
  }
  @media ${devices.mobileM} {
    padding: 0 10px;
  }

  @media ${devices.mobileS} {
    padding: 0 10px;
  }
`;

CatalogPage.PageLayout = StoreLayout;

export default CatalogPage;
