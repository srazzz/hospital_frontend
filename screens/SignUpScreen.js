import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import AddPatient from './AddPatient';
import {postDoctorData, postPatientData} from './ApiCalls';

const renderItem = (item, index) => {
  // console.log(item);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{color: 'white'}}>Patient {index} </Text>
      <Text style={{color: 'white'}}>{item.name}</Text>
      <Text style={{color: 'white'}}>{item.age}</Text>
    </View>
  );
};
const SignupForm = ({navigation: {goBack}, route, navigation }) => {
  const {editName, editSpecialty, editEmail, id, functionName} = route.params;
  const [name, setName] = useState(editName);
  const [specialty, setSpecialty] = useState(editSpecialty);
  const [email, setEmail] = useState(editEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [errors, setErrors] = useState([]);

  var index = 0;
  // useEffect(() => {
  //   if (functionName === 'put') {
  //     setName(editName);
  //     setSpecialty(editSpecialty);
  //     setEmail(editEmail);
  //   }
  // });
  const handleSignUp = async () => {
    const validation = () => {
      if (name.trim() === '') {
        errors[index++] = 'Name is required';
      }
      if (specialty.trim() === '') {
        errors[index++] = 'Specialty is required';
      }
      if (email.trim() === '') {
        errors[index++] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors[index++] = 'Email is invalid';
      }
      if (password.trim() === '') {
        errors[index++] = 'Password is required';
      } else if (password.length < 6) {
        errors[index++] = 'Password must be at least 6 characters long';
      }
      if (confirmPassword.trim() === '') {
        errors[index++] = 'Confirm password is required';
      } else if (password !== confirmPassword) {
        errors[index++] = 'Passwords do not match';
      }

      if (errors.length > 0) {
        const errorText = errors.join('\n');
        Alert.alert('Errors', errorText
        );
        setErrors([]);
      } 
      else {
        // perform sign-up
      }
    };

    validation();

    const data = await Promise.all(
      patientData.map(patient => {
        return postPatientData(
          patient.name,
          patient.age,
          '63ecd5fc65464f3ae0d15bd5',
        );
      }),
    );
    var patientIds = [];
    // to create new patients
    data.forEach(eachId => {
      patientIds.push(eachId.patient._id);
    });

    const postedData = await postDoctorData(
      name,
      specialty,
      email,
      password,
      patientIds,
      'doctors',
    );
    if (postedData.message === '') {
      Alert.alert('Information', 'New doctor added');
      setVisible(false);

      // setConfirmPassword("")     ask pavan
      // setEmail("")
    } else {
      Alert.alert('Information', postedData.message.toString(), 'error');
    }
    console.log(postedData, 'doctor posted data ');
    setPatientData([]); // finally this should happen to reset data
    console.log(data, 'data in sinup', patientIds, 'final details');
  };

  const addPatient = setVisible => {
    setVisible(true);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => goBack() + setPatientData([])}>
          <Icon name="arrow-back-ios" size={30} style={{color: 'black'}} />
        </TouchableOpacity>
        <Text style={{color: '#000'}}>Sign Up </Text>
        <TouchableOpacity
          onPress={() => goBack() + setPatientData([]) + setIndex(0)}>
          <Icon
            name="arrow-back-ios"
            size={30}
            style={{color: 'transparent'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 10}}>
        <ScrollView>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor="grey"
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={specialty}
            onChangeText={text => setSpecialty(text)}
            placeholderTextColor="grey"
            placeholder="speciality"
          />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor="grey"
            placeholder="Email-ID"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="password"
            placeholderTextColor="grey"
            secureTextEntry={true}
          />

          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeholder="Confirm password"
            placeholderTextColor="grey"
            secureTextEntry={true}
          />

          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{paddingBottom: 15}}>
            <Icon name="person-add" size={25} style={{color: 'black'}} />
            <Text style={{color: 'black', fontSize: 10}}>Add Patient</Text>
          </TouchableOpacity>
          {patientData.length !== 0
            ? patientData.map(item => {
                index = index + 1;
                // keyExtractor={item.name}
                return (
                  <View key={index.toString()} style={styles.eachPatient}>
                    <Text style={{color: 'white'}}>
                      ----------patient {index}----------
                    </Text>
                    <Text style={{color: 'white'}}>Name : {item.name}</Text>
                    <Text style={{color: 'white', marginBottom: 10}}>
                      Age : {item.age}
                    </Text>
                  </View>
                );
              })
            : null}

          <Modal
            isVisible={visible}
            transparent={false}
            style={styles.patientModal}>
            <AddPatient
              visible={visible}
              setVisible={setVisible}
              patientData={patientData}
              setPatientData={setPatientData}
              index={index}
            />
          </Modal>
        </ScrollView>
      </View>
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text
            style={{
              backgroundColor: 'lightblue',
              width: 120,
              height: 40,
              fontSize: 20,
              textAlign: 'center',
              verticalAlign: 'middle',
              borderRadius: 5,
            }}>
            Sign Up
          </Text>
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
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    color: 'black',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    position: 'relative',
    top: 20,
    padding: 10,
    width: '30%',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 300,
    justifyContent: 'center',
    top: '-5%',
  },
  backIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  patient: {
    position: 'absolute',
    top: 500,
    left: 40,
  },
  patientDetails: {
    backgroundColor: 'black',
    marginTop: 5,
  },
  patientModal: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
  eachPatient: {
    backgroundColor: '#3B6474',
    width: '100%',
    alignItems: 'center',
  },
});

export default SignupForm;