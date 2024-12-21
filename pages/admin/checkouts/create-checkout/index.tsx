import AdminLayout from 'components/admin/adminLayout/layout';
import ManageCheckoutFrom from 'components/admin/checkouts/ManageCheckoutForm';
import Head from 'next/head';

const createCheckout = () => {
  const title = 'Создание Заказ';

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Заказы {`>`} Создание Заказа | NBHOZ
        </title>
      </Head>
      <ManageCheckoutFrom title={title} />
    </>
  );
};

createCheckout.PageLayout = AdminLayout;
export default createCheckout;
