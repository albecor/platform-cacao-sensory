import React from 'react';
import { oneOf, string } from 'prop-types';
import { Spinner } from 'native-base';
import { Colors } from '../../Theme';

const Loading = ({ color, size }) => (
  <Spinner size={size} color={color} />
);

Loading.defaultProps = {
  color: Colors.backgroundColor,
  fullscreen: true,
  size: 'large'
};

Loading.propTypes = {
  color: string,
  size: oneOf(['large', 'small'])
};

export default Loading;
