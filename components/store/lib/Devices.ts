const sizes = {
  mobileES: '100px',
  mobileS: '200px',
  mobileM: '285px',
  mobileL: '350px',
  tabletS: '440px',
  tabletL: '768px',
  laptopS: '1024px',
  laptopM: '1240px',
  laptopL: '1550px',
  desktop: '2560px',
};

export const devices = {
  // mobileS: `(min-width: ${sizes.mobileS})`,
  // mobileM: `(min-width: ${sizes.mobileM})`,
  mobileS: `(min-width: ${sizes.mobileES}) and (max-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileS}) and (max-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileM}) and (max-width: ${sizes.mobileL})`,
  tabletS: `(min-width: ${sizes.mobileL}) and (max-width: ${sizes.tabletS})`,
  tabletL: `(min-width: ${sizes.tabletS}) and (max-width: ${sizes.tabletL})`,
  laptopS: `(min-width: ${sizes.tabletL}) and (max-width: ${sizes.laptopS})`,
  laptopM: `(min-width: ${sizes.laptopS}) and (max-width: ${sizes.laptopM})`,
  laptopL: `(min-width: ${sizes.laptopM}) and (max-width: ${sizes.laptopL})`,
  // laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.laptopL}) and (max-width: ${sizes.desktop})`,
};

export const sizesNum = {
  mobileES: 100,
  mobileS: 200,
  mobileM: 285,
  mobileL: 350,
  tabletS: 440,
  tabletL: 768,
  laptopS: 1024,
  laptopM: 1240,
  laptopL: 1550,
  desktop: 2560,
};
