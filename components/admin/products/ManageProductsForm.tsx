import { Button, Form, Input, List, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/mutipleImagesSlicer';
import { TMultipleImageState } from 'redux/types';
import { Page } from 'routes/constants';
import {
  // Brand,
  Category,
  Color,
  ParameterProduct,
  Product,
  // Size,
  Tag,
} from 'swagger/services';

import FormItem from '../generalComponents/FormItem';
import {
  handleCategoryChange,
  handleFormSubmitProduct,
  initialValuesConverter,
  handleParameterChange,
} from './helpers';
import { ManageProductFields } from './ManageProductsFields.enum';
import styles from './products.module.scss';
import ProductVariantForm from './ProductVariantForm';

const { Option } = Select;

type Props = {
  products: Product[];
  product?: Product;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
  tags: Tag[];
  // sizes: Size[];
  colors: Color[];
  categories: Category[];
};

const ManageProductForm = ({
  title,
  products,
  product,
  isLoading,
  isSaveLoading,
  editMode,
  tags,
  // sizes,
  colors,
  categories,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = initialValuesConverter(product as Product);
  const [curCategory, setCurCategory] = useState<Category>();
  const [variants, setVariants] = useState<any[]>([]);
  const [parameterProducts, setParameterProducts] = useState<
    ParameterProduct[]
  >([]);
  const { imagesMap } = useAppSelector<TMultipleImageState>(
    (state) => state.multipleImages,
  );

  useEffect(() => {
    for (let index = 0; index < product?.productVariants?.length!; index++) {
      initialValues[index]?.forEach((image) => {
        dispatch(setDefaultImageList({ file: image, index }));
      });
    }
    setCurCategory(product?.category);
    setParameterProducts(
      product?.category?.parameters?.map((parameter) => {
        const parameterProduct = product.parameterProducts?.find(
          (parameterProduct) => parameterProduct.parameterId === parameter.id,
        );

        return {
          parameter: parameter,
          value: parameterProduct?.value,
        };
      })!,
    );
    setVariants(generateArrayOfNumbers(product?.productVariants?.length ?? 0));
    return () => {
      dispatch(clearImageList());
    };
  }, [product]);

  const handleAddVariant = () => {
    setVariants((prev) => prev.concat({}));
  };

  return (
    <>
      <div className={styles.createProductHeader}>
        <h1 className={styles.createProductHeader__title}>{title}</h1>
      </div>
      {(isLoading || !product) && editMode ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitProduct(
            router,
            dispatch,
            imagesMap,
            parameterProducts,
            variants.length,
            // editorModal,
          )}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createProductForm}
        >
          {/* ----------------------NAME---------------------- */}
          <FormItem
            option={ManageProductFields.Name}
            children={
              <Input required={true} placeholder="Введите имя продукта" />
            }
          />
          {/* ----------------------ULR---------------------- */}
          <FormItem
            option={ManageProductFields.Url}
            children={
              <Input required={true} placeholder="Введите Url продукта" />
            }
          />
          {/* ----------------------DESCRIPTION---------------------- */}

          <FormItem
            option={ManageProductFields.Desc}
            children={
              <TextArea required={true} rows={5} placeholder="Описание" />
            }
          />

          {/* ----------------------SHORT DESCRIPTION---------------------- */}
          <FormItem
            option={ManageProductFields.ShortDesc}
            children={
              <TextArea
                required={true}
                rows={4}
                placeholder="Краткое описание, Не более 350 символов"
              />
            }
          />
          {/* ----------------------KEYWORDS---------------------- */}
          <FormItem
            option={ManageProductFields.Keywords}
            children={
              <TextArea
                required={true}
                rows={4}
                placeholder="Введите keywords | Пользователь ',' между каждым ключевым словом, Например: ключевое слово-1, ключевое слово-2."
              />
            }
          />
          {/* ----------------------CATEGORIES---------------------- */}
          <Form.Item label="Категория" name="category" required>
            <Select
              onChange={handleCategoryChange(
                categories,
                setCurCategory,
                setParameterProducts,
              )}
              style={{ width: '100%' }}
            >
              {categories?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.parent?.name} / {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* ----------------------TAGS---------------------- */}
          <Form.Item label="коллекция" name="tags">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder={`Выберите несколько или одну коллекцию`}
            >
              {tags?.map((item) => (
                <Option key={item.id} value={item.id}>{`${item.name}`}</Option>
              ))}
            </Select>
          </Form.Item>
          {/* ----------------------SIZES---------------------- */}
          {/* <Form.Item label="Размер" name="sizes">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder={`Выберите несколько или один размер`}
            >
              {sizes?.map((item) => (
                <Option key={item.id} value={item.id}>{`${item.name}`}</Option>
              ))}
            </Select>
          </Form.Item> */}
          {/* ----------------------PRODUCT VARIANTS---------------------- */}
          <h2 style={{ fontSize: '26px', marginBottom: '20px' }}>
            Варианты продукта
          </h2>
          <div className={styles['product-variants']}>
            {variants.map((variant, index) => (
              <ProductVariantForm
                key={`product-variant-${index}`}
                colors={colors}
                index={index}
                setVariants={setVariants}
                imagesList={imagesMap[index]}
              />
            ))}
            <Button type="primary" onClick={handleAddVariant}>
              Добавить вариант
            </Button>
          </div>
          {/* ----------------------IMAGES LIST---------------------- */}
          {!!curCategory?.parameters?.length && (
            <>
              <h2 style={{ marginBottom: '10px' }}>Список характеристик</h2>
              <span>
                Оставьте пустым или добавьте тире - или подчеркните _, чтобы
                скрыть эту опцию на стороне клиента.
              </span>
              <List
                bordered={true}
                itemLayout="horizontal"
                dataSource={parameterProducts}
                style={{ marginBottom: '20px' }}
                renderItem={(parameterProduct, index) => (
                  <List.Item className={styles['list-item']}>
                    <span className={styles['list-item__title']}>
                      {parameterProduct.parameter?.name}
                    </span>
                    <Input
                      value={parameterProduct.value}
                      placeholder={'Ввдедите Значение характеристики'}
                      onChange={handleParameterChange(
                        index,
                        setParameterProducts,
                      )}
                    />
                  </List.Item>
                )}
              />
            </>
          )}
          {/* ----------------------THE END OF INPUTS---------------------- */}
          <Form.Item className={styles.createProductForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createProductForm__buttonsStack__submitButton}
              loading={isSaveLoading}
            >
              {products ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_PRODUCTS)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageProductForm;
