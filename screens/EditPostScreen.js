import React, { useState, useEffect } from "react";
import {
  View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePost } from "../services/posts";

export default function EditPostScreen({ route, navigation }) {
  const { postId, initialTitle, initialContent } = route.params;
  const [title, setTitle]     = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [userId, setUserId]   = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  const onSubmit = async () => {
    if (!userId) return;
    await updatePost(userId, postId, {
      title,
      content,
      updatedAt: Date.now(),
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
      <Button title="Оновити" onPress={onSubmit} />
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
