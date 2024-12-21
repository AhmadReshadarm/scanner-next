import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { baseUrl } from 'common/constant';
import styles from '../genral-styles/404.module.css';

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Страница не найдена | NBHOZ 404</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <div className={styles.Container}>
        <div className={styles.ContentBackground} />
        <div className={styles.Wrapper}>
          <div className={styles.Content}>
            <h1 className={styles.Error}>404 ОШИБКА</h1>
            <div className={styles.ContentWrapper}>
              <h2>Упс.. Кажется, такой страницы не существует</h2>
              <h4>Пожалуйста, перезагрузите страницу</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NotFound.PageLayout = StoreLayout;
export default NotFound;
