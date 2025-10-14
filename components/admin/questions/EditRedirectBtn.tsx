import { Button, Tooltip } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { handleRedirectProductDetail } from './helpers';

export const EditRedirectBtn = ({ id }) => {
  const router = useRouter();
  return (
    <Tooltip title="Посмотреть">
      <Button
        type="default"
        shape="circle"
        icon={<LaptopOutlined />}
        onClick={handleRedirectProductDetail(id, router)}
      />
    </Tooltip>
  );
};
