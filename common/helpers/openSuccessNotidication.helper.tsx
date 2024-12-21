// import { CheckOutlined } from '@ant-design/icons';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
// import { notification } from 'antd';
import notification from 'antd/es/notification';

export const openSuccessNotification = (message: string) => {
  const args = {
    message,
    duration: 5,
    icon: <CheckOutlined className="success-icon" />,
  };
  notification.open(args);
};
