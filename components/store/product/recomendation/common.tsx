import { Product } from 'swagger/services';
import ProductItem from 'ui-kit/products/productItem';
import { LoaderItem } from 'ui-kit/products/Loader';
import { emptyLoading } from 'common/constants';
import styles from '../styles/RecomendationSub.module.css';
type Props = {
  products: Product[];
  loading: boolean;
};
const ProductFlex: React.FC<Props> = ({ products, loading }) => {
  return (
    <div className={styles.FlexWrapper}>
      <ul className={styles.SliderWrapper}>
        {!loading
          ? products?.map((product, index) => {
              return (
                <ProductItem
                  key={`product-item-${index}`}
                  product={product}
                  custom={index * 0.05}
                />
              );
            })
          : emptyLoading.map((item, index) => {
              return <LoaderItem index={index} />;
            })}
      </ul>
    </div>
  );
};

const ProductFlexEmpty = () => {
  return (
    <div className={styles.FlexWrapper}>
      <ul className={styles.SliderWrapper}>
        {emptyLoading.map((item, index) => {
          return <LoaderItem index={index} />;
        })}
      </ul>
    </div>
  );
};

export { ProductFlex, ProductFlexEmpty };
