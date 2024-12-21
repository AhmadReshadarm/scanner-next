import { OrderProduct, Product, Basket } from 'swagger/services';
import { Role } from 'common/enums/roles.enum';
import { updateCart, clearCart } from 'redux/slicers/store/cartSlicer';
import { AppDispatch } from 'redux/store';

const getTotalQuantity = (orderProducts: OrderProduct[]) => {
  return orderProducts?.reduce((accum, orderProduct) => {
    return accum + Number(orderProduct.qty);
  }, 0);
};

const getTotalPrice = (orderProducts: OrderProduct[], user: any) => {
  if (!user) {
    return orderProducts?.reduce((accum, orderProduct) => {
      return (
        accum + Number(orderProduct.qty) * Number(orderProduct.productPrice)
      );
    }, 0);
  }
  if (user.role === Role.SuperUser) {
    return orderProducts?.reduce((accum, orderProduct) => {
      return (
        accum +
        Number(orderProduct.qty) *
          Number(orderProduct.productVariant!.wholeSalePrice)
      );
    }, 0);
  }
  if (user.role === Role.User || user.role === Role.Admin) {
    return orderProducts?.reduce((accum, orderProduct) => {
      return (
        accum + Number(orderProduct.qty) * Number(orderProduct.productPrice)
      );
    }, 0);
  }
};

const getTotalDiscount = (orderProducts: OrderProduct[]) => {
  // const totalPrice = getTotalPrice(orderProducts);
  const totalOldPrice = orderProducts?.reduce((accum, orderProduct) => {
    return (
      accum +
      Number(orderProduct.qty) * Number(orderProduct.productVariant?.price)
    );
  }, 0);
  // return totalPrice - totalOldPrice;
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

const handleItemRemove = async (
  product: Product,
  dispatch: AppDispatch,
  cart: Basket,
) => {
  if (!product) return;
  await dispatch(
    updateCart({
      orderProducts: cart?.orderProducts
        ?.filter((orderProduct) => orderProduct.product?.id != product.id)
        .map((orderProduct) => ({
          productId: orderProduct.product?.id?.toString(),
          qty: orderProduct.qty,
          productVariantId: orderProduct.productVariant?.id,
        })),
    }),
  );
};

const handleItemCountChange = (
  counter: number,
  product: Product,
  dispatch: AppDispatch,
  cart: Basket,
) => {
  dispatch(
    updateCart({
      orderProducts: cart?.orderProducts
        ?.filter((orderProduct) => orderProduct.product?.id != product.id)
        ?.concat({ product: { id: product.id }, qty: counter })
        .map((orderProduct) => ({
          productId: orderProduct.product?.id,
          qty: orderProduct.qty,
          productVariantId: orderProduct.productVariant?.id,
        })),
    }),
  );
};

const handleRemoveClick = (dispatch: AppDispatch) => {
  const basketId = localStorage.getItem('basketId');
  if (basketId) {
    dispatch(clearCart(basketId!));
  }
};

export {
  getTotalQuantity,
  getTotalPrice,
  getTotalDiscount,
  findTotalWheight,
  handleItemRemove,
  handleItemCountChange,
  handleRemoveClick,
};
