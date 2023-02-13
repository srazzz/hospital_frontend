import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {connection} from '../connection';
import Form from './Form';

const renderItem = ({item, setVisible}) => (
  
  <View style={styles.box}>
    <TouchableOpacity
    //  onPress={() => setVisible(true)}
      style={styles.editOption}
      // onPress ={setVisible}
      // onPress={() => setVisible(true)}
    >
      <Text style={{color: 'black', alignItems: 'center'}}> E</Text>
    </TouchableOpacity>
    <Text style={styles.name}>
      Name : {item.name}
      {'\n'}
    </Text>
    <Text style={styles.age}>
      age : {item.age}
      {'\n'}
    </Text>
  </View>
);

const patientScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const [visible ,setVisible] = useState(false)
  const filteredData =
    data &&
    data.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    async function fetchData() {
      let patientData = await connection('patients');
      setData(patientData);
      // console.log(data);
    }
    fetchData();
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
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.name}
        setVisible={setVisible}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatButtonText} onPress={() => setVisible(true)}>+</Text>
      </TouchableOpacity>
      <Modal isVisible={visible} transparent={false} style={styles.modalForm}>
        <View>
          <Form />
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
    right: 10,
  },
  floatButtonText: {
    color: 'black',
    fontSize: 20,
  },
  modalForm : {
    backgroundColor : "#D3E6E5",
    width : "100%",
    margin : 0,

  }
});

export default patientScreen;
