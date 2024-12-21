import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageDBList } from 'redux/slicers/imagesSlicer';
import { fetchImages } from 'redux/slicers/imagesSlicer';
import { Pagination, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { DataType } from 'common/interfaces/data-type.interface';
import { columnsImages } from './constantsImages';
import { emptyLoading } from 'common/constants';
import { dumyDataLoader } from './dumyDataLoader';

type Props = {
  setOpen: any;
  isOpen?: boolean;
  prodcutVariantIndex?: number;
  isProducts: boolean;
  slideNum?: number;
};

const DatabaseImages = ({
  setOpen,
  isOpen,
  prodcutVariantIndex,
  isProducts,
  slideNum,
}: Props) => {
  const dispatch = useAppDispatch();
  const { imageListInDB, loading, paginationLength } = useAppSelector(
    (state) => state.images,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]: [number, any] = useState(20);

  useEffect(() => {
    dispatch(
      fetchImages({
        offset: String(0),
        limit: '20',
      }),
    );
    return () => {
      dispatch(clearImageDBList());
    };
  }, []);

  const dataSource = imageListInDB?.map(({ id, filename, originalName }) => {
    return {
      key: id,
      filename,
      originalName,
      url: `/api/images/${filename}`,
      isProducts,
      setOpen,
      slideNum,
      prodcutVariantIndex,
      dispatch,
      offset: pageSize,
    };
  }) as unknown as DataType[];
  const [byFileName, setByFileName] = useState(false);
  const fetchImagesWithSearch = (evt) => {
    dispatch(
      fetchImages({
        offset: String(0),
        limit: '20',
        originalName: !byFileName ? evt.target.value : '',
        filename: byFileName ? evt.target.value : '',
      }),
    );
    return () => {
      dispatch(clearImageDBList());
    };
  };

  const dumyDataSource = emptyLoading.map((item, index) => {
    return {
      key: index,
      index: String(index),
    };
  });

  return (
    <Contaienr style={{ display: isOpen ? 'flex' : 'none' }}>
      <Wrapper>
        <CloseBtn onClick={() => setOpen(false)}>
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
        </CloseBtn>

        {loading ? (
          <TableWrapper>
            <Table
              scroll={{
                y: 768,
              }}
              columns={
                dumyDataLoader as (
                  | ColumnGroupType<{ index: string }>
                  | ColumnType<{ index: string }>
                )[]
              }
              pagination={false}
              dataSource={dumyDataSource}
            />
          </TableWrapper>
        ) : (
          <TableWrapper>
            <Table
              scroll={{
                y: 768,
              }}
              columns={
                columnsImages as (
                  | ColumnGroupType<DataType>
                  | ColumnType<DataType>
                )[]
              }
              pagination={false}
              dataSource={dataSource}
            />
          </TableWrapper>
        )}
        <FooterWrapper>
          <div className="input-wrapper">
            <input
              className="image-search-input"
              type="text"
              placeholder={byFileName ? 'Имя файла' : 'Имя изображения'}
              onChange={fetchImagesWithSearch}
            />
            <label className="image-seach-check-by-file-name">
              <input
                onChange={() => setByFileName(!byFileName)}
                type="checkbox"
              />
              <span>Поиск по имени файла</span>
            </label>
          </div>

          <Pagination
            current={currentPage}
            total={paginationLength}
            pageSize={pageSize}
            pageSizeOptions={[12, 24, 36, 50, 100]}
            onChange={(current, pageSize) => {
              setPageSize(pageSize);
              setCurrentPage(current);
              dispatch(
                fetchImages({
                  offset: String((current - 1) * pageSize),
                  limit: String(pageSize),
                }),
              );
              return () => {
                dispatch(clearImageDBList());
              };
            }}
          />
        </FooterWrapper>
      </Wrapper>
    </Contaienr>
  );
};

const Contaienr = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff36;
  z-index: 9;
`;

const Wrapper = styled.div`
  width: 90%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  box-shadow: 0px 0px 10px -2px #000;
  padding: 20px;
  position: relative;
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    .image-search-input {
      width: 300px;
      height: 50px;
      padding: 5px 10px;
      border-radius: 15px;
      border: 1px solid #00000042;
    }
    .image-seach-check-by-file-name {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 10px;
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .ant-table-body {
    max-height: 700px !important;
  }
`;

const CloseBtn = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px -2px #000;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 9;
`;

export default DatabaseImages;
