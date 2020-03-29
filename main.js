import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// redux
import {connect, useSelector} from 'react-redux';

// vistas stack
import SignIn from './views/stack/SignIn';
import Register from './views/stack/Register';

// vistas bottom
import Home from './views/bottom/Home';
import Profile from './views/bottom/Profile';
import Ranking from './views/bottom/Ranking';

// navegadores
const LoginStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const Main = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="ranking" component={Ranking} />
    <Tabs.Screen name="home" component={Home} />
    <Tabs.Screen name="profile" component={Profile} />
  </Tabs.Navigator>
);

const Login = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="signin"
      component={SignIn}
      options={{title: 'Iniciar Sesión'}}
    />
    <AuthStack.Screen
      name="register"
      component={Register}
      options={{title: 'Registro'}}
    />
    <AuthStack.Screen name="main" component={Main} />
  </AuthStack.Navigator>
);

const App = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tabs.Navigator initialRouteName="home">
          <Tabs.Screen name="ranking" component={Ranking} />
          <Tabs.Screen name="home" component={Home} />
          <Tabs.Screen name="profile" component={Profile} />
        </Tabs.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="signin"
            component={SignIn}
            options={{title: 'Iniciar Sesión'}}
          />
          <AuthStack.Screen
            name="register"
            component={Register}
            options={{title: 'Registro'}}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default connect(null, {})(App);
