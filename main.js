import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

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
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const App = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tabs.Navigator initialRouteName="home">
          <Tabs.Screen
            name="ranking"
            component={Ranking}
            options={{
              tabBarLabel: 'Ranking',
              tabBarIcon: ({color, size}) => (
                <FontAwesomeIcon name="trophy" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <FontAwesomeIcon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({color, size}) => (
                <FontAwesomeIcon name="user-alt" color={color} size={size} />
              ),
            }}
          />
        </Tabs.Navigator>
      ) : (
        <AuthStack.Navigator headerMode="none">
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
