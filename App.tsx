// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import MainScreen from './screens/MainScreen';
// import DoctorScreen from './screens/DoctorScreen';
// import PatientScreen from './screens/PatientScreen';
// import {
//   SafeAreaView,
//   useColorScheme,
//   StyleSheet,
// } from 'react-native';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';



// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView >
//       {/* <MainScreen/> */}
//       <DoctorScreen/>
//       {/* <PatientScreen/> */}
//     </SafeAreaView>
//   );
// }



// export default App;



























/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
// import MainScreen from './screens/MainScreen'
// import DoctorScreen from './screens/DoctorScreen';
// import PatientScreen from './screens/PatientScreen';

// import {
//   SafeAreaView,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const Stack = createStackNavigator();
//   return (
//     // <SafeAreaView >
//       // {/* <DoctorScreen/> */}


//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Main">
//           <Stack.Screen name="Main" component={MainScreen} />
//           <Stack.Screen name='DoctorScreen' component={DoctorScreen} />
//           <Stack.Screen name="PatientScreen" component={PatientScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     // </SafeAreaView>
//   );
// }

// export default App;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen'
import DoctorScreen from './screens/DoctorScreen';
import PatientScreen from './screens/PatientScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name='DoctorScreen' component={DoctorScreen} />
        <Stack.Screen name="PatientScreen" component={PatientScreen} />
      </Stack.Navigator>   
    </NavigationContainer >
  );
};

export default App;