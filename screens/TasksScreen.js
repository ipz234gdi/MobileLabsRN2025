import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function TasksScreen({ navigation, route }) {
  const [tasks, setTasks] = useState(route.params?.tasks || []);
  const [points, setPoints] = useState(route.params?.points || 0);

  useEffect(() => {
    if (route.params?.tasks) {
      setTasks(route.params.tasks);
    }
    if (route.params?.points !== undefined) {
      setPoints(route.params.points);
    }
  }, [route.params]);

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.description}</Text>
      <Text style={[styles.taskStatus, item.completed ? styles.completed : styles.pending]}>
        {item.completed ? 'Виконано' : 'Не виконано'}
      </Text>
    </View>
  );

  const goBack = () => {
    navigation.navigate('Home', { updatedTasks: tasks, points: points });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>Загальні очки: {points}</Text>
      
      <FlatList 
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Повернутись</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  taskText: {
    fontSize: 16,
  },
  taskStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});