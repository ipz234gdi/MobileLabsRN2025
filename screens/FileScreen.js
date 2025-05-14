import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {
  TextInput,
  Button,
  Surface,
  useTheme,
  Appbar,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';

export default function FileScreen({ route, navigation }) {
  const { uri, name } = route.params;
  const [text, setText] = useState('');
  const [infoVisible, setInfoVisible] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const { colors } = useTheme();

  // Читаємо файл
  useEffect(() => {
    (async () => {
      const content = await FileSystem.readAsStringAsync(uri);
      setText(content);
      const info = await FileSystem.getInfoAsync(uri);
      setFileInfo(info);
    })();
  }, [uri]);

  async function save() {
    await FileSystem.writeAsStringAsync(uri, text);
    navigation.goBack();
  }

  function showInfo() {
    setInfoVisible(true);
  }

  function hideInfo() {
    setInfoVisible(false);
  }

  return (
    <View style={styles.root}>
      {/* Редактор у поверхні */}
      <Surface style={styles.editorContainer}>
        <TextInput
          mode="outlined"
          multiline
          value={text}
          onChangeText={setText}
          style={[styles.editor, { backgroundColor: '#fff' }]}
          placeholder="Введіть текст..."
        />
        <Button
          mode="contained"
          onPress={save}
          style={styles.saveButton}
          contentStyle={{ paddingVertical: 8 }}
        >
          💾 Зберегти
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F2F2' },
  editorContainer: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  editor: {
    flex: 1,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 12,
    borderRadius: 24,
  },
});
