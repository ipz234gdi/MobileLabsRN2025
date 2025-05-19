import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { getPosts, deletePost } from "../services/posts";

export default function PostsScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem("userId").then((uid) => setUserId(uid));
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      (async () => {
        try {
          const res = await getPosts(userId);
          const data = res.data || {};
          setPosts(Object.entries(data).map(([id, p]) => ({ id, ...p })));
        } catch (e) {
          console.error("fetchPosts:", e);
          if (e.response?.status === 401) signOut();
        }
      })();
    }, [userId])
  );

  const handleDelete = async (id) => {
    await deletePost(userId, id);
    const res = await getPosts(userId);
    const data = res.data || {};
    setPosts(Object.entries(data).map(([i, p]) => ({ id: i, ...p })));
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Button title="Logout" onPress={signOut} color="#c00" />
        <Button
          title="New Post"
          onPress={() => navigation.navigate("NewPost")}
        />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Text style={s.title}>{item.title}</Text>
            <Text style={s.content}>{item.content}</Text>
            {(() => {
              const isUpdated = !!item.updatedAt;
              const label = isUpdated ? "Оновлено" : "Створено";
              const timestamp = new Date(
                isUpdated ? item.updatedAt : item.createdAt
              ).toLocaleString();
              return (
                <Text style={s.meta}>
                  {label}: {timestamp} | Автор:{" "}
                  <Text style={{ fontWeight: "bold" }}>{item.authorEmail}</Text>
                </Text>
              );
            })()}
            <View style={s.buttonsRow}>
              <TouchableOpacity
                style={s.btnEdit}
                onPress={() =>
                  navigation.navigate("EditPost", {
                    postId: item.id,
                    initialTitle: item.title,
                    initialContent: item.content,
                  })
                }
              >
                <Text style={s.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.btnDelete}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={s.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef3f8",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: "#555",
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnEdit: {
    backgroundColor: "#4caf50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  btnDelete: {
    backgroundColor: "#e91e63",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
