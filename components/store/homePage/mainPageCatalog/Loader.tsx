import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { InfoContainer } from './CatalogModal';
import { InfoBtnWrappers, InfoWrappers } from './DropDownsParrent';
import { emptyLoading } from 'common/constants';

const Loader = () => {
  return (
    <>
      <HeaderWrapper>
        <div className="header-title-wrapper">
          <LoaderMask style={{ width: '100px', height: '30px' }} />
        </div>
      </HeaderWrapper>
      <CatalogContentWrapper>
        <ImageSliderWrapper>
          <SliderSlide>
            <LoaderMask style={{ width: '100%', height: '100%' }} />
          </SliderSlide>
        </ImageSliderWrapper>
        <InfoContainer>
          {emptyLoading.map((item, index) => {
            return (
              <InfoWrappers key={index}>
                <InfoBtnWrappers>
                  <div className="dropdown-btn-wrapper">
                    <LoaderMask style={{ width: '100%', height: '40px' }} />
                  </div>
                </InfoBtnWrappers>
              </InfoWrappers>
            );
          })}
        </InfoContainer>
      </CatalogContentWrapper>
    </>
  );
};

const LoaderMask = styled.div`
  border-radius: 5px;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid ${color.textSecondary};
  position: relative;
  .header-title-wrapper {
    max-width: 1500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30px 20px 0;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-end;
    border-bottom: 20px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 40px;
    right: 0;
  }
`;

const CatalogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  gap: 100px;
  @media ${devices.laptopS} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 30px;
  }

  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 30px;
  }
`;

const ImageSliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  min-height: 650px;
  max-height: 650px;
  @media ${devices.laptopS} {
    display: none;
  }
  @media ${devices.tabletL} {
    display: none;
  }
  @media ${devices.tabletS} {
    display: none;
  }
  @media ${devices.mobileL} {
    display: none;
  }
  @media ${devices.mobileM} {
    display: none;
  }
  @media ${devices.mobileS} {
    display: none;
  }
`;

const SliderSlide = styled.div`
  width: 80%;
  height: 100%;
  position: absolute;
  right: 50px;
  top: 0;
`;

export default Loader;
