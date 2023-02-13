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
import {connection} from '../connection';

const renderItem = ({item}) => (
  <View style={styles.box}>
    <TouchableOpacity
      style={styles.editOption}
      // onPress={() => navigation.navigate('AddDoctorScreen')}
      >
      <Text style={{color : "black" , alignItems : "center"}}>  E</Text>
    </TouchableOpacity>

    <Text style={styles.firstname}>
      Name : {item.name}
      {'\n'}
    </Text>
    <Text style={styles.lastname}>
      speciality : {item.specialty}
      {'\n'}
    </Text>
  </View>
);

const DoctorScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const filteredData =
    data &&
    data.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    async function fetchData() {
      let doctorData = await connection('doctors');
      setData(doctorData);
      // console.log('777777777777777777777777777777777777777777777777777777777777',data);
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
          placeholder="Doctor Search Here...."
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
      />
      <TouchableOpacity style={styles.floatingButton}
      // onPress = {postData()}
      >
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
    margin: 5,
  },
  firstname: {
    color: '#D3E6E6',
    textAlign: 'left',
    justifyContent: 'center',
  },
  lastname: {
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
  floatButtonText: {
    color: 'black',
    fontSize: 20,
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
    top : 5,
    right :10,
  },
});

export default DoctorScreen;
