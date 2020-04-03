/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Home from './src/Dogs/ui/screens/Home';
import Header from './src/Dogs/ui/components/Header';
import DogsList from './src/Dogs/ui/components/DogsList';


const App: () => React$Node = () => {
  return (
    <Home>
      <Header />
      <DogsList />
    </Home>
  );
};

export default App;
