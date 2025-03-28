import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";

import Store from "../screens/Store";
import Community from "../screens/Community";
import Chat from "../screens/Chat";
import Safety from "../screens/Safety";
import Profile from "../screens/Profile";

import StoreIcon from "../assets/store.svg";
import CommunityIcon from "../assets/community.svg";
import ChatIcon from "../assets/chat.svg";
import SafetyIcon from "../assets/safety.svg";

const Tab = createBottomTabNavigator();

const Avatar = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 50px;
`;

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.nav,
          borderTopColor: "transparent",
          paddingTop: "10px",
          height: "60px",
        },
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: "#888888",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          tabBarIcon: ({ size, color }) => (
            <StoreIcon width={size} height={size} stroke={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({ size, color }) => (
            <CommunityIcon width={size} height={size} stroke={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ size, color }) => (
            <ChatIcon width={size} height={size} stroke={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Safety"
        component={Safety}
        options={{
          tabBarIcon: ({ size, color }) => (
            <SafetyIcon width={size} height={size} stroke={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Avatar source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjRmMTzC9sPBw-LShqk-lmz56yizMjK-2zQ&s" }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
