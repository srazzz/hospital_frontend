
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MainScreen from './screens/mainScreen';
import DoctorScreen from './screens/doctorScreens/DoctorScreen';
import PatientScreen from './screens/PatientScreen';
import LoginForm from './screens/Login';
import SignupForm from './screens/SignUpScreen';
import DoctorDetails from './screens/doctorScreens/DoctorDetails'
import PatientDetails from './screens/PatientDetails';
import Test from './screens/doctorScreens/Test';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen options={{headerShown : false}} name="Main" component={MainScreen} />
        <Stack.Screen options={{headerShown : false}} name='Login' component={LoginForm}  />
        {/* <Stack.Screen options={{headerShown : false}} name="SignUp" component={SignUp} /> */}
        <Stack.Screen options={{headerShown : false}} name="Signup" component={SignupForm} />
        <Stack.Screen options={{headerShown : false}} name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen options={{headerShown : false}} name="DoctorDetails" component={DoctorDetails} />
        <Stack.Screen options={{headerShown : false}} name="PatientDetails" component={PatientDetails} />

        <Stack.Screen name="PatientScreen" component={PatientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );};
 export default App;