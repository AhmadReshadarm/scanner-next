import {
  deleteProduct,
  fetchProducts,
  createProduct,
  editProduct,
} from 'redux/slicers/productsSlicer';
import { AppDispatch } from 'redux/store';
import {
  hasWhiteSpace,
  navigateTo,
  openErrorNotification,
} from '../../../common/helpers';
import { NextRouter } from 'next/router';
import { Page, paths } from 'routes/constants';
import { TableProps } from 'antd';
import { DataType } from 'common/interfaces/data-type.interface';
import {
  Category,
  ParameterProduct,
  Product,
  ProductVariant,
} from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { ManageProductFields } from './ManageProductsFields.enum';
import { createImage } from 'redux/slicers/imagesSlicer';
import { onLocationChange } from 'components/store/catalog/helpers';
const handleDeleteProduct =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const handleLocationChange = onLocationChange(dispatch);
    const isSaved: any = await dispatch(deleteProduct(id));
    if (!isSaved.error) {
      dispatch(
        fetchProducts({
          offset: String(offset),
          limit: '12',
        }),
      );
      setVisible((prev) => !prev);
    }
    handleLocationChange();
  };

const handleDataConvertation = (
  form,
  imagesMap: Object,
  parameterProducts: ParameterProduct[],
  variantsLength: number,
) => {
  const newForm = { ...form };
  newForm.price = Number.parseInt(newForm.price, 10);
  newForm.available && (newForm.available = JSON.parse(newForm.available));
  newForm.parameterProducts = parameterProducts.map((parameterProduct) => ({
    parameterId: parameterProduct.parameter?.id,
    value: parameterProduct.value,
  }));

  const productVariants: any[] = [];

  for (let index = 0; index < variantsLength; index++) {
    const id: string = form[`id[${index}]`];
    const price: number = form[`${ManageProductFields.Price}[${index}]`];
    const oldPrice: number = form[`${ManageProductFields.OldPrice}[${index}]`];
    const artical: string = form[`${ManageProductFields.Artical}[${index}]`];
    // const wholeSalePrice: number =
    //   form[`${ManageProductFields.wholeSalePrice}[${index}]`];
    const available: boolean =
      form[`${ManageProductFields.Available}[${index}]`];
    const color: number = form[`${ManageProductFields.Color}[${index}]`];
    const payload = {
      id,
      price,
      oldPrice,
      // wholeSalePrice,
      artical,
      available,
      color,
      images: null,
    };
    const images = imagesMap[index];

    if (images?.length) {
      const imageNameArray = images.map((image) => {
        return image.url.split('/api/images/')[1];
      });

      payload.images = imageNameArray.join(', ');
    }

    productVariants.push(payload);
  }

  newForm.productVariants = productVariants;

  return newForm;
};

const checkForEmptyColorFieldInVariant = (variants: ProductVariant[]) => {
  let isEmpty = false;
  let emptyVariant;
  variants.map((variant) => {
    if (!variant.color) {
      isEmpty = true;
      emptyVariant = variant;
    }
  });
  return { isEmpty, emptyVariant };
};
const handleFormSubmitProduct =
  (
    router: NextRouter,
    dispatch: AppDispatch,
    imagesMap: Object,
    parameterProducts: ParameterProduct[],
    variantsLength: number,
    // desc: string,
  ) =>
  async (form) => {
    // form.desc = desc;

    const convertedForm = handleDataConvertation(
      form,
      imagesMap,
      parameterProducts,
      variantsLength,
    );
    if (hasWhiteSpace(form.url)) {
      openErrorNotification(
        'В URL-адресе не допускается использование пробелов.',
      );
      return;
    }
    if (convertedForm.productVariants.length == 0) {
      openErrorNotification('Установить вариант товара');
      return;
    }
    if (convertedForm.productVariants[0].price == undefined) {
      openErrorNotification('Установить цену товара');
      return;
    }
    if (
      checkForEmptyColorFieldInVariant(convertedForm.productVariants).isEmpty
    ) {
      openErrorNotification(
        `Выберите цвет для ${
          checkForEmptyColorFieldInVariant(convertedForm.productVariants)
            .emptyVariant.artical
        }`,
      );
      return;
    }

    if (router.query.id) {
      const isSaved: any = await dispatch(
        editProduct({
          ...convertedForm,
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_PRODUCTS)();
      }

      return;
    }

    const isSaved: any = await dispatch(createProduct(convertedForm));

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_PRODUCTS)();
    }
  };

const handleRedirectProducts = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_PRODUCTS]}/${id}`);
};

const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  // console.log('params', pagination, filters, sorter, extra);
};

const multipleItemsConverter = (items) => {
  return items?.map((item) => item.id);
};

const imagesConverter = (images) => {
  const imagesArray = images?.split(',');

  const imagesUrlArray = imagesArray?.map((image, index) => {
    const newImage = {
      name: image.trim(),
      url: `/api/images/${image.trim()}`,
      uid: index,
    };
    return newImage;
  });

  return imagesUrlArray;
};

const initialValuesConverter = (product: Product) => {
  const newProduct: any & Product = { ...product };
  newProduct.available = newProduct.available?.toString();
  newProduct.category = newProduct.category?.id;
  // newProduct.brand = newProduct.brand?.id;

  // newProduct.colors = multipleItemsConverter(newProduct.colors);
  newProduct.tags = multipleItemsConverter(newProduct.tags);
  // newProduct.sizes = multipleItemsConverter(newProduct.sizes);

  // newProduct.images = imagesConverter(newProduct.images);
  for (let index = 0; index < product?.productVariants?.length!; index++) {
    const variant = product.productVariants![index];
    newProduct[`id[${index}]`] = variant.id;
    newProduct[`${ManageProductFields.Price}[${index}]`] = variant.price;
    newProduct[`${ManageProductFields.OldPrice}[${index}]`] = variant.oldPrice;
    newProduct[`${ManageProductFields.Artical}[${index}]`] = variant.artical;
    newProduct[`${ManageProductFields.Available}[${index}]`] =
      variant.available;
    newProduct[`${ManageProductFields.Color}[${index}]`] = variant.color?.id;
    newProduct[index] = imagesConverter(variant.images);
  }

  return newProduct;
};

const handleParameterChange =
  (
    index: number,
    setParameterProducts: Dispatch<SetStateAction<ParameterProduct[]>>,
  ) =>
  (e) => {
    setParameterProducts((prev) => {
      const parameterProducts = cloneDeep(prev);

      parameterProducts[index].value = e.target.value;

      return parameterProducts;
    });
  };

const handleCategoryChange =
  (
    categories: Category[],
    setCurCategory: Dispatch<SetStateAction<Category | undefined>>,
    setParameterProducts: Dispatch<SetStateAction<ParameterProduct[]>>,
  ) =>
  (id: string) => {
    const category = categories.find((category) => category.id === id)!;
    setCurCategory(category);
    setParameterProducts(
      category?.parameters?.map((parameter) => ({
        parameter: parameter,
        value: '',
      }))!,
    );
  };

async function uploadImage(file, dispatch) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const image = await dispatch(
    createImage({
      config,
      file,
    }),
  );

  return new Promise((resolve, reject) => {
    resolve({ data: { link: `/api/images/${image.payload}` } });
  });
}

export {
  handleDeleteProduct,
  handleFormSubmitProduct,
  handleRedirectProducts,
  handleTableChange,
  initialValuesConverter,
  handleParameterChange,
  handleCategoryChange,
  uploadImage,
};
