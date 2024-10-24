import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";



const WelcomeScreen = () => {
    const navigation = useNavigation();



    const handleNextScreen = ()=>{
        navigation.navigate("ContactPage");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}> HELLO WELCOME</Text>
            <Pressable style={styles.nextButton} onPress={handleNextScreen}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
        </View>
    )
}

export default WelcomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '500',

    },
    nextButton: {
        backgroundColor: '#4CAF50', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop:20
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight:'500'
    },
})