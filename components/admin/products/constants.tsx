import { Carousel, Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { imageFallback } from 'common/constants';
import { Product, ProductVariant, Tag } from 'swagger/services';
import { handleRedirectCategory } from '../categories/helpers';

import ActionButtons from '../generalComponents/ActionButtons';
import { handleRedirectTags } from '../tags/helpers';
import { handleDeleteProduct, handleRedirectProducts } from './helpers';
import styles from './products.module.scss';
import TableLink from './TableLink';

export const columns: ColumnsType<Product> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '3.5%',
  },
  {
    title: 'Изображения',
    dataIndex: 'images',
    render: (_, record) => {
      if (record.productVariants) {
        const images: string[] = [];
        record.productVariants.map((variant: any) => {
          const variantImages = variant.images?.split(', ');
          variantImages.map((image) => {
            images.push(image);
          });
        });

        return (
          <div
            style={{
              width: '120px',
              height: '120px',
            }}
          >
            <Carousel effect="fade">
              {(images as unknown as string[])?.map((image, index) => {
                if (image) {
                  return (
                    <div key={`${image}-${index}`}>
                      <Image
                        className={styles.productsTable__contentStyle}
                        src={`/api/images/${image}`}
                        fallback={imageFallback}
                      />
                    </div>
                  );
                }
                return (
                  <img
                    key={'not-found-key'}
                    src="/img_not_found.png"
                    className={styles.image}
                  />
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
    title: 'Имя',
    dataIndex: 'name',
    width: '7.5%',
  },
  {
    title: 'Категория',
    render: (_, record) => {
      return (
        <TableLink
          id={record.category!.id as string}
          name={record.category!.name as string}
          handleRedirect={handleRedirectCategory}
        />
      );
    },
    width: '7.5%',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    render: (_, record) => {
      return (
        <>
          <a
            target="__blank"
            href={`/product/${record.url}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '5px',
            }}
            title={record.url}
          >
            {record.url?.slice(0, 20)}
            <img
              src="/icons/blank.png"
              alt="target blank"
              style={{ width: '10px' }}
            />
          </a>
        </>
      );
    },
    width: '10%',
  },
  {
    title: 'Теги',
    dataIndex: 'tags',
    render: (_, record) => {
      return (
        <ul>
          {(record?.tags as Tag[]).map((tag) => (
            <li key={tag.id}>
              <TableLink
                id={tag!.id as string}
                name={tag!.name as string}
                handleRedirect={handleRedirectTags}
              />
            </li>
          ))}
        </ul>
      );
    },
    width: '8.5%',
  },
  {
    title: 'Артикул | Цена | Статус на складе',
    dataIndex: 'price',
    render: (_, record) => {
      return (
        <ul>
          {(record?.productVariants as ProductVariant[]).map((variant) => (
            <li
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '5px',
              }}
              key={variant.id}
            >
              <span>{variant.artical}</span>
              <span> | </span>
              <span>{variant.price} ₽</span>
              <span> | </span>
              <span>В наличии</span>
              <span>:</span>
              <span>{variant.available ? 'да' : 'нет'}</span>
            </li>
          ))}
        </ul>
      );
    },
    width: '15%',
  },

  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteProduct}
          handleRedirect={handleRedirectProducts}
          option={'products'}
          title="продукт"
        />
      );
    },
    width: '7.5%',
  },
];
