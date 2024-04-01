import React, { useCallback } from 'react';
import { oneOf, string } from 'prop-types';
import { SvgXml } from 'react-native-svg';
import Colors from '../../Theme/colors';

const propTypes = {
  color: string,
  variant: oneOf(['darkBackground', 'lightBackground'])
};

const defaultProps = {
  variant: 'lightBackground'
};

const CloseIcon = ({ variant, ...props }) => {
  const pickColor = useCallback(() => (
    {
      darkBackground: Colors.white,
      lightBackground: Colors.blackRussian
    }[variant]
  ), [variant]);

  const strokeColor = props.color || pickColor();

  const xml = `<svg width="24" height="24" overflow="visible" version="1.1"
    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><line x1="1"
    x2="23" y1="1" y2="23" stroke="${strokeColor}" stroke-linecap="round"
    stroke-width="1" /><line x1="23" x2="1" y1="1" y2="23"
    stroke="${strokeColor}" stroke-linecap="round" stroke-width="1" /></g></svg>`;

  return (
    <SvgXml xml={xml} testID='close-delete-card-modal' />
  );
};

CloseIcon.propTypes = propTypes;
CloseIcon.defaultProps = defaultProps;

export default CloseIcon;
