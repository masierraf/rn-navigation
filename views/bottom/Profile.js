import React from 'react';
import {Text, Button, StyleSheet} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {login} from './../../redux/action/auth/index';
import ScreenContainer from './../../components/ScreenScrollViewContainer';
import Animated from 'react-native-reanimated';

const Profile = ({navigation, signOut}) => {
  const dispatch = useDispatch();

  return (
    <ScreenContainer>
      <Animated.ScrollView style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Button onPress={() => dispatch(signOut())} title="Sign Out" />
      </Animated.ScrollView>
    </ScreenContainer>
  );
};

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

const mapDispatchToProps = () => {
  return {
    signOut: () => login(false),
  };
};

export default connect(null, mapDispatchToProps)(Profile);
