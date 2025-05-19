import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { navigationRef } from "./navigation/RootNavigation";
import LoginScreen from "./screens/LoginScreen";
import PostsScreen from "./screens/PostsScreen";
import NewPostScreen from "./screens/NewPostScreen";
import EditPostScreen from "./screens/EditPostScreen";

const Stack = createStackNavigator();

function RootNavigator() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      {userToken ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Posts"
            component={PostsScreen}
            options={{ title: "Ваші пости" }}
          />
          <Stack.Screen
            name="NewPost"
            component={NewPostScreen}
            options={{ title: "Новий пост" }}
          />
          <Stack.Screen
            name="EditPost"
            component={EditPostScreen}
            options={{ title: "Редагувати пост" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
