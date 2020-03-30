import React from 'react';
import {Text, StyleSheet} from 'react-native';
import ScreenContainer from './../../components/ScreenScrollViewContainer';
import Animated from 'react-native-reanimated';

const Ranking = ({navigation}) => (
  <ScreenContainer color="#fff">
    <Animated.ScrollView style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
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

export default Ranking;
