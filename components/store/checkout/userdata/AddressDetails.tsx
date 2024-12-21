import TextField from '@mui/material/TextField';
import { InputsTooltip } from '../helpers';
import React from 'react';
import { DetailsRowWrapper, DetailsColumnWrapper } from './common';

const AddressDetails = (props: any) => {
  const {
    postCode,
    setPostCode,
    roomOrOffice,
    setRoomOrOffice,
    door,
    setDoor,
    floor,
    setFloor,
    rignBell,
    setRingBell,
  } = props;
  return (
    <>
      <DetailsRowWrapper justifycontent="space-between">
        <DetailsColumnWrapper>
          <label htmlFor="address-room">
            <b>
              <span>Квартира/офис</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="address-room-tip"
              title={
                <React.Fragment>
                  <span>Это поле не обязательно к заполнению</span>
                  <span>Пример: 222</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <TextField
            id="address-room"
            fullWidth
            label="Квартира/офис"
            multiline
            rows={1}
            value={roomOrOffice}
            defaultValue=""
            onChange={(e) => setRoomOrOffice(e.target.value)}
          />
        </DetailsColumnWrapper>
        <DetailsColumnWrapper>
          <label htmlFor="address-postcode">
            <b>
              <span>Индекс</span>
              {/* <span className="required">*</span> */}
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="address-postcode-tip"
              title={
                <React.Fragment>
                  {/* <span>Это поле не обязательно к заполнению</span> */}
                  <span>Пример: 117279</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <TextField
            id="address-postcode"
            fullWidth
            label="Индекс"
            multiline
            rows={1}
            value={postCode}
            defaultValue=""
            onChange={(e) => setPostCode(e.target.value)}
          />
        </DetailsColumnWrapper>
      </DetailsRowWrapper>
      <DetailsRowWrapper justifycontent="space-between">
        <DetailsColumnWrapper>
          <label htmlFor="address-door">
            <b>
              <span>Подъезд</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="address-door-tip"
              title={
                <React.Fragment>
                  <span>Это поле не обязательно к заполнению</span>
                  <span>Пример: 2</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <TextField
            id="address-door"
            fullWidth
            label="Подъезд"
            multiline
            rows={1}
            value={door}
            defaultValue=""
            onChange={(e) => setDoor(e.target.value)}
          />
        </DetailsColumnWrapper>
        <DetailsColumnWrapper>
          <label htmlFor="address-floor">
            <b>
              <span>Этаж</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="address-floor-tip"
              title={
                <React.Fragment>
                  <span>Это поле не обязательно к заполнению</span>
                  <span>Пример: 4</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <TextField
            id="address-floor"
            fullWidth
            label="Этаж"
            multiline
            rows={1}
            value={floor}
            defaultValue=""
            onChange={(e) => setFloor(e.target.value)}
          />
        </DetailsColumnWrapper>
        <DetailsColumnWrapper>
          <label htmlFor="address-door-bell">
            <b>
              <span>Домофон</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="address-door-bell-tip"
              title={
                <React.Fragment>
                  <span>Это поле не обязательно к заполнению</span>
                  <span>Пример: 54</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <TextField
            id="address-door-bell"
            fullWidth
            label="Домофон"
            multiline
            rows={1}
            value={rignBell}
            defaultValue=""
            onChange={(e) => setRingBell(e.target.value)}
          />
        </DetailsColumnWrapper>
      </DetailsRowWrapper>
    </>
  );
};

export default AddressDetails;
