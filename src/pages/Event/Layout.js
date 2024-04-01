import React from 'react';
import { string } from 'prop-types';
import { StyleSheet } from 'react-native';
import { Box } from 'native-base';
import BSText from '../../patterns/atoms/Text';
import FormLayout from '../../patterns/molecules/Form';
import { Colors } from '../../patterns/Theme';
import Styles from './Event.styles';

const styles = StyleSheet.create(Styles);

const EventLayout = ({ children, title }) => (
  <Box flex={1} px={5} pt={5}>
    <FormLayout style={styles.scroll}>
      <BSText.Title color={Colors.shades.oxley['600']} text={title} />
      {children}
    </FormLayout>
  </Box>
);

EventLayout.propTypes = {
  title: string.isRequired
};
export default EventLayout;
