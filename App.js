/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Dogs/ui/screens/Home';
import Header from './src/Dogs/ui/components/Header';
import DogsList from './src/Dogs/ui/components/DogsList';
import DogImageList from './src/Dogs/ui/components/DogImageList';
import { DogDetailContext, initDog } from './src/Dogs/contexts/DogDetailContext';

const Stack = createStackNavigator();
     
const App: () => React$Node = () => {
  
  const [ contextValue, changeDogContext ] = useState({
    dog: initDog,
    changeDog: (dog) => {
      changeDogContext({
        ...contextValue,
        dog
      })
    }
  });
  
  return (
    <DogDetailContext.Provider value={contextValue}>
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
            options={({route}) => ({title:route.params.title})}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </DogDetailContext.Provider>
  );
};

export default App;
