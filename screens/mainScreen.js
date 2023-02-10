import {View, Text, StyleSheet, Button} from 'react-native';

const MainScreen = ({navigation}) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={{color: 'black', fontSize: 20, padding: 40}}>
          Choose an Option...
        </Text>
        <Button
          title="Doctor"
          onPress={() => navigation.navigate('DoctorScreen')}
          style={styles.Button}>
          <Text style={styles.text}>Doctor</Text>
        </Button>
        <Button
          title="Patient"
          onPress={() => navigation.navigate('PatientScreen')}
          style={styles.Button}>
          <Text style={styles.text}>Patient</Text>
        </Button>
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
  text: {
    backgroundColor: '#1B4646',
    borderColor: '#FFF',
    borderWidth: 2,
    color: '#FFF',
    textAlign: 'center',
    padding: 30,
    margin: 20,
    width: 300,
    borderRadius: 20,
  },
  Button: {},
  container: {
    marginTop: '45%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
});
export default MainScreen;
