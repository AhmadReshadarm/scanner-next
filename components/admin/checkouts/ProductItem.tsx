import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { formatNumber } from 'common/helpers/number.helper';
import Link from 'next/link';
import { OrderProduct } from 'swagger/services';

type Props = {
  orderProduct: OrderProduct;
};
const ProductItem: React.FC<Props> = ({ orderProduct }) => {
  const curVariant = orderProduct.productVariant
    ? orderProduct.productVariant
    : orderProduct.product?.productVariants![0]
    ? orderProduct.product?.productVariants![0]
    : ({} as any);

  const images = getProductVariantsImages(
    orderProduct.product?.productVariants,
  );

  return (
    <div className="product">
      <div className="image-wrapper">
        <Link href={`/product/${orderProduct.product?.url}`}>
          <img
            src={`/api/images/${images ? images[0] : ''}`}
            alt={orderProduct.product?.name}
          />
        </Link>
      </div>
      <div className="product-image-column">
        <Link href={`/product/${orderProduct.product?.url}`}>
          {orderProduct.product?.name}
        </Link>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            gap: '20px',
          }}
        >
          <b>
            <span>{formatNumber(curVariant.price)} ₽</span>
            {curVariant.oldPrice && (
              <span className="discount">
                {formatNumber(curVariant.oldPrice)} ₽
              </span>
            )}
          </b>
          <span>{orderProduct.qty} шт</span>
        </div>
      </div>
      {orderProduct.productVariant?.color?.name !== '_' ? (
        <div className="color-wrapper">
          <span>Цвет: {orderProduct.productVariant?.color?.name}</span>
          <span
            style={{
              backgroundColor: `${orderProduct.productVariant?.color?.code}`,
              borderRadius: '50%',
              padding: '5px',
              width: '15px',
              height: '15px',
            }}
          ></span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProductItem;
