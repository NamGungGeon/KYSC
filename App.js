/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './component/screens/Splash';
import Home from './component/screens/Home';
import MyColors from './component/resources/colors/colors';
import InitialSettings from './component/screens/InitialSettings';

const Stack = createStackNavigator();
import {observerId} from './component/util/ChangeTimeObserver';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor={MyColors.primary} />
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'} initialRouteName={'Splash'}>
          <Stack.Screen name={'Splash'} component={Splash} />
          <Stack.Screen name={'Home'} component={Home} />
          <Stack.Screen name={'InitialSettings'} component={InitialSettings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
