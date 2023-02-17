import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/mainScreen';
import DoctorScreen from './screens/doctorScreen';
import PatientScreen from './screens/PatientScreen';
import LoginForm from './screens/Login';
import SignupForm from './screens/SignUpScreen';
import displayCard from './screens/displayCard';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen options={{headerShown : false}} name="Main" component={MainScreen} />
        <Stack.Screen options={{headerShown : false}} name='Login' component={LoginForm}  />
        {/* <Stack.Screen options={{headerShown : false}} name="SignUp" component={SignUp} /> */}
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen name="patientScreen" component={PatientScreen} />
        <Stack.Screen name='Display' component={displayCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
