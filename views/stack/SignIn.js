import React from 'react';
import {Text, Button} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import ScreenContainer from './../../components/ScreenContainer';

import {login} from './../../redux/action/auth/index';

const SignIn = ({navigation, signIn}) => {
  const dispatch = useDispatch();
  return (
    <ScreenContainer>
      <Text>Sign In</Text>
      <Button onPress={() => dispatch(signIn())} title="Sign In" />
      <Button onPress={() => navigation.push('register')} title="Register" />
    </ScreenContainer>
  );
};

const mapDispatchToProps = () => {
  return {
    signIn: () => login(true),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
