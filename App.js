import React, { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function NavBar({ navigation }) {
  return (
    <>
      <View style={styles.UPNavBar}>
        <View style={{ paddingLeft: 10 }}>
          <Image
            source={require("../Lab-1/assets/ztuedu-logo.png")}
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

function HomeScreen({ navigation }) {
  const newsData = Array.from({ length: 20 }, (_, i) => ({
    id: i.toString(),
    title: `Заголовок новини ${i + 1}`,
    date: "Дата новини",
    text: "Короткий текст новини",
  }));

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Новини</Text>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              width: "100%",
              minWidth: 400,
            }}
          >
            <View style={{ paddingLeft: 10 }}>
              <Image
                source={require("../Lab-1/assets/hills.png")}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ paddingLeft: 10, flex: 1 }}>
              <Text>{item.title}</Text>
              <Text>{item.date}</Text>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

function GalleryScreen() {
  const gallerydata = Array.from({ length: 20 }, (_, i) => ({
    id: i.toString(),
    img: require("../Lab-1/assets/img1.png"),
  }));
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Сторінка галереї</Text>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={gallerydata}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.img} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Реєстрація</Text>
      <View style={styles.Profilescreen}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Пароль</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Ім'я</Text>
        <TextInput style={styles.input} editable={false} />

        <TouchableOpacity style={styles.button} activeOpacity={1}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.navcontainer}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreenWithNav} />
          <Stack.Screen name="Gallery" component={GalleryScreenWithNav} />
          <Stack.Screen name="Profile" component={ProfileScreenWithNav} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );

  function HomeScreenWithNav(props) {
    return (
      <>
        <NavBar navigation={props.navigation} />
        <HomeScreen {...props} />
      </>
    );
  }
  function GalleryScreenWithNav(props) {
    return (
      <>
        <NavBar navigation={props.navigation} />
        <GalleryScreen {...props} />
      </>
    );
  }
  function ProfileScreenWithNav(props) {
    return (
      <>
        <NavBar navigation={props.navigation} />
        <ProfileScreen {...props} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  navcontainer: {
    width: "100%",
  },
  NavBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 160,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 10,
  },
  UPNavBar: {
    // flex: 1,
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
  title: {
    marginBottom: 10,
    fontSize: 28,
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    width: 100,
    // height: 100,
    aspectRatio: 4 / 2,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  navbtn: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 80,
    // height: 40,
  },
  navText: {
    color: "white",
    fontSize: 16,
  },
  newscontainer: {
    width: "100%",
  },
  screen: {
    flex: 1,
    width: "100%",
    marginTop: 100,
    alignItems: "center",
    // justifyContent: 'center',
  },

  Profilescreen: {
    flex: 1,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: 600,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
