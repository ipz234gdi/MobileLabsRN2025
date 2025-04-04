import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../HomeScreen";
import TasksScreen from "../TasksScreen";

const initialTasks = [
  { id: '1', description: 'Зробити 10 кліків', completed: false },
  { id: '2', description: 'Зробити 5 подвійних кліків', completed: false },
  { id: '3', description: 'Утримувати об\'єкт 3 секунди', completed: false },
  { id: '4', description: 'Перетягнути об\'єкт', completed: false },
  { id: '5', description: 'Зробити свайп вправо', completed: false },
  { id: '6', description: 'Зробити свайп вліво', completed: false },
  { id: '7', description: 'Змінити розмір об\'єкта', completed: false },
  { id: '8', description: 'Отримати 100 очок', completed: false },
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Головний екран" }}
          initialParams={{ tasks: initialTasks }}
        />
        <Stack.Screen
          name="Tasks"
          component={TasksScreen}
          options={{ title: "Завдання" }}
          initialParams={{ initialTasks }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}