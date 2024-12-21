import dynamic from 'next/dynamic';
const WeRecomend = dynamic(() => import('./WeRecomend'));
const BuyTogether = dynamic(() => import('./BuyTogether'));
import styles from '../styles/recomendationMain.module.css';

const Recomendation = ({ product }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <WeRecomend product={product} />
          <BuyTogether product={product} />
        </div>
      </div>
    </div>
  );
};

export default Recomendation;
