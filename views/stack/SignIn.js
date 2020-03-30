import React, {useRef, useEffect} from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

import Svg, {Image, Circle, ClipPath} from 'react-native-svg';

import {connect, useDispatch} from 'react-redux';

import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

import {login} from './../../redux/action/auth/index';

const {width, height} = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
};

const SignIn = ({navigation, signIn}) => {
  const dispatch = useDispatch();

  const buttonOpacity = new Value(1);

  const opacityAnimated = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0)),
          ),
        ]),
    },
  ]);

  const onCloseButton = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1)),
          ),
        ]),
    },
  ]);

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{translateY: bgY}],
        }}>
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require('./../../assets/signin_background.jpg')}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
      <View style={styles.formContainer}>
        <TapGestureHandler onHandlerStateChange={opacityAnimated}>
          {/* onPress={() => dispatch(signIn())} */}
          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity,
              transform: [{translateY: buttonY}],
            }}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </Animated.View>
        </TapGestureHandler>

        <Animated.View
          style={{
            ...styles.button,
            backgroundColor: '#2E71DC',
            opacity: buttonOpacity,
            transform: [{translateY: buttonY}],
          }}
          onPress={() => navigation.push('register')}>
          <Text style={{...styles.buttonText, color: 'white'}}>
            SIGN IN WITH FACEBOOK
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            ...styles.formView,
            zIndex: textInputZindex,
            opacity: textInputOpacity,
            transform: [{translateY: textInputY}],
          }}>
          <TapGestureHandler onHandlerStateChange={onCloseButton}>
            <Animated.View style={styles.closeButton}>
              <Animated.Text
                style={{
                  ...styles.closeButtonText,
                  transform: [{rotate: concat(rotateCross, 'deg')}],
                }}>
                X
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>

          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor="black"
          />

          <Animated.View style={styles.button}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBackground: {
    height: null,
    width: null,
    flex: 1,
  },
  formContainer: {
    height: height / 3,
  },
  formView: {
    height: height / 3,
    ...StyleSheet.absoluteFill,
    top: null,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  closeButtonText: {
    fontSize: 15,
  },
});

const mapDispatchToProps = () => {
  return {
    signIn: () => login(true),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
