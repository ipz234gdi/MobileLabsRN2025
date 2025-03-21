import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

export default function HomeScreen() {
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
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image
              source={require("../assets/hills.png")}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            <View style={styles.newsText}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  newsItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
