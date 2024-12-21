import { Carousel, Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { imageFallback } from 'common/constants';
import { Question } from 'swagger/services';
// import { handleRedirectBrands } from '../brands/helpers';
import { handleRedirectProduct } from '../categories/helpers';

import TableLink from '../products/TableLink';
import styles from './products.module.scss';
import { EditRedirectBtn } from './EditRedirectBtn';
import { Role } from 'common/enums/roles.enum';

export const columns: ColumnsType<Question> = [
  {
    title: 'Вопрос ID',
    dataIndex: 'id',
    width: '2.5%',
  },
  {
    title: 'Изображения',
    dataIndex: 'images',
    render: (_, record) => {
      if (record.product) {
        const imagesString = record.product.productVariants![0]
          ? record.product.productVariants![0].images
          : '';
        const images = imagesString?.split(', ');
        return (
          <div
            style={{
              width: '120px',
              height: '120px',
            }}
          >
            <Carousel effect="fade">
              {(images as unknown as string[])?.map((image) => {
                if (image) {
                  return (
                    <div>
                      <Image
                        className={styles.productsTable__contentStyle}
                        src={`/api/images/${image.trim()}`}
                        fallback={imageFallback}
                      />
                    </div>
                  );
                }
                return (
                  <img src="/img_not_found.png" className={styles.image} />
                );
              })}
            </Carousel>
          </div>
        );
      }
    },
    width: '10%',
  },
  {
    title: 'Вопрос о товаре',
    dataIndex: 'text',
    width: '7.5%',
  },
  {
    title: 'Пользователь',
    dataIndex: 'user',
    render: (_, record) => {
      return (
        <span>
          {record.user?.role == Role.Admin ? 'Admin' : record.user?.email}
        </span>
      );
    },
    width: '7.5%',
  },
  {
    title: 'URL-адрес товара',
    render: (_, record) => {
      return (
        <TableLink
          id={record.product?.url as string}
          name={record.product?.url as string}
          handleRedirect={handleRedirectProduct}
        />
      );
    },
    width: '7.5%',
  },

  {
    title: 'Действия',
    render: (_, record) => {
      return <EditRedirectBtn id={record.id} />;
    },
    width: '7.5%',
  },
];
