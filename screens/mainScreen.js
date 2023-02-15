
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const MainScreen = ({navigation}) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={{color: 'black', fontSize: 20, padding: 20}}>
          Choose an Option...
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.touchableOpacity}>
          <Text style={styles.Card}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('patientScreen')}
          style={styles.touchableOpacity}>
          <Text style={styles.Card}>Patient</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#D3E6E5',
    height: '100%',
    width: '100%',
  },
  Card: {
    backgroundColor: '#1B4646',
    borderColor: 'black',
    borderWidth: 4,
    color: '#FFF',
    textAlign: 'center',
    padding: 30,
    margin: 20,
    width: 300,
    borderRadius: 20,
    fontSize: 20,
    textAlign: 'center',
  },

  touchableOpacity: {},
  container: {
    marginTop: '55%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
});
export default MainScreen;
