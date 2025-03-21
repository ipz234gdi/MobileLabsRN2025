import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

export default function GalleryScreen() {
  const galleryData = Array.from({ length: 20 }, (_, i) => ({
    id: i.toString(),
    img: require("../assets/img1.png"),
  }));

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Сторінка галереї</Text>
      <FlatList
        data={galleryData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.img} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    aspectRatio: 3 / 2,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
