import { UploadOutlined } from '@ant-design/icons';
import { Button, Progress, Upload } from 'antd';
import { useMultipleUploadImage } from 'common/hooks/useMultipleUploadImage';

interface Props {
  fileList: any[];
  index: number;
  isProduct?: boolean;
}

const MultipleImageUpload = ({ fileList, isProduct, index }: Props) => {
  const { uploadImage, progress, handleRemoveImage } = useMultipleUploadImage(
    index,
  );

  return (
    <>
      <Upload
        listType="picture"
        customRequest={uploadImage}
        fileList={fileList}
        onRemove={handleRemoveImage}
      >
        {(isProduct || fileList.length < 1) && (
          <Button icon={<UploadOutlined />}> Загрузить</Button>
        )}
      </Upload>
      {progress > 0 && <Progress percent={progress} />}
    </>
  );
};

export default MultipleImageUpload;
