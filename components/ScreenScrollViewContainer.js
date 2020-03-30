import React from 'react';
import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';

const ScreenContainer = ({children, color = '#fff'}) => (
  <SafeAreaView style={{...styles.container, backgroundColor: color}}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? 10 : 35,
  },
});

export default ScreenContainer;
