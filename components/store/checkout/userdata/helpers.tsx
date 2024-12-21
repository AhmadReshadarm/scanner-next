const geoLocatClick = () => {
  const btn: any = document.querySelector(
    '.ymaps-2-1-79-controls__control_toolbar',
  );

  btn.click();
};

const handleHiddenInputChange = (evt: any, setAddress: any) => {
  evt.preventDefault();
  setAddress(evt.target.value);
};

export { geoLocatClick, handleHiddenInputChange };
