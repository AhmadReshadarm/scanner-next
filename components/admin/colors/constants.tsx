import { ColumnsType } from 'antd/lib/table';
import { Color } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteColor, handleRedirectColors } from './helpers';

const colorBoxStyle = {
  width: '20px',
  height: '20px',
  border: 'solid 1px #dfdfdf',
  marginBottom: '2px',
  borderRadius: '2px',
};

export const columns: ColumnsType<Color> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: 'Url',
    dataIndex: 'url',
    width: '30%',
  },
  {
    title: 'Код',
    dataIndex: 'code',
    width: '15%',
  },
  {
    title: 'Цвет',
    render: (_, record) => {
      return (
        <div style={{ ...colorBoxStyle, backgroundColor: record.code }}></div>
      );
    },
    width: '10%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteColor}
          handleRedirect={handleRedirectColors}
          option={'colors'}
          title="цвет"
        />
      );
    },
    width: '10%',
  },
];
