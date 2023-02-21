import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/mainScreen';
import DoctorScreen from './screens/DoctorScreen';
import PatientScreen from './screens/PatientScreen';
import LoginForm from './screens/Login';
import SignupForm from './screens/SignUpScreen';
import DisplayCard from './screens/displayCard';
import DoctorDetails from './screens/DoctorDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen options={{headerShown : false}} name="Main" component={MainScreen} />
        <Stack.Screen name='Login' component={LoginForm}  />
        <Stack.Screen options={{headerShown : false}} name="Signup" component={SignupForm} />
        <Stack.Screen options={{headerShown : false}} name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen name="patientScreen" component={PatientScreen} />
        <Stack.Screen options={{headerShown : false}} name='DoctorDetails' component={DoctorDetails} />
        <Stack.Screen name='Display' component={DisplayCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
