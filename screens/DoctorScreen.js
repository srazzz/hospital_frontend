import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import Modal from 'react-native-modal';
import {connection, del} from '../connection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

// To fetch the data from api
const fetchData = async (setData, data) => {
  let doctorData = await connection('doctors');
  setData(doctorData);
};

// on pressing delete option
const delOptionFunctions = (id, setData, data) => {
  Alert.alert('Are you sure', 'Delete card', [
    // asking for confirmation
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        console.log('ok pressed', id);
        del(id, 'doctors') + fetchData(setData, data); //deleting the data by id and refreshing page
        console.log('delted');
      },
    },
  ]);
};

const DoctorScreen = ({navigation: {goBack}, navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [specialty, setspecialty] = useState('');
  const keyExtractor = (item, index) => index.toString();
  const [email, setEmail] = useState('');
  const filteredData =
    data &&
    data.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    fetchData(setData, data);
  }, []);

  // on pressing edit option
  const editOptionFunctions = (name, speciality, email, id, password) => {
    //to display patient details before editing
    let functionName = 'put';

    navigation.navigate('Signup', {
      editName: name,
      editSpecialty: speciality,
      editEmail: email,
      id: id,
      functionName: functionName,
    });
  };

  const renderItem = item => (
    <TouchableOpacity
      style={{width: '50%'}}
      onPress={() =>
        navigation.navigate('DoctorDetails', {
          name: item.item.name,
          specialty: item.item.specialty,
          email: item.item.email,
          patients: item.item.patients,
        })
      }>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.delOption}
          onPress={() => delOptionFunctions(item.item._id, setData, data)}>
          <Text
            style={{color: 'black', alignItems: 'center', textAlign: 'center'}}>
            <Icon name="delete" size={15} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editOption}
          onPress={() =>
            editOptionFunctions(
              item.item.name,
              item.item.specialty,
              item.item.email,
              item.item._id,
            )
          }>
          <Text
            style={{color: 'black', alignItems: 'center', textAlign: 'center'}}>
            <EntypoIcon name={'pencil'} size={15} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.name}>
          Name : {item.item.name}
          {'\n'}
        </Text>
        <Text style={styles.specialty}>
          specialty : {item.item.specialty}
          {'\n'}
        </Text>
        <Text style={styles.specialty}>
          email : {item.item.email}
          {'\n'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.background}>
      <TouchableOpacity style={styles.backIcon} onPress={() => goBack()}>
        <Icon name="arrow-back-ios" size={30} style={{color: 'black'}} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          margin: 10,
          backgroundColor: '#FFF',
          alignItems: 'center',
          borderRadius: 10,
          borderColor: 'black',
          borderWidth: 2,
        }}>
        <TextInput
          placeholder="doctor Search Here...."
          placeholderTextColor="#000"
          style={styles.searchBar}
          onChangeText={text => setSearchTerm(text)}
        />
        <Icon name="search" size={30} style={{color: 'black'}} />
      </View>
      <FlatList
        data={filteredData}
        renderItem={item => renderItem(item)}
        numColumns={2}
        keyExtractor={keyExtractor}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          // setFunctionName('post') +
          setName('') +
          setspecialty('') +
          setId('') +
          navigation.navigate('Signup')
        }>
        <Text style={styles.floatButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '85%',
    paddingLeft: 10,
    color: 'black',
  },
  background: {
    backgroundColor: '#D3E6E5',
    height: '100%',
    width: '100%',
    marginBottom: 5,
    paddingLeft: 3,
    paddingRight: 5,
  },
  name: {
    color: '#D3E6E6',
    textAlign: 'left',
    justifyContent: 'center',
  },
  specialty: {
    color: '#D3E6E6',
    textAlign: 'left',
    justifyContent: 'center',
  },
  box: {
    // flex: 1 / 2,
    width: '96%',
    backgroundColor: '#3B6474',
    margin: 4,
    borderRadius: 12,
    textAlign: 'center',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  floatingButton: {
    backgroundColor: '#D3E6E5',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '89%',
    left: '79%',
    // top: 603,
    // left: 290,
  },
  delOption: {
    backgroundColor: '#D3E6E5',
    width: 25,
    height: 25,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 10,
  },
  editOption: {
    backgroundColor: '#D3E6E5',
    width: 25,
    height: 25,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 40,
  },
  floatButtonText: {
    color: 'black',
    fontSize: 20,
  },
  modalForm: {
    backgroundColor: '#D3E6E5',
    width: '100%',
    margin: 0,
  },
  backIcon: {
    position: 'relative',
    top: 18,
    left: 18,
    marginBottom: '5%',
  },
});

// module.exports = {fetchData : fetchData , patientScreen : patientScreen}   ;
export default DoctorScreen;