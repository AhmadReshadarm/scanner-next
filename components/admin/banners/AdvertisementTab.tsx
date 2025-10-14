import { Spin } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styles from './index.module.scss';
import styled from 'styled-components';
import { useEffect } from 'react';
import { fetchAdvertisement, clearBanners } from 'redux/slicers/bannersSlicer';

const AdvertisementTab = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.banners.advertisement);
  const loading = useAppSelector((state) => state.banners.advertisementLoading);

  useEffect(() => {
    dispatch(fetchAdvertisement());
    return () => {
      dispatch(clearBanners());
    };
  }, []);
  return (
    <>
      {loading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Wrapper>
          {data.map((banner, index) => {
            return (
              <div key={index}>
                <div className="title-wrapper">
                  <h1>{banner.title}</h1>
                </div>
                <div className="description-wrapper">
                  <p>{banner.description}</p>
                </div>
              </div>
            );
          })}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 50px;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 50px;
    .title-wrapper {
      width: 65%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      h1 {
        width: 100%;
        text-align: left;
      }
    }
    .description-wrapper {
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      p {
        width: 100%;
        text-align: left;
      }
    }
  }
`;

export default AdvertisementTab;
