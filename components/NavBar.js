import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function NavBar({ navigation }) {
  return (
    <>
      <View style={styles.UPNavBar}>
        <View style={{ paddingLeft: 10 }}>
          <Image
            source={require("../assets/ztuedu-logo.png")}
            style={{ width: 150, height: 80 }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.navtitle}>FirstMobileApp</Text>
      </View>
      <View style={styles.NavBar}>
        <TouchableOpacity
          style={styles.navbtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.navText}>Дом</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbtn}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Text style={styles.navText}>Фотогалерея</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.navText}>Профіль</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  UPNavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
  },
  navtitle: {
    paddingRight: 90,
    fontSize: 28,
    fontWeight: "500",
  },
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 50,
    backgroundColor: "black",
  },
  navbtn: {
    padding: 10,
  },
  navText: {
    color: "white",
    fontSize: 16,
  },
});
