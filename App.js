/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Dogs/ui/screens/Home';
import Header from './src/Dogs/ui/components/Header';
import DogsList from './src/Dogs/ui/components/DogsList';
import DogImageList from './src/Dogs/ui/components/DogImageList';

const Stack = createStackNavigator();
     
const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={DogsList}
          options={{title:"Home"}}
        />
        <Stack.Screen
          name="Detail"
          component={DogImageList}
          options={{title:"Detail"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
