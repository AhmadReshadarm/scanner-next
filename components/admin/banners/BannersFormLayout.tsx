import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearBanners,
  fetchAdvertisement,
  fetchSlides,
} from 'redux/slicers/bannersSlicer';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import AdvertisementForm from './AdvertisementForm';
import SlidesForm from './SlidesForm';

const { TabPane } = Tabs;

const BannersFormLayout = () => {
  const isSaveLoading = useAppSelector((state) => state.banners.saveLoading);
  const isLoading = useAppSelector((state) => state.banners.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdvertisement());
    return () => {
      dispatch(clearBanners());
    };
  }, []);

  const handleChangeTab = (e) => {
    switch (e) {
      case '1':
        dispatch(clearImageList());
        dispatch(clearBanners());
        dispatch(fetchAdvertisement());
        break;
      case '2':
        dispatch(clearImageList());
        dispatch(clearBanners());
        dispatch(fetchSlides());
        break;
    }
  };

  return (
    <>
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={(e) => {
            handleChangeTab(e);
          }}
        >
          <TabPane tab="Реклама" key="1">
            <AdvertisementForm
              isSaveLoading={isSaveLoading}
              isLoading={isLoading}
            />
          </TabPane>
          <TabPane tab="Баннеры" key="2">
            <SlidesForm isSaveLoading={isSaveLoading} isLoading={isLoading} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default BannersFormLayout;
