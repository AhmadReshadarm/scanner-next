import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import styles from '../genral-styles/error.module.css';
const Error = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Ошибка Сервиса | NBHOZ 500</title>
      </Head>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <div className={styles.Content}>
            <h1 className={styles.ErrorWrapper}>500 ОШИБКА</h1>
            <div className={styles.ContentWrapper}>
              <h2>Упс..Кажется, что-то сломалось или же это Ошибка Сервиса</h2>
              <h4>
                Мы знаем о проблеме и уже работаем над ней. Попробуйте зайти
                позже. Спасибо за Ваш выбор. С Уважением, Ваш NBHOZ
              </h4>
            </div>
            <span>
              <p>
                {statusCode
                  ? `An error ${statusCode} occurred on server`
                  : 'An error occurred on client'}
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

// export default Error;
Error.PageLayout = StoreLayout;
export default Error;
