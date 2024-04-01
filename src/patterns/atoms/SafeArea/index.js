import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Styles from './SafeArea.styles';

const SafeArea = ({ children }) => {
  const styles = StyleSheet.create(Styles);
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

export default SafeArea;
