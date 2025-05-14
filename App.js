import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getData, storeData, clearAll } from './utils/storage';
import { initPushService, schedulePush, cancelPush } from './services/pushService';

import TaskListScreen from './screens/TaskListScreen';
import TaskFormScreen from './screens/TaskFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    initPushService();
    (async () => {
      const saved = await getData('tasks');
      if (saved) setTasks(saved);
    })();
  }, []);

  const addTask = async (task) => {
    const withId = { ...task, id: Date.now().toString() };
    const updated = [...tasks, withId];
    setTasks(updated);
    await storeData('tasks', updated);

    const notifId = await schedulePush(withId);
    if (notifId) {
      withId.notificationId = notifId;
      const synced = updated.map(t =>
        t.id === withId.id ? withId : t
      );
      setTasks(synced);
      await storeData('tasks', synced);
    }
  };

  const deleteTask = async (id) => {
    const toDel = tasks.find(t => t.id === id);
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
    await storeData('tasks', filtered);
    if (toDel?.notificationId) await cancelPush(toDel.notificationId);
  };

  const clearAllTasks = async () => {
    for (const t of tasks) if (t.notificationId) await cancelPush(t.notificationId);
    setTasks([]);
    await clearAll();
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="TaskList" options={{ title: 'Your Tasks' }}>
          {props => (
            <TaskListScreen
              {...props}
              tasks={tasks}
              onDeleteTask={deleteTask}
              onClearAll={clearAllTasks}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TaskForm" options={{ title: 'Create Task' }}>
          {props => (
            <TaskFormScreen
              {...props}
              onAddTask={addTask}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
