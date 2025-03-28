import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Header from "../components/Header";
import ChatItem from "../components/ChatItem";

const Main = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 16px;
`;

const TabsRow = styled.View`
  flex-direction: row;
  margin: 6px 0;
  border-radius: 8px;
  padding: 3px;
  background-color: ${({ theme }) => theme.card};
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ active, theme }) =>
    active ? theme.background : theme.card};
  align-items: center;
  margin-right: ${({ last }) => (last ? "0" : "8px")};
`;

const TabText = styled.Text`
  color: ${({ active }) => (active ? "white" : "gray")};
  font-weight: bold;
`;

const chatTemplates = [
  {
    name: "Mark Dyson",
    message: "I'm already starting to play",
    initials: "😎",
  },
  {
    name: "Player123",
    message: "You: Ok",
    initials: "🎮",
  },
  {
    name: "Player",
    message: "Hello!",
    initials: "?",
  },
  {
    name: "𝓢xpŕėśśo",
    message: "Ok",
    initials: "💎",
  },
];

function generateRandomChats(count) {
  const chats = [];
  for (let i = 0; i < count; i++) {
    const template =
      chatTemplates[Math.floor(Math.random() * chatTemplates.length)];
    const day = Math.floor(Math.random() * 28) + 1;
    const date = `${day < 10 ? "0" + day : day} Jun`;

    chats.push({
      id: i.toString(),
      name: template.name,
      message: template.message,
      initials: template.initials,
      date,
    });
  }
  return chats;
}

export default function Chat() {
  const [activeTab, setActiveTab] = useState("open");
  const [chats] = useState(() => generateRandomChats(30));

  return (
    <Main>
      <Header title="Chat" />

      <TabsRow>
        <Tab active={activeTab === "open"} onPress={() => setActiveTab("open")}>
          <TabText active={activeTab === "open"}>Open chats</TabText>
        </Tab>
        <Tab
          active={activeTab === "friends"}
          last
          onPress={() => setActiveTab("friends")}
        >
          <TabText active={activeTab === "friends"}>My friends</TabText>
        </Tab>
      </TabsRow>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            name={item.name}
            message={item.message}
            date={item.date}
            initials={item.initials}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Main>
  );
}
