const size = {
  mobile: '320px',
  mobileMax: '767px',
  tablet: '1280px',
  desktop: '1920px',
};

export const device = {
  mobile: `screen and (min-width: ${size.mobile})`,
  mobileMax: `screen and (max-width: ${size.mobileMax})`,
  tablet: `screen and (min-width: ${size.tablet})`,
  desktop: `screen and (min-width: ${size.desktop})`,
};

const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
};