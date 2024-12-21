import { Product, Basket } from 'swagger/services';
import { AppDispatch } from 'redux/store';
import { updateCart } from 'redux/slicers/store/cartSlicer';

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

export { handleItemCountChange };
