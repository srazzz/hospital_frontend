import { View, Text, StyleSheet } from 'react-native';

const MainScreen = () => {
    return (
        <View style={styles.background}>
            <Text style={styles.text}>Doctor</Text>
            <Text style={styles.text}>patient</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    background : {
      backgroundColor : "#D3E6E5",
      height : "100%",
      width : "100%",
    },
    text : {
        color : "black",
        
    }
    })
export default MainScreen;