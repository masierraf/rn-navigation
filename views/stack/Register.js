import React from 'react';
import {Text, Button} from 'react-native';
import ScreenContainer from './../../components/ScreenContainer';

export default ({navigation}) => (
  <ScreenContainer>
    <Text>Register</Text>
    <Button onPress={() => navigation.push('signin')} title="Iniciar Sesión" />
  </ScreenContainer>
);
