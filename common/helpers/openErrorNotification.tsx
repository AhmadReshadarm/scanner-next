// import { ExclamationOutlined } from '@ant-design/icons';
import ExclamationOutlined from '@ant-design/icons/ExclamationOutlined';
// import { notification } from 'antd';
import notification from 'antd/es/notification';

export const openErrorNotification = (message: string) => {
  const args = {
    message,
    duration: 5,
    icon: <ExclamationOutlined className="exclamation-icon" />,
  };
  notification.open(args);
};
