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
import {connection, del} from '../connection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';


const DoctorScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const filteredData =
    data &&
    data.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    async function fetchData() {
      console.log('fetched');
      let doctorData = await connection('doctors');
      setData(doctorData);
    }
  useEffect(() => {
    fetchData();
  }, []);

  const delOption =_id => {
    Alert.alert('Are you sure', 'Delete card', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', 
      onPress: () => {del(_id) + fetchData()}
    },
    ]);
  };
  const renderItem = ({item}) => (
    <View style={styles.box}>
      <TouchableOpacity
        style={styles.delOption}
        onPress={() => delOption(item._id) }>
        <Text style={{color: 'black', alignItems: 'center', textAlign: 'center'}}
        >
          <Icon name='delete' size={15} />
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.editOption}
        >
        <Text style={{color: 'black', alignItems: 'center', textAlign: 'center'}}
        >
          <EntypoIcon name={'pencil'} size={15} />
        </Text>
        </TouchableOpacity>
  
      <Text style={styles.firstname}>
        Name : {item.name}
        {'\n'}
      </Text>
      <Text style={styles.firstname}>
        id : {item._id}
        {'\n'}
      </Text>
      <Text style={styles.lastname}>
        speciality : {item.specialty}
        {'\n'}
      </Text>
    </View>
  );
  
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
      <TouchableOpacity
        style={styles.floatingButton}
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
    width: '47%',
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
    top: 670,
    left: 290,
  },
  floatButtonText: {
    color: 'black',
    fontSize: 20,
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
});

export default DoctorScreen;
