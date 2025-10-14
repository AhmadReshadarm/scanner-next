import { ColumnsType } from 'antd/lib/table';
import { User } from 'swagger/services';
import ActionButtons from '../../generalComponents/ActionButtons';
import { handleDeleteUser } from './helpers';
import styles from './settings.module.scss';
import { Image } from 'antd';
import { imageFallback } from 'common/constants';

export const columns: ColumnsType<User> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'Изображение',
    render: (_, record) => {
      if (record.image) {
        return (
          <Image
            src={`/api/images/${record?.image}`}
            className={styles.image}
            fallback={imageFallback}
          />
        );
      }
      return <img src="/img_not_found.png" className={styles.image} />;
    },
    width: '10%',
  },
  {
    title: 'Имя',
    render: (_, record) => {
      if (record.firstName) {
        return <p>{record.firstName}</p>;
      }
    },
    width: '15%',
  },
  {
    title: 'Фамилия',
    render: (_, record) => {
      if (record.lastName) {
        return <p>{record.lastName}</p>;
      }
    },
    width: '15%',
  },
  {
    title: 'email',
    render: (_, record) => {
      if (record.email) {
        return <p>{record.email}</p>;
      }
    },
    width: '20%',
  },

  {
    title: 'Роль пользователя',
    dataIndex: 'role',
    render: (_, record) => {
      return <span>{record.role}</span>;
    },
    width: '10%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteUser}
          // handleRedirect={handleRedirectNewsPost}
          option={'auth'}
          title="Пользователи"
        />
      );
    },
    width: '15%',
  },
];
