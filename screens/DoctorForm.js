import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
} from 'react-native';
import {postData, putData} from '../connection';

const DoctorForm = props => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(props.name);
  const [specialty, setspecialty] = useState(props.specialty);
  const [id, setId] = useState(props.id);
  //   const [error, setError] = useState({});

  //   const validate = (name, specialty) => {
  //     console.log(error)
  //     setError(error.name="",error.specialty="")
  //     console.log(name,specialty ,"validate fucntion")
  //     if (name === '') {
  //       error.name = 'please enter name ';
  //     }
  //     if (specialty === '') {
  //       error.specialty = 'please enter your specialty ';
  //     }
  //     setError(error);
  // if(error.name !=="" && error.specialty !== "")
  // Alert.alert("enter details correctly",{error})
  //   };
  const functionOnPressSubmit = async () => {
    // console.log("function name",props.functionName)
    if (props.functionName === 'post') {
      console.log('before post call');
      const postedData = await postData(name, specialty, 'doctors');
      console.log('updated ', postedData);
      // Alert.alert('Info', 'added new data');
      if (postedData.name !== '' && postedData.specialty !== '') {
        // props.fetchData()
        Alert.alert('Info', 'added new data');
      } else {
        Alert.alert('Info', 'entered wrong data'); //alert not opening
      }
      await props.fetchData(props.setData, props.data);
    } else {
      // setId(id)
      //   console.log(name,specialty,id,props.data,"is data tehre")
      const changedData = putData(id, name, specialty, 'doctors');
      // console.log("changeed data is", changedData)
      await props.fetchData(props.setData, props.data);
      if (changedData.name !== '' && changedData.specialty !== '') {
        // props.fetchData()
        Alert.alert('Info', ' data updated');
      } else {
        Alert.alert('Info', 'entered wrong data'); //alert not opening
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text styles={styles.formTitle}>
        ----------------- Fill the Doctor details-----------------
      </Text>
      <Text style={styles.labelName}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      {/* <View><Text style={{color : "red"}} >{error.name}</Text></View> */}
      <Text style={styles.labelName}>speciality:</Text>
      <TextInput
        style={styles.input}
        value={specialty}
        onChangeText={setspecialty}
        placeholder="Enter your specialty"
      />
      <View>
        {/* <Text style={{color : "red"}} on>{error.specialty}</Text> */}
      </View>

      <Button
        style={styles.submitButton}
        title="Submit"
        // onPress={() => validate(name, specialty)}
        //   onPress={() => Alert.alert('Fill the values', 'created')}
        onPress={() =>
          functionOnPressSubmit(name, specialty, 'doctors') +
          props.setVisible(false)
        }
      />
      <Button
        style={styles.submitButton}
        title="cancel"
        onPress={() => props.setVisible(false)}
      />
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
    padding: 20,
    borderRadius: 10,
  },
  formTitle: {
    alignContent: 'center',
    color: 'white',
    fontSize: 30,
  },
  submitButton: {
    marginTop: 5,
    marginTop: 10,
  },
  labelName: {
    fontSize: 20,
  },
  input: {
    borderRadius: 12,
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    margin: 5,
    height: 35,
    marginBottom: 10,
  },
});

export default DoctorForm;
