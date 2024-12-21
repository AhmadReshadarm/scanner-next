import AdminLayout from 'components/admin/adminLayout/layout';
import { devices } from 'components/store/lib/Devices';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProduct } from 'redux/slicers/store/productInfoSlicer';
import { TProductInfoState, TQuestionState } from 'redux/types';
import styled from 'styled-components';
import QuastionList from 'components/store/product/reviewsAndQuastions/quastions/Quastions';
import {
  fetchQuestionByID,
  sortQuestionsAdmin,
} from 'redux/slicers/questionSlicer';
import Loading from 'ui-kit/Loading';
import Filters from 'components/store/product/reviewsAndQuastions/Filters';
import { quastionsDropdownOption } from 'components/store/product/constants';
import Head from 'next/head';

const ProductQuestionsPage = () => {
  const { question, loading } = useAppSelector<TQuestionState>(
    (state) => state.questions,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchQuestionByID({ id: router.query.id as string }));
      setTimeout(() => {
        dispatch(sortQuestionsAdmin(quastionsDropdownOption[0]));
      }, 2000);
    }
  }, [router.query]);

  const [filterValue, setFilterValue] = useState('Сначала новые');
  const handleSortChange = (option) => {
    setFilterValue(option);
    dispatch(sortQuestionsAdmin(option));
  };

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Вопросы {`>`} Редактирование Вопрос | NBHOZ
        </title>
      </Head>
      <ContentContainer>
        <ContentWrapper style={{ alignItems: 'flex-start' }}>
          {!loading && question ? (
            <>
              <Filters
                options={quastionsDropdownOption}
                value={filterValue}
                setValue={handleSortChange}
              />
              <QuastionList product={question!.product} />
            </>
          ) : (
            <Loading />
          )}
        </ContentWrapper>
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;

  @media ${devices.laptopS} {
    display: flex;
    flex-direction: column-reverse;
  }

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px 0;
  gap: 20px;
  position: relative;

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

ProductQuestionsPage.PageLayout = AdminLayout;

export default ProductQuestionsPage;
