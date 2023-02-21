import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

// add patient screen in signUp
const AddPatientForm = props => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const patient = {name: name, age: age};
  // adding new patient in patientData list
  const addPatient = () => {
    props.patientData.push(patient);
    props.setVisible(false);
    Alert.alert('Information', 'patient added');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add patient details here....</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholderTextColor="grey"
        placeholder="Patient Name"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={text => setAge(text)}
        placeholderTextColor="grey"
        placeholder="Age"
        keyboardType="number-pad"
      />
      <View style={styles.buttonAlign}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => props.setVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => addPatient()}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 3,
    marginBottom: 15,
    top: '2%',
    borderRadius: 12,
    color: 'black',
  },
  buttonAdd: {
    padding: 5,
    position: 'relative',
    top: '10%',
    borderRadius: 10,
    width: '35%',
    height: 38,
    borderWidth: 1,
    backgroundColor: '#3B6474',
    margin: '5%',
  },
  buttonAlign: {
    flex: 1 / 2,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    // marginLeft:"40%",
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginBottom: '5%',
    marginTop: '15%',
  },
});

export default AddPatientForm;
