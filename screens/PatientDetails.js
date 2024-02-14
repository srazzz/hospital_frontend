import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PatientDetails = ({navigation: {goBack}, route}) => {
  const {name, age} = route.params;

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={{
          height: 40,
          alignItems: 'flex-start',
          marginTop: 5,
          marginLeft: 5,
        }}>
        <Icon name="arrow-back-ios" size={30} style={{color: 'black'}} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Patient Details</Text>
          <Text style={styles.label}>Name:{name} </Text>
          <Text style={styles.label}>Age: {age}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '96%',
    padding: 20,
    backgroundColor: '#D3E6E5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  box: {
    width: '95%',
    margin: 4,
    borderRadius: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    paddingTop: 40,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PatientDetails;
