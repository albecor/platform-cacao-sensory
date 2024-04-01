const shades = {
  green: {
    50: '#e4fdf7',
    100: '#bff2e8',
    200: '#99e9d9',
    300: '#72e0ca',
    400: '#4fd8bb',
    500: '#39bea3',
    600: '#2b947e',
    700: '#1d6a5a',
    800: '#0d4036',
    900: '#001612'
  },
  orange: {
    50: '#ffeedf',
    100: '#fed2b2',
    200: '#fab685',
    300: '#f69955',
    400: '#f37b27',
    500: '#d9620e',
    600: '#aa4c09',
    700: '#7a3605',
    800: '#4b2000',
    900: '#1e0800'
  },
  oxley: {
    50: '#e8f7ec',
    100: '#cfdfd3',
    200: '#b4c9ba',
    300: '#98b29f',
    400: '#7c9c84',
    500: '#63836b',
    600: '#4c6652',
    700: '#35493a',
    800: '#1e2d22',
    900: '#011205'
  },
  red: {
    50: '#ffe9e3',
    100: '#fbc3b9',
    200: '#f19d8e',
    300: '#ea7661',
    400: '#e35036',
    500: '#c9361c',
    600: '#9e2915',
    700: '#711c0e',
    800: '#460f05',
    900: '#1e0200'
  }
};

const baseColor = {
  light: '#FDE8DD',
  redPrimary: shades.red[500],
  redSecondary: shades.orange[500],
  greenPrimary: shades.green[700],
  greenSecondary: shades.oxley[500],
  greenCoffee: '#15594d',
  mute: '#939393'
};

const appColorScheme = {
  error: '#FD5C70'
};

const formColorScheme = {
  error: appColorScheme.error,
  labelText: baseColor.redPrimary,
  inputText: '#202021',
  linkText: baseColor.redSecondary
};

const modalColorScheme = {
  backdrop: 'rgba(21, 89, 77, 0.8)',
  primaryAction: shades.green[700],
  primaryActionBorder: shades.green[800],
  primaryActionText: shades.green[50],
  secondaryAction: shades.orange[400],
  secondaryActionText: shades.orange[500],
  cancelButtonTextColor: appColorScheme.mute
};

export default {
  backgroundColor: 'rgba(253, 232, 221, 0.9)',
  bckColor: 'rgb(253, 232, 221)',
  black: '#000',
  blackRussian: '#202021',
  borderColor: '#E0E1E6',
  whisper: '#D2D6DA',
  white: '#FFF',
  appColorScheme,
  baseColor,
  formColorScheme,
  modalColorScheme,
  shades
};
