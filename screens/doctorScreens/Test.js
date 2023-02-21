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
import {connection, del} from '../../connection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Test = ({navigation: {goBack}}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
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
  const fetchData = async () => {
    let doctorData = await connection('doctors');
    setData(doctorData);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        }}>
        <TouchableOpacity onPress={() => goBack() + setPatientData([])}>
          <Icon name="arrow-back-ios" size={30} style={{color: 'black'}} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#D3E6E5', width: '100%', height: '100%'}}>
        <View
          style={{
            margin: 10,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="doctor Search Here...."
            placeholderTextColor="#000"
            style={{height: 40}}
            onChangeText={text => setSearchTerm(text)}
          />
          <Icon
            name="search"
            size={30}
            style={{color: 'black', marginLeft: '46%'}}
          />
        </View>
        <View>
          {data.length !== 0
            ? data.map(doctor => {
                return <View></View>;
              })
            : null}
        </View>
      </View>
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
export default Test;
