import { Button, Form, Input, Select, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
import styles from './checkouts.module.scss';
import FormItem from '../generalComponents/FormItem';
import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { CategoryInTree, Product } from 'swagger/services';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useRouter } from 'next/router';
import { changeSearchQuery } from 'redux/slicers/store/globalSlicer';
import { handleSearchQueryChange } from 'components/store/storeLayout/utils/SearchBar/helpers';
import { FilterBtn } from 'components/store/storeLayout/utils/SearchBar/FilterBtn';
import FilterModal from 'components/store/storeLayout/utils/SearchBar/FilterModal';
import SearchItem from './SearchItemProducts';
import Loading from 'ui-kit/Loading';
import { ManageCheckoutFields } from './ManageCheckoutFields.enum';
import BasketProductForm from './BasketProductsForm';
import TextArea from 'antd/lib/input/TextArea';
import { navigateTo } from 'common/helpers';
import { Page } from 'routes/constants';
import { handleFormSubmitCheckout } from './helpers';
const { Option } = Select;
type Props = {
  title: string;
};

const ManageCheckoutFrom = ({ title }: Props) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [forUsersInDB, setForUsersInDB] = useState(false);
  const [basketList, setBasketList] = useState<Product[]>([]);
  const [isSaveLoading, setSaveLoading] = useState(false);
  //   __________________________ Search query hooks ________________________
  const router = useRouter();
  const { searchQuery, products, productsLoading } =
    useAppSelector<TGlobalState>((state) => state.global);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInTree>();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setIsOpened,
      setDisplay,
    ),
  );

  useEffect(() => {
    dispatch(changeSearchQuery(router.query.name as string));
  }, [router.query.name]);

  // ________________________________________________________________________
  return (
    <>
      {isSaveLoading ? (
        <LoadingWrapper>
          <Spin className={styles.spinner} size="large" />
        </LoadingWrapper>
      ) : (
        <>
          {' '}
          <div className={styles.createProductHeader}>
            <h1 className={styles.createProductHeader__title}>{title}</h1>
          </div>
          <Form
            layout="vertical"
            onFinish={handleFormSubmitCheckout(
              router,
              basketList,
              setSaveLoading,
            )}
            form={form}
            requiredMark={true}
            className={styles.createCheckoutForm}
          >
            <Form.Item
              label="Для зарегистрированных пользователей?"
              name={ManageCheckoutFields.CheckouType}
              required
            >
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder={`Выберите тип заказа`}
                onChange={(evt) => setForUsersInDB(evt)}
                defaultValue={false}
              >
                <Option key={0} value={true}>{`Да`}</Option>
                <Option key={1} value={false}>{`Нет`}</Option>
              </Select>
            </Form.Item>

            {/* ----------------------INPUT FOR USER---------------------- */}
            {forUsersInDB ? (
              <Form.Item
                label="Email пользователей, Только для зарегистрированных пользователей"
                name={ManageCheckoutFields.UserEmail}
                required
              >
                <Input
                  required={true}
                  placeholder="Введите email пользователей"
                />
              </Form.Item>
            ) : (
              ''
            )}

            {/* ----------------------SEARCH INPUT FOR PRODUCT---------------------- */}
            <SerachWrapper>
              <FilterBtn
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setIsOpened={setIsOpened}
                setDisplay={setDisplay}
                btnNode={btnNode}
              />
              <FilterModal
                isOpened={isOpened}
                display={display}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory!}
                setIsOpened={setIsOpened}
                setDisplay={setDisplay}
                menuNode={menuNode}
              />
              <span>Поиск товаров</span>
              <Input
                onChange={handleSearchQueryChange(selectedCategory, dispatch)}
                placeholder="Введите название товара"
              />
              {!!products.length && !productsLoading ? (
                <ResultsContent
                  style={{
                    overflowY: products.length > 2 ? 'scroll' : 'unset',
                  }}
                >
                  {products.map((product, index: number) => {
                    return (
                      <SearchItem
                        key={`search-bar-item-${index}`}
                        product={product}
                        index={index}
                        basketList={basketList}
                        setBasketList={setBasketList}
                      />
                    );
                  })}
                </ResultsContent>
              ) : !products.length && searchQuery && !productsLoading ? (
                <EmptyResultAndLoaderWrapper>
                  <span>
                    товар не найден. Пожалуйста, проверьте внимательнее
                    написание товара.
                  </span>
                </EmptyResultAndLoaderWrapper>
              ) : productsLoading ? (
                <EmptyResultAndLoaderWrapper>
                  <Loading />
                </EmptyResultAndLoaderWrapper>
              ) : (
                <></>
              )}
            </SerachWrapper>
            {/* ----------------------BASKET INPUTS---------------------- */}
            {basketList.map((product, index) => {
              return (
                <BasketProductForm
                  key={`basketList-childs-key-${index}`}
                  product={product}
                  index={index}
                  basketList={basketList}
                  setBasketList={setBasketList}
                />
              );
            })}
            <UserAddressInfoWrapper>
              {/* ----------------------RECIVER-NAME---------------------- */}
              <FormItem
                option={ManageCheckoutFields.ReceiverName}
                children={
                  <Input required={true} placeholder="Введите имя покупателя" />
                }
              />
              {/* ----------------------RECIVER-PHONE---------------------- */}
              <FormItem
                option={ManageCheckoutFields.ReceiverPhone}
                children={
                  <Input
                    required={true}
                    placeholder="Введите Телефон покупателя"
                  />
                }
              />
              {/* ----------------------RECIVER-PHONE---------------------- */}
              <FormItem
                option={ManageCheckoutFields.ReceiverEmail}
                children={
                  <Input
                    required={true}
                    placeholder="Введите email покупателя"
                  />
                }
              />
              {/* ----------------------ADDRESS---------------------- */}
              <FormItem
                option={ManageCheckoutFields.Address}
                children={
                  <TextArea
                    required={true}
                    rows={4}
                    placeholder="Адрес покупателя"
                  />
                }
              />

              {/* ----------------------ZIP-CODE---------------------- */}
              {/* <Form.Item label="индекс" name={ManageCheckoutFields.ZipCode}>
                <Input placeholder="Введите почтовый индекс" />
              </Form.Item> */}
              {/* ----------------------ZIP-DOOR---------------------- */}
              {/* <Form.Item label="Подъезд" name={ManageCheckoutFields.Door}>
                <Input placeholder="Введите Подъезд" />
              </Form.Item> */}
              {/* ----------------------ZIP-ROOM-OR-OFFICE---------------------- */}
              {/* <Form.Item
                label="Квартира/офис"
                name={ManageCheckoutFields.RoomOrOffice}
              >
                <Input placeholder="Введите Квартира/офис" />
              </Form.Item> */}
              {/* ----------------------ZIP-FLOOR---------------------- */}
              {/* <Form.Item label="Этаж" name={ManageCheckoutFields.Floor}>
                <Input placeholder="Введите Этаж" />
              </Form.Item> */}
              {/* ----------------------ZIP-RIGN-BELL---------------------- */}
              {/* <Form.Item label="Домофон" name={ManageCheckoutFields.RignBell}>
                <Input placeholder="Введите Домофон" />
            </Form.Item>*/}
            </UserAddressInfoWrapper>
            {/* ----------------------THE END OF INPUTS---------------------- */}
            <Form.Item className={styles.createProductForm__buttonsStack}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.createProductForm__buttonsStack__submitButton}
                loading={isSaveLoading}
              >
                {`Сохранить`}
              </Button>
              <Button
                type="primary"
                onClick={navigateTo(router, Page.ADMIN_CHECKOUTS)}
              >
                Вернуться назад
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

const SerachWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  position: relative;
`;

const ResultsContent = styled.ul`
  width: 100%;
  height: 350px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-content: space-evenly;
  justify-items: center;
  align-items: center;
  padding: 15px;
  gap: 30px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const EmptyResultAndLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    width: 50%;
  }
`;

const UserAddressInfoWrapper = styled.div`
width:100%:
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:flex-start;
gap:30px;
padding:30px 0;
`;

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direcion: row;
  align-items: center;
  justify-content: center;
`;

export default ManageCheckoutFrom;
