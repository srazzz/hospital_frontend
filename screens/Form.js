// import React, {useState} from 'react';
// import {SafeAreaView, TextInput, Button, StyleSheet, Text} from 'react-native';

// const Form = () => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.labelName}>Name</Text>
//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//         placeholder="Enter your name"
//       />
//       <Text style={styles.labelName}>Age</Text>
//       <TextInput
//         style={styles.input}
//         value={age}
//         onChangeText={setAge}
//         placeholder="Enter your age...."
//       />
//       <Button style={styles.submitButton}
//         title="Submit"
//         //   onPress={() => Alert.alert('Fill the values', 'created')}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({

// });

// export default Form;

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,

  View,
  Alert
} from 'react-native';
import { postData } from '../connection';
const Form = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
//   const [error, setError] = useState({});
  

//   const validate = (name, age) => {
//     console.log(error)
//     setError(error.name="",error.age="")
//     console.log(name,age ,"validate fucntion")
//     if (name === '') {
//       error.name = 'please enter name ';
//     }
//     if (age === '') {
//       error.age = 'please enter your age ';
//     }
//     setError(error);
// if(error.name !=="" && error.age !== "")
// Alert.alert("enter details correctly",{error})
//   };
  return (
    <SafeAreaView style={styles.container}>
      <Text styles={styles.formTitle}>----------------- Fill the Patient details-----------------</Text>
      <Text style={styles.labelName}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      {/* <View><Text style={{color : "red"}} >{error.name}</Text></View> */}
      <Text style={styles.labelName}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
      />
      <View>
        {/* <Text style={{color : "red"}} on>{error.age}</Text> */}
      </View>
    
      <Button
        style={styles.submitButton}
        title="Submit"
        // onPress={() => validate(name, age)}
        //   onPress={() => Alert.alert('Fill the values', 'created')}
        onPress = {() => postData(name,age,'patients')}
      />
      <Button   style={styles.submitButton} title = "cancel" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B6474',
    width: '90%',
    justifyContent: 'center',
    marginLeft: '5%',
    alignContent: 'center',
    borderRadius: 4,
    padding  : 20,
    borderRadius : 10,
  },
  formTitle: {
    alignContent: 'center',
    color: 'white',
    fontSize : 30,
  },
  submitButton: {
    marginTop:5,
    marginTop : 10,
  },
  labelName: {
    fontSize :20,
  },
  input : {
    borderRadius :12,
    color: "black",
    borderColor : "black",
    borderWidth : 2,
    backgroundColor:"white",
    margin : 5,
    height : 35,
    marginBottom : 10,
  }
});

export default Form;
