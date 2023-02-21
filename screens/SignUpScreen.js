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
  DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import AddPatient from './doctorScreens/AddPatient';
import {
  postDoctorData,
  postPatientData,
  putDoctorData,
} from './doctorScreens/ApiCalls';
import {connection} from '../connection';

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
const SignupForm = ({navigation: {goBack}, route}) => {
  const {
    editName,
    editSpecialty,
    editEmail,
    id,
    functionName,
    // setDoctorData,
    // doctorData,
  } = route.params;
  const [name, setName] = useState(editName);
  const [specialty, setSpecialty] = useState(editSpecialty);
  const [email, setEmail] = useState(editEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [patientData, setPatientData] = useState([]);

  let errors = [];
  let index = 0;

  const handleSignUp = async () => {
    // if it is edit
    if (functionName === 'put') {
      try {
        const putData = await putDoctorData(name, specialty, email, id);
      } catch (err) {
        console.log(err);
      }
      const dummy = await connection('doctors');
      // setDoctorData(dummy);
      DeviceEventEmitter.emit('refresh', dummy);
      goBack();
    } else {
      const data = await Promise.all(
        //imp
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

      setPatientData([]); // finally this should happen to reset data
      const dummy = await connection('doctors');
      // setDoctorData(dummy);
      goBack();
    }
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
            onChangeText={setName}
            placeholderTextColor="grey"
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={specialty}
            onChangeText={setSpecialty}
            placeholderTextColor="grey"
            placeholder="speciality"
          />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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
                  <View key={index} style={styles.eachPatient}>
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
          height: 50,
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
