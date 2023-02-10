import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {connection} from '../connection';

const renderItem = ({item}) => (
  <View style={styles.box}>
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
      console.log(data);
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
  icon: {
    marginRight: 10,
    flex: 1,
  },
});

export default DoctorScreen;
