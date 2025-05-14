import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as FileSystem from "expo-file-system";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import FileBrowserScreen from "./screens/FileBrowserScreen";
import FileScreen from "./screens/FileScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6C63FF",
    accent: "#FF6584",
    background: "#F2F2F2",
  },
};

const Stack = createStackNavigator();
const APP_DIR = FileSystem.documentDirectory + "AppData/";

export default function App() {
  // Створюємо папку AppData, якщо нема
  useEffect(() => {
    (async () => {
      const info = await FileSystem.getInfoAsync(APP_DIR);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(APP_DIR, { intermediates: true });
      }
    })();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Browser">
          <Stack.Screen
            name="Browser"
            component={FileBrowserScreen}
            options={{ title: "📂 Файловий менеджер" }}
          />
          <Stack.Screen
            name="File"
            component={FileScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
