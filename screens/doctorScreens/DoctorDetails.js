import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connection} from '../../connection';

const DoctorDetails = ({navigation: {goBack}, navigation, route}) => {
  const {name, specialty, email, patients} = route.params;
  const [finalPatients, setFinalPatients] = useState([]);
  var index = 0;

  if (patients.length !== 0) {
    const patientsData = async () => {
      let allPatients = await connection('patients');
      let finalPatients = allPatients.filter(patient => {
        return patients.includes(patient._id);
      });

      setFinalPatients(finalPatients);
    };
    patientsData();
  }
  console.log(finalPatients, 'final patients');

  return (
    <View styles={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-back-ios" size={30} style={{color: 'black'}} />
        </TouchableOpacity>
        <Text style={{color: '#000'}}>Doctor details </Text>
        <TouchableOpacity
          onPress={() => goBack() + setPatientData([]) + setIndex(0)}>
          <Icon
            name="arrow-back-ios"
            size={30}
            style={{color: 'transparent'}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          padding: 10,
          width: '100%',
          height: '100%',
          backgroundColor: '#D3E6E5',
        }}>
        <View
          style={{
            // padding: 20,
            borderRadius: 6,
            alignItems: 'flex-start',
            flex: 1,
          }}>
          <Text style={{color: 'black', fontSize: 18}}>Name : {name}</Text>
          <Text style={{color: 'black', fontSize: 18}}>
            Speciality : {specialty}
          </Text>
          <Text style={{color: 'black', fontSize: 18}}>Email : {email}</Text>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            margin: 0,
          }}>
          Patients of doctor {name} :
        </Text>
        <View
          style={{
            flex: 1 / 2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {patients.length !== 0 && finalPatients
            ? finalPatients.map((patient, index) => (
                <TouchableOpacity
                  key={patient._id}
                  onPress={() =>
                    navigation.navigate('PatientDetails', {
                      name: patient.name,
                      age: patient.age,
                    })
                  }>
                  <View
                    style={{
                      backgroundColor: '#3B6474',
                      margin: 0,
                      padding: 10,

                      margin: 3,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        marginBottom: 10,
                      }}>
                      patient {index + 1}
                    </Text>
                    {/* <line>jfjff</line> */}

                    <Text style={{color: 'white'}}>Name: {patient.name}</Text>
                    <Text style={{color: 'white'}}>Age: {patient.age}</Text>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
});
export default DoctorDetails;
