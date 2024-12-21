import { Button, Form, Spin, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Advertisement } from 'swagger/services';
import FormItem from '../generalComponents/FormItem';
import { handleFormSubmitBanner } from './helpers';
import styles from './index.module.scss';
import { ManageAdvertisementFields } from './manageAdvertisementFields';
import { handleFalsyValuesCheck } from 'common/helpers/handleFalsyValuesCheck.helper';

interface Props {
  isLoading: boolean;
  isSaveLoading: boolean;
}

const AdvertisementForm = ({ isLoading, isSaveLoading }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const advertisement: Advertisement = useAppSelector<Advertisement[]>(
    (state) => state.banners.advertisement,
  )[0];

  const initialValues: Advertisement = {
    title: advertisement?.title ?? '',
    description: advertisement?.description ?? '',
  };

  useEffect(() => {
    if (advertisement) {
      setTitle(advertisement?.title ?? '');
      setDesc(advertisement?.description ?? '');
    }
  }, [advertisement]);

  const isDisabled: boolean = handleFalsyValuesCheck(title, desc);

  return (
    <>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <>
          <Form
            layout="vertical"
            form={form}
            initialValues={initialValues}
            requiredMark={true}
            className={styles.updateBannerForm}
            onFinish={handleFormSubmitBanner(
              router,
              dispatch,
              'imageList',
              'advertisement',
              Number.parseInt(advertisement?.id!),
            )}
          >
            <FormItem
              option={ManageAdvertisementFields.Title}
              children={
                <Input
                  required={true}
                  placeholder="Введите имя бренда"
                  onChange={(e) => setTitle(e.target.value)}
                />
              }
            />
            <FormItem
              option={ManageAdvertisementFields.Desc}
              children={
                <TextArea
                  required={true}
                  rows={4}
                  placeholder="Краткое описание"
                  onChange={(e) => setDesc(e.target.value)}
                />
              }
            />
            <Form.Item className={styles.updateBannerForm__buttonsStack}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.updateBannerForm__buttonsStack__submitButton}
                loading={isSaveLoading}
                disabled={isDisabled}
              >
                Сохранить
              </Button>
              <Button
                type="primary"
                onClick={navigateTo(router, Page.ADMIN_BANNERS)}
              >
                Вернуться назад
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default AdvertisementForm;
