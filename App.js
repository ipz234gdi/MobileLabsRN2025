import React, { useState } from "react";
import {StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import GalleryScreen from "./screens/GalleryScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function withNavBar(Component) {
  return function WrappedComponent(props) {
    return (
      <>
        <NavBar navigation={props.navigation} />
        <Component {...props} />
        <Text style={styles.fottertext}>Грушевицький Денис Ігорович ІПЗ-23-4</Text>
      </>
    );
  };
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.navcontainer}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={withNavBar(HomeScreen)} />
          <Stack.Screen name="Gallery" component={withNavBar(GalleryScreen)} />
          <Stack.Screen name="Profile" component={withNavBar(ProfileScreen)} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );

  
}

const styles = StyleSheet.create({
  navcontainer: {
    width: "100%",
  },
  fottertext: {
    width: '100%',
    textAlign: 'center',
  },
});
