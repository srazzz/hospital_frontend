import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

const displayCard = ({ route }) => {
  const { name, age } = route.params;

  return (
    <ScrollView style={styles.container}>
			<View style={styles.box}>
			<Text style={styles.heading}>Patient Details</Text>

{/* <View style={styles.row}>
	<Text style={styles.label}>Name:{JSON.stringify(name)}
	</Text>
	<Text style={styles.value}>{patient.name}</Text>
</View>

<View style={styles.row}>
	<Text style={styles.label}>Age:</Text>
	<Text style={styles.value}>{patient.age}</Text>
</View> */}

<Text style={styles.label}>Name: {name}</Text>
      <Text style={styles.label}>Age: {age}</Text>
			</View>

      {/* <View style={styles.row}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{patient.gender}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{patient.address}</Text>
      </View> */}


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
		// color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
	box: {
    // flex: 1 / 2,
    width: '95%',
    // backgroundColor: '#3B6474',
    margin: 4,
    borderRadius: 12,
    textAlign: 'center',
    // height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 4,
    // borderColor: 'black',
  },
  label: {
    // flex: 1,
		// color: '#FFF',
		paddingTop: 40,
		paddingLeft: 5,
    // right: 40,
    // textAlign: 'left',
    // alignItems: 'flex-start',
    fontWeight: 'bold',
  },
});

export default displayCard;
