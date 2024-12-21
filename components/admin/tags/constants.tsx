import { ColumnsType } from 'antd/lib/table';
import { Tag } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteTag, handleRedirectTags } from './helpers';

const columns: ColumnsType<Tag> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '15%',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    width: '35%',
  },
  {
    title: 'Url',
    dataIndex: 'url',
    width: '35%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteTag}
          handleRedirect={handleRedirectTags}
          option={'tags'}
          title="тег"
        />
      );
    },
    width: '15%',
  },
];

export { columns };
