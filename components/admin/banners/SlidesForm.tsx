import { Button, Form, Input, Spin } from 'antd';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultSingleImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import styled from 'styled-components';
import { Image } from 'swagger/services';
import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import { handleFormSubmitBanner, handleGetImage } from './helpers';
import styles from './index.module.scss';
import { ManageSlidesFields } from './manageSlidesFields';
import { TBannerState } from 'redux/types';
import { addSlide, removeSlide } from 'redux/slicers/bannersSlicer';
import DatabaseImages from 'ui-kit/DatabaseImages';
import { InsertRowLeftOutlined } from '@ant-design/icons';
interface Props {
  isLoading: boolean;
  isSaveLoading: boolean;
}

const SlidesForm = ({ isLoading, isSaveLoading }: Props) => {
  const dispatch = useAppDispatch();
  const [links, setLinks] = useState<any>({});
  const [form] = Form.useForm();
  const router = useRouter();
  const { slides } = useAppSelector<TBannerState>((state) => state.banners);
  const imageList = useAppSelector<Image[]>((state) => state.images.imageList);

  const initialValues = {
    link1: slides[0]?.link,
    link2: slides[1]?.link,
    link3: slides[2]?.link,
    link4: slides[3]?.link,
    link5: slides[4]?.link,
  };

  useEffect(() => {
    if (slides.length) {
      const linksMap = slides?.reduce((accum, slide, index) => {
        accum[index] = slide.link;
        return accum;
      }, {});

      setLinks(linksMap);
    }
  }, [slides]);

  useEffect(() => {
    if (slides) {
      slides.forEach((slide, i) => {
        dispatch(
          setDefaultSingleImageList({
            uid: i + 1,
            name: slide?.image,
            url: `/api/images/${slide?.image}`,
          }),
        );
      });
    }
    return () => {
      dispatch(clearImageList());
    };
  }, [isLoading]);

  const handleLinkChange = (index: number) => (e) => {
    setLinks({
      ...links,
      [index]: e.target.value,
    });
  };

  const handleAddSlide = () => {
    dispatch(addSlide({ link: '' }));
  };

  const handleRemove = (index) => () => {
    dispatch(removeSlide(index));
  };
  const [isOpen, setOpen] = useState(false);
  const [selecteIndex, setSelectedIndex] = useState(1);
  return (
    <>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <div>
          <Form
            layout="vertical"
            form={form}
            requiredMark={true}
            className={styles.updateBannerForm}
            initialValues={initialValues}
            onFinish={handleFormSubmitBanner(
              router,
              dispatch,
              imageList,
              'slides',
            )}
          >
            {slides.map((slide, index) => {
              return (
                <SlideItem key={`slides-${index + 1}`}>
                  {index + 1}
                  <FormItem
                    option={`${ManageSlidesFields.Link}${index + 1}`}
                    children={
                      <Input
                        onChange={handleLinkChange(index + 1)}
                        required={true}
                        placeholder="Введите ссылку"
                      />
                    }
                  />
                  <FormItem
                    option={undefined}
                    children={
                      <>
                        <ImageUpload
                          fileList={handleGetImage(index + 1, imageList)}
                          isProduct={false}
                          slideNum={index + 1}
                        />
                        <ButtonDevider>
                          {imageList.length < slides.length ? (
                            <Button
                              onClick={() => {
                                setSelectedIndex(index + 1);
                                setOpen(true);
                              }}
                              icon={<InsertRowLeftOutlined />}
                            >
                              Выбрать из базы данных
                            </Button>
                          ) : (
                            ''
                          )}
                        </ButtonDevider>
                        <DatabaseImages
                          isProducts={false}
                          setOpen={setOpen}
                          isOpen={isOpen}
                          slideNum={selecteIndex}
                        />
                      </>
                    }
                  />
                  <span onClick={handleRemove(index)}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 21 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="1"
                        y1="-1"
                        x2="26.3541"
                        y2="-1"
                        transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <line
                        x1="1"
                        y1="-1"
                        x2="26.3044"
                        y2="-1"
                        transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </SlideItem>
              );
            })}
            <Button
              onClick={handleAddSlide}
              type="primary"
              disabled={slides.length === 5}
              style={{ marginBottom: '20px' }}
            >
              Добавить слайд
            </Button>
            {/*--------------THE END--------------*/}
            <Form.Item className={styles.updateBannerForm__buttonsStack}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.updateBannerForm__buttonsStack__submitButton}
                loading={isSaveLoading}
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
        </div>
      )}
    </>
  );
};

const SlideItem = styled.div`
  position: relative;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`;

const ButtonDevider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 20px 0;
`;

export default SlidesForm;
