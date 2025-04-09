// import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Tag } from 'swagger/services';
import styles from './tags.module.scss';
import { handleFormSubmit } from './helpers';
import { ManageTagFields } from './ManageTagFields.enum';
import FormItem from '../../admin/generalComponents/FormItem';
import { useEffect, useState } from 'react';
import { handleFalsyValuesCheck } from '../../../common/helpers/handleFalsyValuesCheck.helper';

const { Option } = Select;

type Props = {
  tag?: Tag;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageTagForm = ({
  title,
  tag,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (tag) {
      setName(tag?.name);
      setUrl(tag?.url);
    }
  }, [tag]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = {
    name: tag?.name,
    url: tag?.url,
  };

  const isDisabled: boolean = handleFalsyValuesCheck(name, url);

  return (
    <div style={{ padding: '50px' }}>
      <div className={styles.createTagHeader}>
        <h1 className={styles.createTagHeader__title}>{title}</h1>
      </div>
      {(isLoading || !tag) && editMode ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmit(router, dispatch)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createTagForm}
        >
          <FormItem
            option={ManageTagFields.Name}
            children={
              <Input
                required={true}
                placeholder="Введите имя база данных"
                onChange={(e) => setName(e.target.value)}
              />
            }
          />
          <FormItem
            option={ManageTagFields.Url}
            children={
              <Input
                required={true}
                placeholder="Введите Ссылка на базу данных"
                onChange={(e) => setUrl(e.target.value)}
                disabled={editMode}
              />
            }
          />
          <Form.Item className={styles.createTagForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createTagForm__buttonsStack__submitButton}
              loading={isSaveLoading}
              disabled={isDisabled}
            >
              {tag ? 'Сохранить' : 'Создать'}
            </Button>
            <Button type="primary" onClick={navigateTo(router, Page.HOME)}>
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ManageTagForm;
