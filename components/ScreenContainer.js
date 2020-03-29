import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const ScreenContainer = ({children}) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default ScreenContainer;
