import { Basket, Product } from 'swagger/services';

const findCartQTY = (
  product: Product | undefined,
  cart: Basket | undefined,
) => {
  let qty = 1;
  cart?.orderProducts?.find((orderProduct) => {
    if (orderProduct.product?.id == product?.id) {
      qty = orderProduct.qty!;
    }
  });
  return qty;
};

export { findCartQTY };
