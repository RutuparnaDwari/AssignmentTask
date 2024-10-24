import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "./Screen/LoginScreen";

import WelcomeScreen from "./Screen/WelcomeScreen";
import ContactScreen from "./Screen/ContactScreen";




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="WelcomePage" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ContactPage" component={ContactScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

