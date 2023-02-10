import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import DoctorScreen from './screens/DoctorScreen';
import PatientScreen from './screens/PatientScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen name="PatientScreen" component={PatientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
