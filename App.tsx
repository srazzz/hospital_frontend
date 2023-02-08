/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainScreen from './screens/MainScreen';
import DoctorScreen from './screens/DoctorScreen';
import {
  SafeAreaView,
  useColorScheme,
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView >
      <MainScreen/>
      {/* <DoctorScreen/> */}
    </SafeAreaView>
  );
}



export default App;
