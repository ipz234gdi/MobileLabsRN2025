import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';

export default function TaskListScreen({ navigation, tasks, onDeleteTask, onClearAll }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('TaskForm')}>
        <Text style={styles.addBtnText}>+ Create Task</Text>
      </TouchableOpacity>

      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No tasks yet</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TaskItem task={item} onDelete={onDeleteTask} />}
        />
      )}

      {tasks.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={onClearAll}>
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f0f0f0', padding:12 },
  addBtn: { backgroundColor:'#4a6da7', padding:12, borderRadius:8, alignItems:'center', marginBottom:10 },
  addBtnText: { color:'#fff', fontSize:16, fontWeight:'600' },
  clearBtn: { backgroundColor:'#e63946', padding:12, borderRadius:8, alignItems:'center', marginTop:10 },
  clearBtnText: { color:'#fff', fontSize:16, fontWeight:'600' },
  empty: { flex:1, justifyContent:'center', alignItems:'center' },
  emptyText: { fontSize:18, color:'#888' },
});
