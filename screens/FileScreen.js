import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function FileScreen({ route, navigation }) {
  const { uri } = route.params;
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const content = await FileSystem.readAsStringAsync(uri);
      setText(content);
    })();
  }, [uri]);

  async function save() {
    await FileSystem.writeAsStringAsync(uri, text);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="💾 Зберегти" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:10 },
  editor: {
    flex:1, borderWidth:1, borderColor:'#ccc',
    borderRadius:4, padding:8, textAlignVertical:'top'
  }
});
