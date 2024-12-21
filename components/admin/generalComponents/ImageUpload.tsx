import { UploadOutlined } from '@ant-design/icons';
import { Button, Progress, Upload } from 'antd';
import { useUploadImage } from 'common/hooks/useUploadImage';
import styled from 'styled-components';

interface Props {
  fileList: any[];
  isProduct?: boolean;
  slideNum?: number;
}

const ImageUpload = ({ fileList, isProduct, slideNum }: Props) => {
  const {
    uploadImage,
    progress,
    setCatalogUpload,
    handleRemoveImage,
  } = useUploadImage(slideNum);

  return (
    <>
      <Upload
        listType="picture"
        customRequest={uploadImage}
        fileList={fileList}
        onRemove={handleRemoveImage}
      >
        <Wrapper>
          <label htmlFor="uploadBtn">
            Размер изображения должен быть 820 x 1024 пикселей.
          </label>
          {(isProduct || fileList.length < 1) && (
            <Button
              onClick={() =>
                setCatalogUpload(!isProduct && !slideNum ? true : false)
              }
              id="uploadBtn"
              icon={<UploadOutlined />}
            >
              Загрузить
            </Button>
          )}
        </Wrapper>
      </Upload>
      {progress > 0 && <Progress percent={progress} />}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
`;

export default ImageUpload;
