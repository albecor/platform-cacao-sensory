import React from 'react';
import { number, string } from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import Styles from './Text.styles';

const BSText = React.forwardRef(({ text, ...rest }, ref) => (<Text ref={ref} {...rest}>{text}</Text>));
BSText.propTypes = {
  text: string
};

const defaultProps = {
  color: string,
  marginBottom: number,
  text: string
};

BSText.Title = ({ color, marginBottom, text, ...args }) => {
  const styles = StyleSheet.create(Styles({ color, marginBottom }));
  return (
    <Text style={{ ...styles.title }} {...args}>{text}</Text>
  );
};
BSText.Title.propTypes = defaultProps;

BSText.Description = ({ color, marginBottom, text, ...args }) => {
  const styles = StyleSheet.create(Styles({ color, marginBottom }));
  return (
    <Text style={styles.description} {...args}>{text}</Text>
  );
};
BSText.Description.propTypes = defaultProps;

BSText.Link = ({ color, text, ...args }) => {
  const styles = StyleSheet.create(Styles({ color }));
  return (
    <Text style={styles.link} underline {...args}>{text}</Text>
  );
};
BSText.Link.propTypes = {
  color: string,
  text: string
};

export default BSText;
