import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import SearchIcon from "../assets/search.svg";

const Main = styled.View`
  padding: 0px 16px;
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const SearchTabsRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 4px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const SearchBox = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: ${({ active, theme }) => (active ? "#1A8CFF" : theme.card)};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const TabsScroll = styled.ScrollView`
  flex-grow: 0;
`;

const Tab = styled.TouchableOpacity`
  background-color: ${({ active, theme }) => (active ? "#1A8CFF" : theme.card)};
  padding: 8px 16px;
  border-radius: 10px;
  margin-right: 8px;
`;

const TabText = styled.Text`
  color: white;
  font-weight: bold;
`;

const tabs = [
  { key: "all", label: "All" },
  { key: "screenshots", label: "Screenshots" },
  { key: "artwork", label: "Artwork" },
  { key: "workshop", label: "Workshop" },
];

const newsList = [
  {
    avatar: "https://www.eurogamer.net/assets/favicon.png",
    author: "Eurogamer",
    time: "yesterday • 2:20 pm",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/379430/header.jpg",
    headline: "Florida tourist attraction sues Fortnite",
    subtext: "Coral Castle Museum is suing Epic Games...",
    likes: 324,
    comments: 12,
  },
  {
    avatar: "https://www.eurogamer.net/assets/favicon.png",
    author: "Eurogamer",
    time: "yesterday • 2:20 pm",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/379430/header.jpg",
    headline: "Florida tourist attraction sues Fortnite",
    subtext: "Coral Castle Museum is suing Epic Games...",
    likes: 324,
    comments: 12,
  },
  {
    avatar: "https://www.eurogamer.net/assets/favicon.png",
    author: "Eurogamer",
    time: "yesterday • 2:20 pm",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/379430/header.jpg",
    headline: "Florida tourist attraction sues Fortnite",
    subtext: "Coral Castle Museum is suing Epic Games...",
    likes: 324,
    comments: 12,
  },
  {
    avatar: "https://www.eurogamer.net/assets/favicon.png",
    author: "Eurogamer",
    time: "yesterday • 2:20 pm",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/379430/header.jpg",
    headline: "Florida tourist attraction sues Fortnite",
    subtext: "Coral Castle Museum is suing Epic Games...",
    likes: 324,
    comments: 12,
  },
  {
    avatar: "https://www.eurogamer.net/assets/favicon.png",
    author: "Eurogamer",
    time: "yesterday • 2:20 pm",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/379430/header.jpg",
    headline: "Florida tourist attraction sues Fortnite",
    subtext: "Coral Castle Museum is suing Epic Games...",
    likes: 324,
    comments: 12,
  },
  {
    avatar: "https://www.eurogamer.net/assets/favicon.png",
    author: "Eurogamer",
    time: "yesterday • 2:20 pm",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/379430/header.jpg",
    headline: "Florida tourist attraction sues Fortnite",
    subtext: "Coral Castle Museum is suing Epic Games...",
    likes: 324,
    comments: 12,
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <Main>
      <Header title="Community" />

      <SearchTabsRow>
        <SearchBox>
          <SearchIcon width={20} height={20} stroke="white" />
        </SearchBox>

        <TabsScroll horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              active={activeTab === tab.key}
              onPress={() => setActiveTab(tab.key)}
            >
              <TabText>{tab.label}</TabText>
            </Tab>
          ))}
        </TabsScroll>
      </SearchTabsRow>

      <FlatList
        data={newsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NewsCard
            avatar={item.avatar}
            author={item.author}
            time={item.time}
            image={item.image}
            headline={item.headline}
            subtext={item.subtext}
            likes={item.likes}
            comments={item.comments}
          />
        )}
      />
    </Main>
  );
}
