import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
import ScreenContainer from './../../components/ScreenScrollViewContainer';

const Home = ({navigation}) => (
  <ScreenContainer color="#fff">
    <Animated.ScrollView style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </Animated.ScrollView>
  </ScreenContainer>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default Home;
