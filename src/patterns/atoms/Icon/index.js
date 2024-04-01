import React from 'react';
import { number, string } from 'prop-types';
import { SvgXml } from 'react-native-svg';
import { View } from 'react-native';
import { Colors } from '../../Theme';

const Icon = ({ color, icon, size }) => {
  const xml = {
    CLOSE: `
    <svg  width="100%" height="100%" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14.8662" y="15.6901" width="11.0043" height="2" rx="1" transform="rotate(-135 14.8662 15.6901)" fill="${color}"/>
      <rect x="16.1914" y="1.41422" width="11" height="2" rx="1" transform="rotate(135 16.1914 1.41422)" fill="${color}"/>
      <rect x="2.01367" y="3.05176e-05" width="11.0043" height="2" rx="1" transform="rotate(45 2.01367 3.05176e-05)" fill="${color}"/>
      <rect x="0.688477" y="14.2759" width="11" height="2" rx="1" transform="rotate(-45 0.688477 14.2759)" fill="${color}"/>
    </svg>`,
    CHECK_MARK: `
    <svg  width="100%" height="100%" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="55" cy="55" r="53" stroke="${color}" stroke-width="4"/>
      <rect x="28.9336" y="54.6978" width="27" height="4" rx="2" transform="rotate(47.1786 28.9336 54.6978)" fill="${color}"/>
      <rect x="83.8828" y="37.8286" width="55.2297" height="4" rx="2" transform="rotate(135 83.8828 37.8286)" fill="${color}"/>
    </svg>`,
    ERROR: `
    <svg width="100%" height="100%" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="44.1367" width="35.5487" height="4" rx="2" transform="rotate(-45 18 44.1367)" fill="#CD3C32"/>
      <rect x="20.8286" y="19" width="35.5487" height="4" rx="2" transform="rotate(45 20.8286 19)" fill="#CD3C32"/>
      <circle cx="32.5" cy="32.5" r="30.5" stroke="#CD3C32" stroke-width="4"/>
    </svg>`,
    WARNING: `
    <svg width="100%" height="100%" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.4802 17.944L16.3713 2.16669C14.8835 -0.439677 11.1212 -0.439677 9.63869 2.16669L0.524445 17.944C-0.963376 20.5504 0.888372 23.7883 3.89077 23.7883H22.0818C25.0842 23.7883 26.9681 20.5183 25.4802 17.944ZM12.9997 20.2881C12.2076 20.2881 11.5493 19.6299 11.5493 18.8378C11.5493 18.0457 12.2076 17.3874 12.9997 17.3874C13.7917 17.3874 14.45 18.0457 14.4179 18.8752C14.4554 19.6299 13.7596 20.2881 12.9997 20.2881ZM14.3216 10.9116C14.2574 12.0355 14.1878 13.1541 14.1236 14.278C14.0914 14.6419 14.0914 14.9737 14.0914 15.3323C14.0593 15.9264 13.5937 16.3866 12.9997 16.3866C12.4056 16.3866 11.9453 15.9585 11.9079 15.3644C11.8116 13.6143 11.7099 11.8964 11.6135 10.1463C11.5814 9.68607 11.5493 9.22046 11.5118 8.7602C11.5118 8.00023 11.94 7.37406 12.6357 7.17604C13.3315 7.01013 14.0219 7.34195 14.3216 8.00023C14.4233 8.23036 14.4554 8.46049 14.4554 8.72809C14.4233 9.46129 14.3537 10.1891 14.3216 10.9116Z" fill="${color}"/>
    </svg>`
  };

  return (
    <View style={{ width: size, height: size }}>
      <View style={{ aspectRatio: 1 }}>
        <SvgXml xml={xml[icon]} />
      </View>
    </View>
  );
};

Icon.propTypes = {
  color: string,
  icon: string,
  size: number
};
Icon.defaultProps = {
  color: Colors.baseColor.greenPrimary,
  size: 64
};

export default Icon;
