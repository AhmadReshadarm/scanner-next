import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/products/constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';
import styles from './index.module.scss';
// _____________________________________________
import FilterBar from 'components/store/catalog/FilterBar';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import { TCatalogState } from 'redux/types';
import { Category } from 'swagger/services';
import {
  convertQueryParams,
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import {
  fetchParentCategories,
  // fetchProductsInExcelFile,
} from 'redux/slicers/store/catalogSlicer';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';

// import ExcelJs from 'exceljs';
import Head from 'next/head';

// _____________________________________________
const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // ____________________________________________________________________
  const [category, setCategory] = useState<Category | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const {
    products,
    productsLength,
    categories,
    subCategories,
    // brands,
    colors,
    tags,
    priceRange,
    // loading,
    productsLoading,
    // page,
  } = useAppSelector<TCatalogState>((state) => state.catalog);

  const handleLocationChange = onLocationChange(dispatch);

  const onCategoryChange = () => {
    const queryParams = convertQueryParams(
      getQueryParams(window.location.search),
    );
    const categoryUrl =
      queryParams.categories && queryParams.categories![0]
        ? queryParams.categories![0]
        : '';
    const category = categories.find(
      (category) => category.url === categoryUrl,
    );
    setCategory(category);
  };
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    localStorage.removeItem('location');
    window.addEventListener('locationChange', () => {
      handleLocationChange();
      onCategoryChange();
    });
    setPriceRange(dispatch);

    (async () => {
      if (firstLoad) {
        await dispatch(fetchParentCategories());
        await handleLocationChange();
        onCategoryChange();
        setFirstLoad(false);
      }
    })();

    return () => {
      window.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleExpantionChange = () => {
    setExpanded((prev) => !prev);
  };

  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );
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
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [category, selectedCategory]);

  // ___________________________________________________________________
  let dataSource = products?.map(
    ({
      id,
      name,
      desc,
      category,
      brand,
      tags,
      sizes,
      url,
      productVariants,
      ...rest
    }) => ({
      key: id,
      id,
      name,
      desc,
      category,
      tags,
      sizes,
      url,
      productVariants,
    }),
  ) as unknown as DataType[];
  // const [loadingProgress, seLoadingProgress] = useState(0);
  // const [loadingData, setLoadingData] = useState(false);

  // ------------------------------------------------- generate excel file from all goods -----------------------------------
  // const handleProductDownloadInExcel = () => {
  //   setLoadingData(true);
  //   dispatch(fetchProductsInExcelFile())
  //     .then(unwrapResult)
  //     .then((response) => {
  //       setLoadingData(true);
  //       let workBook = new ExcelJs.Workbook();
  //       const sheet = workBook.addWorksheet('subscribers');
  //       sheet.columns = [
  //         { header: 'ID', key: 'id', width: 10 },
  //         { header: 'Наименование товара', key: 'name', width: 40 },
  //         { header: 'Артикул', key: 'artical', width: 10 },
  //         { header: 'Цена', key: 'price', width: 10 },
  //         { header: 'Ссылка на товар', key: 'link', width: 55 },
  //         { header: 'Изображение', key: 'image', width: 21 },
  //       ];
  //       sheet.getRow(1).alignment = {
  //         vertical: 'middle',
  //         horizontal: 'center',
  //         wrapText: true,
  //       };
  //       sheet.properties.defaultRowHeight = 115;

  //       let counter = 0;
  //       let progress = 0;
  //       const productIteration = async () => {
  //         if (counter < response.rows.length) {
  //           progress = Math.floor((counter * 100) / response.rows.length);
  //           seLoadingProgress(progress);
  //           const images = getProductVariantsImages(
  //             response.rows[counter]!.productVariants,
  //           );
  //           const responseImage = await fetch(
  //             `https://nbhoz.ru/api/images/${images[0]}`,
  //           );
  //           const buffer = await responseImage.arrayBuffer();
  //           const imageId = workBook.addImage({
  //             buffer: buffer,
  //             extension: 'webp' as 'jpeg',
  //           });
  //           await sheet.addRow({
  //             id: response.rows[counter].id,
  //             name: response.rows[counter].name,
  //             artical: response.rows[counter]?.productVariants![0].artical,
  //             price: `${response.rows[counter]?.productVariants![0].price} ₽`,
  //             link: {
  //               text: `https://nbhoz.ru/product/${response.rows[counter].url}`,
  //               hyperlink: `https://nbhoz.ru/product/${response.rows[counter].url}`,
  //             },
  //           });
  //           await sheet.addImage(imageId, {
  //             tl: { col: 5, row: counter + 1 },
  //             ext: { width: 150, height: 150 },
  //             editAs: 'oneCell',
  //           });
  //           sheet.getRow(counter + 2).alignment = {
  //             vertical: 'middle',
  //             horizontal: 'center',
  //             wrapText: true,
  //           };
  //           counter = counter + 1;
  //           productIteration();
  //         } else {
  //           try {
  //             workBook.xlsx.writeBuffer().then((data) => {
  //               const blob = new Blob([data], {
  //                 type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //               });
  //               const url = window.URL.createObjectURL(blob);
  //               const anchor = document.createElement('a');
  //               anchor.href = url;
  //               anchor.download = `${
  //                 new Date().toISOString().split('T')[0]
  //               }.xlsx`;
  //               anchor.click();
  //               window.URL.revokeObjectURL(url);
  //             });
  //             seLoadingProgress(100);
  //             setLoadingData(false);
  //             seLoadingProgress(0);
  //           } catch (error) {
  //             // console.log(error);
  //           }
  //         }
  //       };
  //       productIteration();
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //     });
  // };

  // -------------------------------------------- END OF FUNCTION --------------------------------------------

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Продукты | NBHOZ</title>
      </Head>
      <div className={styles.productsHeader}>
        <h1 className={styles.productsHeader__title}>Продукты</h1>
        <HeaderActionBtnWrapper>
          {/* <Button
            className={styles.productsHeader__createProductButton}
            type="primary"
            onClick={handleProductDownloadInExcel}
          >
            {loadingData
              ? `Загрузка ${loadingProgress}%`
              : 'Скачать прайс-лист'}
          </Button> */}
          <Button
            className={styles.productsHeader__createProductButton}
            type="primary"
            onClick={navigateTo(router, Page.ADMIN_CREATE_PRODUCT)}
          >
            Создать новый продукт
          </Button>
        </HeaderActionBtnWrapper>
      </div>

      <CatelogContentWrapper>
        <FilterBar
          categories={categories}
          subCategories={subCategories}
          colors={colors}
          priceRange={priceRange}
          tags={tags}
          expanded={expanded}
          handleExpantionChange={handleExpantionChange}
          setSelectedCategory={setSelectedCategory}
          setCurrentPage={setCurrentPage}
          handlePageChange={handlePageChange}
          setPageSize={setPageSize}
        />
        <Content>
          {productsLoading ? (
            <EmptyProductsTitle>
              <Spin className={styles.spinner} size="large" />
            </EmptyProductsTitle>
          ) : !productsLength ? (
            <EmptyProductsTitle>
              <h3>По вашему запросу ничего не найдено.</h3>
            </EmptyProductsTitle>
          ) : (
            <>
              <Table
                scroll={{
                  y: 768,
                }}
                columns={
                  columns as (
                    | ColumnGroupType<DataType>
                    | ColumnType<DataType>
                  )[]
                }
                pagination={{
                  pageSize: pageSize,
                  current: currentPage,
                  total: paginationLength,
                  pageSizeOptions: [12, 24, 36, 50, 100],
                  locale: { items_per_page: '/ странице' },
                }}
                dataSource={dataSource}
                onChange={(event) => {
                  handlePageChange(
                    event.current as number,
                    event.pageSize as number,
                    event.current as number,
                  );
                }}
              />
            </>
          )}
        </Content>
      </CatelogContentWrapper>
    </>
  );
};

const CatelogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;

  @media ${devices.mobileM} {
    flex-direction: column;
  }

  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 20px 0;
  @media ${devices.mobileL} {
    margin-left: 0;
    padding: 10px 15px;
  }
`;

const EmptyProductsTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
  h3 {
    font-size: 2rem;
    font-family: var(--font-ricordi);
  }
`;

const HeaderActionBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
ProductsPage.PageLayout = AdminLayout;

export default ProductsPage;
