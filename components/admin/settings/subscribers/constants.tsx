import { ColumnsType } from 'antd/lib/table';
import { SubscribersResponse } from 'swagger/services';
import ActionButtons from '../../generalComponents/ActionButtons';
import { handleDeleteUser } from './helpers';

export const columns: ColumnsType<SubscribersResponse> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'Имя',
    render: (_, record) => {
      if (record.name) {
        return <p>{record.name}</p>;
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
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.email as string}
          handleDelete={handleDeleteUser}
          option={'subscribers'}
          title="подписчик"
        />
      );
    },
    width: '15%',
  },
];
