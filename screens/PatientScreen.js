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
import Modal from 'react-native-modal';
import {connection, del} from '../connection';
// import Form from './patientForm';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const fetchData = async (setData,data) => {
  console.log('fetched');
  let patientData = await connection('patients');
  setData(patientData);
};

const editOptionFunctions = (
  visible,
  setVisible,
  setId,
  setName,
  setAge,
  id,
  name,
  age,
  functionName,
  setFunctionName,
) => {
  setVisible(true);
  setId(id);
  setName(name);
  setAge(age);
  setFunctionName('put');
  //  console.log(functionName,"heyyyyyyyyyyyyyyyyyyy");
};

const delOptionFunctions = (id,setData,data) => {
  Alert.alert('Are you sure', 'Delete card', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        console.log("ok pressed",id)
        del(id, 'patients') + fetchData(setData,data);
        console.log("delted")
      },
    },
  ]);
};

const renderItem = (
  item,
  visible,
  setVisible,
  id,
  setId,
  name,
  setName,
  age,
  setAge,
  functionName,
  setFunctionName,
  setData,data
) => (
  <View style={styles.box}>
    <TouchableOpacity
      style={styles.delOption}
      onPress={() => delOptionFunctions(item.item._id,setData,data)}>
      <Text style={{color: 'black', alignItems: 'center', textAlign: 'center'}}>
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
          setAge,
          item.item._id,
          item.item.name,
          item.item.age,
          functionName,
          setFunctionName,
        )
      }>
      <Text style={{color: 'black', alignItems: 'center', textAlign: 'center'}}>
        <EntypoIcon name={'pencil'} size={15} />
      </Text>
    </TouchableOpacity>

    <Text style={styles.name}>
      Name : {item.item.name}
      {'\n'}
    </Text>
    <Text style={styles.age}>
      age : {item.item.age}
      {'\n'}
    </Text>
  </View>
);

const PatientScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [functionName, setFunctionName] = useState('');
  const filteredData =
    data &&
    data.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    fetchData(setData,data);
  }, []);

  return (
    <View style={styles.background}>
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
          placeholder="Patient Search Here...."
          placeholderTextColor="#000"
          style={styles.searchBar}
          onChangeText={text => setSearchTerm(text)}
        />
        <Image
          source={require('../images/search_icon.png')}
          style={{width: '15%', height: '80%', resizeMode: 'contain'}}
        />
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
            age,
            setAge,
            functionName,
            setFunctionName,
            setData,data,
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
          setAge('') +
          setId('')
        }>
        <Text style={styles.floatButtonText}>+</Text>
      </TouchableOpacity>
      <Modal isVisible={visible} transparent={false} style={styles.modalForm}>
        <View>
          {/* <Form
            setVisible={setVisible}
            visible={visible}
            id={id}
            name={name}
            age={age}
            setId={setId}
            setName={setName}
            setAge={setAge}
            functionName={functionName}
            setFunctionName={setFunctionName}
            fetchData={fetchData}
            data={data}
            setData={setData}
          /> */}
        </View>
      </Modal>
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
  },
  name: {
    color: '#D3E6E6',
    textAlign: 'left',
    justifyContent: 'center',
  },
  age: {
    color: '#D3E6E6',
    textAlign: 'left',
    justifyContent: 'center',
  },
  box: {
    // flex: 1 / 2,
    width: '48%',
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
    // top : "89%",
    // left : "80%",
    top: 603,
    left: 290,
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
});

// module.exports = {fetchData : fetchData , patientScreen : patientScreen}   ;
export default PatientScreen;