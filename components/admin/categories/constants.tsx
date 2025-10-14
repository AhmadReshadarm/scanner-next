import { ColumnsType } from 'antd/lib/table';
import { Category } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteCategory, handleRedirectCategory } from './helpers';
import styles from './categories.module.scss';
import { Image } from 'antd';
import { imageFallback } from 'common/constants';

const columns: ColumnsType<Category> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'Изображение',
    dataIndex: 'image',
    render: (_, record) => {
      return (
        <Image
          src={`/api/images/${record?.image}`}
          className={styles.image}
          fallback={imageFallback}
        />
      );
    },
    width: '10%',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    width: '15%',
  },
  {
    title: 'Дата изменения',
    dataIndex: 'updatedAt',
    width: '15%',
  },
  {
    title: 'Url',
    dataIndex: 'url',
    width: '15%',
  },
  {
    title: 'Родитель',
    dataIndex: 'parent',
    render: (parent) => <div>{parent?.name}</div>,
    width: '14%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteCategory}
          handleRedirect={handleRedirectCategory}
          option={'categories'}
          title="категорию"
        />
      );
    },
    width: '11%',
  },
];

export { columns };
