import { Tabs } from 'antd';
import { useAppDispatch } from 'redux/hooks';
import { fetchAdvertisement, fetchSlides } from 'redux/slicers/bannersSlicer';
import AdvertisementTab from './AdvertisementTab';
import SlidesTab from './SlidesTab';

const { TabPane } = Tabs;

const BannersLayout = () => {
  const dispatch = useAppDispatch();

  const handleTabChange = (e) => {
    switch (e) {
      case '1':
        dispatch(fetchAdvertisement());
        break;
      case '2':
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
            handleTabChange(e);
          }}
        >
          <TabPane tab="Реклама" key="1">
            <AdvertisementTab />
          </TabPane>
          <TabPane tab="Баннеры" key="2">
            <SlidesTab />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default BannersLayout;
