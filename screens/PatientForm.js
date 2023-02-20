import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
} from 'react-native';
import {postData, putData} from '../connection';

const Form = props => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(props.name);
  const [age, setAge] = useState(props.age);
  const [id, setId] = useState(props.id);
  //   const [error, setError] = useState({});

  //   const validate = (name, age) => {
  //     console.log(error)
  //     setError(error.name="",error.age="")
  //     console.log(name,age ,"validate fucntion")
  //     if (name === '') {
  //       error.name = 'please enter name ';
  //     }
  //     if (age === '') {
  //       error.age = 'please enter your age ';
  //     }
  //     setError(error);
  // if(error.name !=="" && error.age !== "")
  // Alert.alert("enter details correctly",{error})
  //   };

  const functionOnPressSubmit = async () => {
    // console.log("function name",props.functionName)
    if (props.functionName === 'post') {
      const postedData = await postData(name, age, 'patients');
      // console.log("updated ",postedData);
      // Alert.alert('Info', 'added new data');
      if (postedData.name !== '' && postedData.age !== '') {
        // props.fetchData()
        Alert.alert('Info', 'added new data');
      } else {
        Alert.alert('Info', 'entered wrong data'); //alert not opening
      }
      await props.fetchData(props.setData, props.data);
    } else {
      // setId(id)
      console.log(name, age, id, props.data, 'is data tehre');
      const changedData = putData(id, name, age, 'patients');
      // console.log("changeed data is", changedData)
      await props.fetchData(props.setData, props.data);
      if (changedData.name !== '' && changedData.age !== '') {
        // props.fetchData()
        Alert.alert('Info', ' data updated');
      } else {
        Alert.alert('Info', 'entered wrong data'); //alert not opening
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text styles={styles.formTitle}>
        ----------------- Fill the Patient details-----------------
      </Text>
      <Text style={styles.labelName}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      {/* <View><Text style={{color : "red"}} >{error.name}</Text></View> */}
      <Text style={styles.labelName}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age.toString()}
        onChangeText={setAge}
        placeholder="Enter your age"
      />
     <View style={styles.btnContainer}>
     <Button
        title="Submit"
        onPress={() =>
          functionOnPressSubmit(name, age, 'patients') + props.setVisible(false)}
        
      />
      <Button
        title="cancel"
        onPress={() => props.setVisible(false)}
      />
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#fff',
    padding: 20,
    margin: 20,
  },
  container: {
    backgroundColor: '#3B6474',
    width: '90%',
    justifyContent: 'center',
    marginLeft: '5%',
    alignContent: 'center',
    borderRadius: 4,
    padding: 20,
    borderRadius: 10,
  },
  formTitle: {
    alignContent: 'center',
    color: 'white',
    fontSize: 30,
  },
  labelName: {
    fontSize: 20,
  },
  input: {
    borderRadius: 12,
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    margin: 5,
    height: 35,
    marginBottom: 10,
  },
});

export default Form;
