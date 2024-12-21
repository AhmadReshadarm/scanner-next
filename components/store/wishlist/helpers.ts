import { Product, Basket } from 'swagger/services';
import { updateCart, clearCart } from 'redux/slicers/store/cartSlicer';
import { AppDispatch } from 'redux/store';
import { fetchWishlistProducts } from 'redux/slicers/store/wishlistSlicer';

const handleItemRemove = async (dispatch: AppDispatch) => {
  const wishlistId = localStorage.getItem('wishlistId') ?? '';

  dispatch(fetchWishlistProducts(wishlistId));
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

export { handleItemRemove, handleItemCountChange, handleRemoveClick };
