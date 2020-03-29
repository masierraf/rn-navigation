import React from 'react';
import {Text, Button} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {login} from './../../redux/action/auth/index';
import ScreenContainer from './../../components/ScreenContainer';

const Profile = ({navigation, signOut}) => {
  const dispatch = useDispatch();

  return (
    <ScreenContainer>
      <Text>Profile</Text>
      <Button onPress={() => dispatch(signOut())} title="Sign Out" />
    </ScreenContainer>
  );
};

const mapDispatchToProps = () => {
  return {
    signOut: () => login(false),
  };
};

export default connect(null, mapDispatchToProps)(Profile);
