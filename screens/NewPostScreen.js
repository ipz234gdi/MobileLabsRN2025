// screens/NewPostScreen.js
import React, { useState, useEffect } from "react";
import {
  View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createPost } from "../services/posts";

export default function NewPostScreen({ navigation }) {
  const [title, setTitle]     = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId]   = useState(null);
  const [author, setAuthor]   = useState("");

  useEffect(() => {
    AsyncStorage.multiGet(["userId","userEmail"])
      .then(([[_k, uid],[_k2,email]]) => {
        setUserId(uid);
        setAuthor(email);
      });
  }, []);

  const onSubmit = async () => {
    if (!userId) return;
    await createPost(userId, {
      title,
      content,
      authorEmail: author,
      createdAt: Date.now(),
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TextInput
        style={s.input}
        placeholder="Заголовок"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[s.input, s.textarea]}
        placeholder="Текст поста"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Зберегти" onPress={onSubmit} />
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flex:         1,
    backgroundColor: "#f0f4f8",
    padding:      16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth:  1,
    borderColor:  "#ccc",
    borderRadius: 6,
    padding:      12,
    marginBottom: 12,
  },
  textarea: {
    height:     120,
    textAlignVertical: "top",
  },
});
