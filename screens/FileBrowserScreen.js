import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { FAB } from "react-native-paper";

import Breadcrumb from "../components/Breadcrumb";
import FileItem from "../components/FileItem";
import MemoryStats from "../components/MemoryStats";

const APP_DIR = FileSystem.documentDirectory + "AppData/";

export default function FileBrowserScreen({ navigation }) {
  const [currentPath, setCurrentPath] = useState(APP_DIR);
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [createType, setCreateType] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputContent, setInputContent] = useState("");

  // Перечитуємо директорію на фокусі
    useEffect(() => {
    readDir();
    }, [currentPath]);

    // І один раз на старті:
    useEffect(() => {
    readDir();
    }, []);

  async function readDir() {
    const names = await FileSystem.readDirectoryAsync(currentPath);
    const detailed = await Promise.all(
      names.map(async (name) => {
        const uri = currentPath + name;
        const info = await FileSystem.getInfoAsync(uri);
        return { name, uri, isDirectory: info.isDirectory, info };
      })
    );
    setItems(detailed);
  }

  function goUp() {
    if (currentPath === APP_DIR) return;
    const parts = currentPath.replace(APP_DIR, "").split("/").filter(Boolean);
    parts.pop();
    setCurrentPath(APP_DIR + parts.join("/") + (parts.length ? "/" : ""));
  }

  function promptCreate(type) {
    setCreateType(type);
    setInputName("");
    setInputContent("");
    setModalVisible(true);
  }

  async function handleCreate() {
    if (!inputName.trim()) return;
    const name = createType === "file" ? `${inputName}.txt` : inputName;
    const uri = currentPath + name;
    if (createType === "folder") {
      await FileSystem.makeDirectoryAsync(uri);
    } else {
      await FileSystem.writeAsStringAsync(uri, inputContent);
    }
    setModalVisible(false);
    readDir();
  }

  function openFile(item) {
    navigation.navigate("File", { uri: item.uri, name: item.name });
  }

  function deleteItem(item) {
    Alert.alert("Видалити?", `Точно видалити ${item.name}?`, [
      { text: "Ні", style: "cancel" },
      {
        text: "Так",
        onPress: async () => {
          await FileSystem.deleteAsync(item.uri, { idempotent: true });
          readDir();
        },
      },
    ]);
  }

  function showInfo(item) {
    Alert.alert(
      "Інфо",
      `Назва: ${item.name}
        Тип: ${item.name.split(".").pop()}
        Розмір: ${item.info.size} байт
        Дата: ${new Date(item.info.modificationTime * 1000).toLocaleString()}`
    );
  }

  return (
    <View style={styles.container}>
      <Breadcrumb style={styles.Breadcrumb} path={currentPath} base={APP_DIR} onPress={setCurrentPath} />
      <MemoryStats />

      <FlatList
        data={items}
        keyExtractor={(i) => i.uri}
        renderItem={({ item }) => (
          <FileItem
            item={item}
            onOpen={() =>
              item.isDirectory ? setCurrentPath(item.uri + "/") : openFile(item)
            }
            onDelete={() => deleteItem(item)}
            onInfo={() => showInfo(item)}
          />
        )}
      />

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => promptCreate("file")}
      />
      <FAB
        style={[styles.fab, { bottom: 80, backgroundColor: "#FF6584" }]}
        small
        icon="folder-plus"
        onPress={() => promptCreate("folder")}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {createType === "folder" ? "Нова папка" : "Новий файл"}
            </Text>
            <TextInput
              placeholder="Назва"
              value={inputName}
              onChangeText={setInputName}
              style={styles.input}
            />
            {createType === "file" && (
              <TextInput
                placeholder="Вміст"
                value={inputContent}
                onChangeText={setInputContent}
                style={[styles.input, { height: 80 }]}
                multiline
              />
            )}
            <View style={styles.modalBtns}>
              <Button
                title="Скасувати"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Створити" onPress={handleCreate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: '#F2F2F2',
    },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#6C63FF",
  },
  Breadcrumb: {
    maxHeight: 30,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  modalBtns: { flexDirection: "row", justifyContent: "space-around" },
});
