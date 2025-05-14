import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function TaskFormScreen({ navigation, onAddTask }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const submit = () => {
    if (!title.trim()) {
      alert('Enter task title');
      return;
    }
    onAddTask({ title, description: desc, reminderTime: date.toISOString(), completed:false, createdAt: new Date().toISOString() });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        multiline numberOfLines={3}
      />
      <TouchableOpacity style={styles.dateBtn} onPress={() => setOpen(true)}>
        <Text>{date.toLocaleString()}</Text>
      </TouchableOpacity>
      <DatePicker
        modal open={open} date={date}
        onConfirm={d => { setOpen(false); setDate(d); }}
        onCancel={() => setOpen(false)}
        minimumDate={new Date()}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={submit}>
        <Text style={styles.submitText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', padding:20 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:5, padding:10, marginBottom:15 },
  textArea: { height:80, textAlignVertical:'top' },
  dateBtn: { borderWidth:1, borderColor:'#ccc', borderRadius:5, padding:12, marginBottom:20 },
  submitBtn: { backgroundColor:'#4a6da7', padding:15, borderRadius:5, alignItems:'center' },
  submitText: { color:'#fff', fontWeight:'600', fontSize:16 },
});
