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
// import {connection, del} from '../../connection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { connection,del } from '../connection';
// To fetch the data from api
const fetchData = async (setData, data) => {
  let doctorData = await connection('doctors');
  setData(doctorData);
};

// on pressing edit option
const editOptionFunctions = (
  visible,
  setVisible,
  setId,
  setName,
  setspecialty,
  id,
  name,
  specialty,
  functionName,
  setFunctionName,
) => {
  //to display patient details before editing
  setVisible(true);
  setId(id);
  setName(name);
  setspecialty(specialty);
  setFunctionName('put');
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
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [specialty, setspecialty] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [email, setEmail] = useState('');
  const filteredData =
    data &&
    data.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    fetchData(setData, data);
  }, []);

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
              visible,
              setVisible,
              setId,
              setName,
              setspecialty,
              item.item._id,
              item.item.name,
              item.item.specialty,
              functionName,
              setFunctionName,
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
        renderItem={item =>
          renderItem(
            item,
            visible,
            setVisible,
            id,
            setId,
            name,
            setName,
            specialty,
            setspecialty,
            functionName,
            setFunctionName,
            setData,
            data,
            navigation,
            email,
            setEmail,
          )
        }
        numColumns={2}
        keyExtractor={item => item.name}
        setVisible={setVisible}
        visible={visible}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          setVisible(true) +
          setFunctionName('post') +
          setName('') +
          setspecialty('') +
          setId('') +
          navigation.navigate('Signup')
        }>
        <Text style={styles.floatButtonText}>+</Text>
      </TouchableOpacity>
      {/* <Modal isVisible={visible} transparent={false} style={styles.modalForm}>
        <View>
          <Form
            setVisible={setVisible}
            visible={visible}
            id={id}
            name={name}
            specialty={specialty}
            setId={setId}
            setName={setName}
            setspecialty={setspecialty}
            functionName={functionName}
            setFunctionName={setFunctionName}
            fetchData={fetchData}
            data={data}
            setData={setData}
          />
        </View>
      </Modal> */}
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