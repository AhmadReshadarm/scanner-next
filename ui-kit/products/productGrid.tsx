import { getAnimationDelay } from './helpers';
import ProductItem from './productItem';
import { LoaderItem } from './Loader';
import { emptyLoading } from 'common/constants';
import { useAppSelector } from 'redux/hooks';
import { TCatalogState } from 'redux/types';
import styles from './styles/productGrid.module.css';

const ProductGrid = () => {
  const { products, loading, productsLoading } = useAppSelector<TCatalogState>(
    (state) => state.catalog,
  );
  const delay = getAnimationDelay(products.length);

  return (
    <>
      {products.length !== 0 && !productsLoading ? (
        <ul className={styles.Grid}>
          <>
            {!productsLoading
              ? products.map((product, index) => {
                  return (
                    <ProductItem
                      key={`product-item-${index}`}
                      product={product}
                      custom={delay[index]}
                    />
                  );
                })
              : emptyLoading.map((item, index) => {
                  return <LoaderItem index={index} />;
                })}
          </>
        </ul>
      ) : products.length === 0 && !productsLoading ? (
        <div className={styles.EmptyProductsTitle}>
          <h3>
            Слишком много фильтров, или товар, который вы ищете, у нас
            недоступен. Попробуйте «сбросить фильтры» и повторите поиск.
          </h3>
        </div>
      ) : (
        <ul className={styles.Grid}>
          {emptyLoading.map((item, index) => {
            return <LoaderItem index={index} />;
          })}
        </ul>
      )}
    </>
  );
};

export default ProductGrid;
