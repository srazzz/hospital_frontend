import React, {useState} from 'react';
import {FlatList, View, Text, StyleSheet, TextInput, Image} from 'react-native';

const data = [
  {
    firstName: 'Scotty',
    lastName: 'Trevorrow',
  },
  {
    firstName: 'Bernarr',
    lastName: 'Armatage',
  },
  {
    firstName: 'Carlynn',
    lastName: 'Kivlehan',
  },
  {
    firstName: 'Ferrell',
    lastName: 'Giroldi',
  },
  {
    firstName: 'Thayne',
    lastName: 'Carlow',
  },
  {
    firstName: 'Webb',
    lastName: 'Cordoba',
  },
  {
    firstName: 'Sunshine',
    lastName: 'Ullock',
  },
  {
    firstName: 'Lamont',
    lastName: 'MacScherie',
  },
  {
    firstName: 'Atlanta',
    lastName: 'Tyers',
  },
  {
    firstName: 'Harriet',
    lastName: 'Alldread',
  },
  {
    firstName: 'Chrissie',
    lastName: 'Caddie',
  },
  {
    firstName: 'Siobhan',
    lastName: 'de Najera',
  },
  {
    firstName: 'Ondrea',
    lastName: 'Cumming',
  },
  {
    firstName: 'Phillipe',
    lastName: 'Ames',
  },
  {
    firstName: 'Dex',
    lastName: 'Woodwind',
  },
  {
    firstName: 'Van',
    lastName: 'Petyakov',
  },
  {
    firstName: 'Violet',
    lastName: 'Weatherhogg',
  },
  {
    firstName: 'Terence',
    lastName: 'Clewley',
  },
  {
    firstName: 'Portia',
    lastName: 'De Haven',
  },
  {
    firstName: 'Penny',
    lastName: 'Petren',
  },
  {
    firstName: 'Wilmer',
    lastName: 'Grimwood',
  },
];

const renderItem = ({item}) => (
  <View style={styles.box}>
    <Text style={styles.firstname}>
      first Name : {item.firstName}
      {'\n'}
    </Text>
    <Text style={styles.lastname}>
      last Name : {item.lastName} {'\n'}
    </Text>
  </View>
);

const PatientScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter(person =>
    person.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <View style={styles.background}>
      <View style={{         
            flexDirection: 'row',
          height: 50,
          margin: 10,
          backgroundColor: '#FFF',
          alignItems: 'center',
          borderRadius: 10,}}>
        <TextInput
          placeholder="patient Search Here...."
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
        keyExtractor={item => item.lastName}
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
    flex: 1 / 2,
    backgroundColor: '#1B4646',
    margin: 4,
    borderRadius: 12,
    textAlign: 'center',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PatientScreen;
