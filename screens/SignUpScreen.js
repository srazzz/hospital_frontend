import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignupForm = ({navigation: {goBack}}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSignUp = () => {
    // Handle sign up logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon}
      onPress={() => goBack()}>
        <Icon
          name="arrow-back-ios"
          size={30} 
          style={{color:"black"}}
          />
        <Text style={{color:"black" , fontSize :10}}>GoBack</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up Here....</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholderTextColor="grey"
        placeholder="Name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholderTextColor="grey"
        placeholder="Email-ID"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholderTextColor="grey"
        placeholder="Mobile Number"
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="password"
        placeholderTextColor="grey"
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        placeholder="Confirm password"
        placeholderTextColor="grey"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    color: 'black',
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 300,
    justifyContent: 'center',
    top: '-5%',
  },
  backIcon : {
    position : "absolute",
    top:18,
    left : 18,
    flex:1,
    flexDirection:"column",
    alignItems:"center"
  }
});

export default SignupForm;
