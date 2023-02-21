import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

const LoginForm = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
		// Validate the mobile number and password
		if (!username || !password) {
			alert('Please enter your mobile number and password');
			return;
		}
	
		// Check if the mobile number is a valid 10-digit Indian mobile number
		const mobileNumberRegex = /^[6-9]\d{9}$/;
		if (!mobileNumberRegex.test(username)) {
			alert('Please enter a valid 10-digit mobile number');
			return;
		}
		if (password.length < 8) {
			alert('Your password should be at least 8 characters long');
			return;
		}
	
		// Check if the password contains at least one uppercase letter, one lowercase letter, and one number
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (!passwordRegex.test(password)) {
			alert('Your password should contain at least one uppercase letter, one lowercase letter, and one number');
			return;
		}
		// Handle login logic here
		navigation.navigate('DoctorScreen');
  };

	const handleSignUp = () => {
		navigation.navigate('Signup');
	};

  return (
		<View style={styles.container}>
			<Text
			style={styles.Logo}
			><FontistoIcon name={'doctor'} size={70} /></Text>
		<TextInput
			style={styles.input}
			value={username}
			onChangeText={(text) => setUsername(text)}
			placeholder="Enter your Mobile number"
		/>

		<TextInput
			style={styles.input}
			value={password}
			onChangeText={(text) => setPassword(text)}
			placeholder="Password"
			secureTextEntry={true}
		/>
		<TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
			<Text style={styles.buttonText1}>LOG IN</Text>
		</TouchableOpacity>
		<View style={styles.line} />
		<TouchableOpacity style={styles.buttonSingUp} onPress={handleSignUp}>
        <Text style={styles.buttonText2}>SIGN UP</Text>
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
  },
	Logo: {
		justifyContent: 'center',
		position: 'absolute',
		top: '10%',
		color: '#3B6474',
	},
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
		borderRadius: 3,
    marginBottom: 25,
		top: '2%',
  },
  buttonLogin: {
    padding: 10,
		top: '10%',
    borderRadius: 5,
		width: 320,
		borderWidth: 1,
    backgroundColor: '#3B6474',
  },
	buttonSingUp: {
		borderRadius: 5,
		width: 320,
		top: '10%',
    backgroundColor: 'transparent',
		borderWidth: 1,
		color: 'red',
		padding: 10,
	},
  buttonText1: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
	buttonText2: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
	line: {
    height: 1,
    width: '80%',
		top:'10%',
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});

export default LoginForm;
