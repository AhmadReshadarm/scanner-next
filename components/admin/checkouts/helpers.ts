import {
  deleteCheckout,
  fetchCheckoutsAll,
} from 'redux/slicers/checkoutsSlicer';
import { AppDispatch } from 'redux/store';
import { Page, paths } from 'routes/constants';
import { NextRouter } from 'next/router';
import {
  Product,
  UserService,
  AddressService,
  CheckoutService,
  BasketService,
  BasketDTO,
  OrderProductDTO,
} from 'swagger/services';
import { ManageCheckoutFields } from './ManageCheckoutFields.enum';
import { getTotalPrice } from 'components/store/checkout/totalDeliveryDate/helpers';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { generateInvoiceTemplet } from 'components/store/checkout/totalDeliveryDate/helpers';
const handleDeleteCheckout =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteCheckout(id));
    if (!isSaved.error) {
      dispatch(
        fetchCheckoutsAll({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

const handleRedirectCheckout = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_CHECKOUTS]}/${id}`);
};

const getFormatedDate = (date: any) => {
  const months = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря',
  };

  let deliveryDueIntial = new Date(date);
  deliveryDueIntial.setDate(deliveryDueIntial.getDate() + 5);

  return `${deliveryDueIntial.getDate()} ${
    months[deliveryDueIntial.getMonth() + 1]
  }`;
};

const handleSearchItemClick = (
  basketList: Product[],
  setBasketList,
  product: Product,
) => {
  if (!!basketList.length) {
    const isInBasket = basketList.find(
      (productInbasket) => productInbasket.id === product.id,
    );
    if (!isInBasket) {
      setBasketList([...basketList, product]);
    }
  } else {
    setBasketList([product]);
  }
};
const convertBasketData = (basketList: Product[], form) => {
  const payloadBasket: OrderProductDTO[] = [];

  for (let index = 0; index < basketList.length; index++) {
    const productId: string = basketList[index].id!;
    const qty: number = form[`${ManageCheckoutFields.Qty}[${index}]`];
    // const productSize: string =
    //   form[`${ManageCheckoutFields.ProductSize}[${index}]`];
    const productVariantId: string =
      form[`${ManageCheckoutFields.Variant}[${index}]`];
    const product: Product = basketList[index];
    const productVariant = basketList[index].productVariants?.find(
      (variant) => variant.id === productVariantId,
    );
    const payload = {
      productId,
      qty,
      // productSize,
      productVariantId,
      product,
      productVariant,
    };

    payloadBasket.push(payload);
  }
  return payloadBasket;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const handleFormSubmitCheckout =
  (router: NextRouter, basketList: Product[], setSaveLoading) =>
  async (form) => {
    setSaveLoading(true);
    try {
      if (!form.checkoutType) {
        const basket = {
          orderProducts: convertBasketData(basketList, form),
        };
        const payload = {
          receiverName: form.receiverName,
          receiverPhone: form.receiverPhone,
          receiverEmail: form.receiverEmail,
          address: form.address,
          roomOrOffice: form.roomOrOffice,
          door: form.door,
          floor: form.floor,
          rignBell: form.rignBell,
          zipCode: form.zipCode,
          comment: '',
          cart: basket,
        };

        const generatedHtml = generateInvoiceTemplet(payload);
        openErrorNotification('В процессе: Отправка счета-фактуры на заказ...');
        await CheckoutService.createCheckoutWithoutRegister({
          body: {
            to: payload.receiverEmail,
            subject: `Заказ ${payload.receiverName}`,
            html: `${generatedHtml}`,
          },
        });

        await sleep(3000);

        openSuccessNotification('Счет заказа отправлен');
        router.push('/admin/checkouts');
        setSaveLoading(false);
      }
      if (form.checkoutType) {
        openErrorNotification('В процессе: Поиск пользователя...');
        const user = await UserService.findUserByEmail({
          email: form.userEmail,
        });
        if (!user) {
          openErrorNotification('Пользователь не найден');
        }
        await sleep(3000);
        openSuccessNotification('Успешный, пользователь найден');
        await sleep(1000);
        openErrorNotification('В процессе: Создание корзины...');
        const basketId = await BasketService.createBasket();
        const payload: BasketDTO = {
          orderProducts: convertBasketData(basketList, form),
        };

        await sleep(3000);
        openSuccessNotification('Корзина создана');
        await sleep(1000);
        openErrorNotification('В процессе: Обновление корзины...');
        let counter = 0;
        let basket;
        let simulatedPayload: any = {
          orderProducts: [],
        };
        const addToBasket = async (payload: BasketDTO) => {
          if (counter < payload.orderProducts?.length!) {
            simulatedPayload.orderProducts!.push(
              payload.orderProducts![counter],
            );

            basket = await BasketService.updateBasket({
              basketId: basketId.id,
              body: simulatedPayload,
            });
            counter = counter + 1;
            addToBasket(payload);
          }
        };
        await addToBasket(payload);

        await sleep(3000);
        openSuccessNotification('Корзина обновлена');
        await sleep(1000);
        openErrorNotification('В процессе: Сохранение адреса...');
        const responseAdress = await AddressService.createAddressDirect({
          body: {
            receiverName: form.receiverName,
            receiverPhone: form.receiverPhone,
            receiverEmail: form.receiverEmail,
            address: form.address,
            roomOrOffice: form.roomOrOffice,
            door: form.door,
            floor: form.floor,
            rignBell: form.rignBell,
            zipCode: form.zipCode,
            userId: user.id,
          },
        });
        await sleep(3000);
        openSuccessNotification('Адрес сохранен');
        await sleep(1000);
        openErrorNotification('В процессе: Завершение заказа...');
        const saved = await CheckoutService.createCheckout({
          body: {
            address: responseAdress,
            basket: basket,
            totalAmount: getTotalPrice(basket, ''),
            comment: '',
            leaveNearDoor: false,
            userId: user.id,
          },
        });
        if (saved) {
          openSuccessNotification('Заказ завершен');
          router.push('/admin/checkouts');
          setSaveLoading(false);
        }
      }
    } catch (error) {
      openErrorNotification(`${error}`);
      setSaveLoading(false);
    }
  };

export {
  handleRedirectCheckout,
  handleDeleteCheckout,
  getFormatedDate,
  handleSearchItemClick,
  handleFormSubmitCheckout,
};
