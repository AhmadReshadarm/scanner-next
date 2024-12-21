import styled from 'styled-components';
import color from '../../lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import {
  GeolocationControl,
  Map,
  SearchControl,
  ZoomControl,
} from 'react-yandex-maps';
import { useState, useRef, useEffect } from 'react';
import { initialStateAdress } from './constant';

const mapOptions = {
  modules: ['geocode', 'SuggestView'],
  defaultOptions: { suppressMapOpenBlock: true },
  width: '100%',
  height: '100%',
};

const geolocationOptions = {
  defaultOptions: {
    maxWidth: 300,
  },
  defaultData: { content: 'Определить местоположение' },
};

const MapContainer = (props: any) => {
  const { viewport, setViewPort, setAddress, mapRef, setPostCode } = props;

  const [mapConstructor, setMapConstructor]: [any, any] = useState(null);

  const searchRef = useRef(null);
  const handleBoundsChange = (e) => {
    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get('text');
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialStateAdress.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setViewPort((prevState) => ({ ...prevState, address: foundAddress }));
      }
    });
  };
  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        'select',
        function (e) {
          const selectedName = e.get('item').value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setViewPort((prevState) => ({ ...prevState, center: newCoords }));
          });
        },
      );
    }
  }, [mapConstructor]);
  useEffect(() => {
    setAddress(viewport.address);
  }, [viewport]);
  return (
    <MapContianerWrapper>
      <input
        style={{ display: 'none' }}
        ref={searchRef}
        placeholder="Search..."
        disabled={!mapConstructor}
      />
      <Map
        {...mapOptions}
        state={viewport}
        onLoad={setMapConstructor}
        onBoundsChange={handleBoundsChange}
        instanceRef={mapRef}
      >
        <span className="placemark">
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
              fill="#1976D2"
            />
          </svg>
        </span>
        <GeolocationControl {...geolocationOptions} />
        <ZoomControl />
        <SearchControl
          options={{
            float: 'left',
            noSuggestPanel: 'true',
          }}
        />
      </Map>
    </MapContianerWrapper>
  );
};

const MapContianerWrapper = styled.div`
  width: 60%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-contente: center;
  align-items: flex-end;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  .mapboxgl-map {
    width: 100%;
    height: 100%;
  }
  .ymaps-2-1-79-float-button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .placemark {
    width: 14px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 1200;
    fontsize: 35px !important;
    cursor: grab;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  @media ${devices.laptopS} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.tabletL} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.tabletS} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.mobileL} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.mobileM} {
    width: 95vw;
    height: 75vh;
  }
  @media ${devices.mobileS} {
    width: 95vw;
    height: 75vh;
  }
`;

export default MapContainer;
