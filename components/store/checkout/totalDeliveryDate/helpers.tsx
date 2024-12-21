import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import { Basket } from 'swagger/services';

const DeliveryTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color.textPrimary,
    color: color.btnPrimary,
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(14),
    boxShadow: `0px 2px 6px ${color.boxShadowBtn}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px',
    borderRadius: '15px',
    padding: '15px',
    userSelect: 'none',
  },
}));

const getFormatedDate = () => {
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

  let deliveryDueIntial = new Date();
  deliveryDueIntial.setDate(deliveryDueIntial.getDate() + 5);

  return `${deliveryDueIntial.getDate()} ${
    months[deliveryDueIntial.getMonth() + 1]
  }`;
};

const getOldPrice = (cart: Basket | null): number => {
  return cart?.orderProducts?.reduce((accum, item) => {
    accum +=
      Number(item.qty) *
      Number(item.productVariant?.oldPrice ?? item.productVariant?.price);
    return accum;
  }, 0)!;
};

const getDiscount = (cart: Basket | null) => {
  const oldPrice = getOldPrice(cart);
  const totalAmount = cart?.orderProducts?.reduce((accum, item) => {
    return accum + Number(item.qty) * Number(item.productVariant?.price);
  }, 0)!;

  return oldPrice - totalAmount;
};

const getTotalPrice = (cart: Basket | null, withDliver: boolean | any) => {
  const totalAmount = cart?.orderProducts?.reduce((accum, item) => {
    return accum + Number(item.qty) * Number(item.productVariant?.price);
  }, 0)!;

  // if (!withDliver) {
  return totalAmount;
  // }
  // if (withDliver) {
  //   return totalAmount + 150;
  // }
};

const getTotalPriceSuperUser = (
  cart: Basket | null,
  withDliver: boolean | any,
) => {
  const totalAmount = cart?.orderProducts?.reduce((accum, item) => {
    return (
      accum + Number(item.qty) * Number(item.productVariant!.wholeSalePrice)
    );
  }, 0)!;

  if (!withDliver) {
    return totalAmount;
  }
  if (withDliver) {
    return totalAmount + 500;
  }
};

const findTotalWheight = (cart: any) => {
  let totalWeight = 0;
  cart?.orderProducts?.map((product: any) =>
    product.product?.parameterProducts?.map((item: any) => {
      if (item.value.match(/(?:^|\W)грамм(?:$|\W)/)) {
        totalWeight =
          totalWeight + parseInt(item.value.match(/\d+/g)) * product.qty;
      }
    }),
  );
  if (totalWeight > 999) {
    totalWeight = 0.001 * totalWeight;
    return { totalWeight, in: 'kilo' };
  }
  return { totalWeight, in: 'gram' };
};

interface templetDTO {
  receiverName?: string;
  receiverPhone?: string;
  receiverEmail?: string;
  address?: string;
  roomOrOffice?: string;
  door?: string;
  floor?: string;
  rignBell?: string;
  zipCode?: string;
  comment?: string;
  cart: Basket | null;
}

const generateInvoiceTemplet = (payload: templetDTO) => {
  return `
  <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="https://nbhoz.ru/favicon.svg" />
    <link rel="stylesheet" href="https://nbhoz.ru/emailStyle.css" />
    <title>Форма заказа | NBHOZ</title>
  </head>
  <body>
    <div class="body-wrapper" style="width: 90%;  padding: 40px;">
      <div>
        <h1>Данные получателя</h1>
      </div>
      <div><span>Имя и фамилия: </span> <span>${
        payload.receiverName
      }</span></div>
      <div><span>Телефон: </span> <span>${payload.receiverPhone}</span></div>
      <div><span>Ад. эл.: </span> <span>${payload.receiverEmail}</span></div>
      <div>
        <h1>Адрес доставки</h1>
      </div>
      <div>
        <span>Адрес: </span> <span>${payload.address}</span>
      </div>

      <div>
        <h1>Заказ покупателя</h1>
      </div>
       ${payload.cart?.orderProducts
         ?.map((orderproduct) => {
           return `<div class="product-wrapper" style="width: 150px; margin: 1%;  float: left;">
        <div class="product-card">
          <img
            class="product-img"
            src="https://nbhoz.ru/api/images/${
              orderproduct.productVariant?.images?.split(',')[0]
            }"
            alt="${orderproduct.product?.name}"
            style="width: 100%; height: 150px; min-height: 150px; border: 1px solid gray; border-radius: 20px;"
          />
          <h4 class="product-title">${orderproduct.product?.name}</h4>
          <div class="product-details">
            <span>${orderproduct!.qty} шт</span>
            <span>*</span>
            <span>${orderproduct.productVariant?.price}₽</span>
            <span>=</span>
            <span>${
              orderproduct.productVariant?.price! * orderproduct.qty!
            }₽</span>
          </div>
          <div class="product-artical">
            <span>Артикул:</span>
            <span>${orderproduct.productVariant?.artical}</span>
          </div>
        </div>
      </div>
       `;
         })
         .join('')}


      <div class="total-wrapper" style="clear: both; padding: 30px 0 30px 0;">
        <span>
          <h1>Итого:</h1>
        </span>
        <h2>${getTotalPrice(payload.cart, true)}₽</h2>
      </div>
      <div class="comment-title-wrapper">
        <h1>Комментарий</h1>
      </div>
      <div class="comment-wrapper">
        <span>${payload.comment}</span>
      </div>
    </div>
  </body>
</html>

  `;
};

export {
  DeliveryTooltip,
  getFormatedDate,
  getOldPrice,
  getDiscount,
  getTotalPrice,
  findTotalWheight,
  getTotalPriceSuperUser,
  generateInvoiceTemplet,
};
