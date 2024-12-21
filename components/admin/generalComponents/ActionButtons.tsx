import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import { AppContext } from 'common/context/AppContext';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styles from './index.module.scss';

type Props = {
  id: string;
  handleRedirect?: Function;
  handleDelete: Function;
  option: string;
  title: string;
};

const ActionButtons: React.FC<Props> = ({
  id,
  handleRedirect,
  handleDelete,
  option,
  title,
}) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const isLoading = useAppSelector((state) => state[option].loading);
  const dispatch = useAppDispatch();

  const { offset, setOffset } = useContext(AppContext);

  const showOrDontModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      {handleRedirect && (
        <span>
          <Tooltip title="Изменить">
            <Button
              type="default"
              shape="circle"
              icon={<EditOutlined />}
              onClick={handleRedirect(id, router)}
            />
          </Tooltip>
        </span>
      )}
      <span className={styles.deleteButtonSpan}>
        <Tooltip title="Удалить">
          <Button
            type="default"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={showOrDontModal}
          />
        </Tooltip>
      </span>
      <Modal
        title="Подтвердите действие."
        open={visible}
        onOk={handleDelete(id, dispatch, setVisible, offset)}
        confirmLoading={isLoading}
        onCancel={showOrDontModal}
      >
        <p>
          Вы уверены, что хотите удалить {title} с ID {id}?
        </p>
      </Modal>
    </>
  );
};

export default ActionButtons;
