import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import GameCard from "../components/GameCard";
import Header from "../components/Header";
import BannerCard from "../components/BannerCard";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Main = styled.View`
  padding: 0px 16px;
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const BannerScroll = styled.ScrollView`
  max-height: 320px;
`;

const TabsContainer = styled.ScrollView`
  flex-grow: 0;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Tab = styled.TouchableOpacity`
  background-color: ${({ active, theme }) => (active ? "#1A8CFF" : theme.card)};
  padding: 8px 16px;
  border-radius: 10px;
  margin-right: 8px;
`;

const TabText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const gameTemplates = [
  {
    title: "Grand Theft Auto V",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlVVAeSBGy9N-zDCbHUWsa-8suqNTfg_ZW0A&s",
    platforms: "🪟 Windows",
    oldPrice: "$20",
    newPrice: "$10",
    discount: "-50%",
  },
  {
    title: "Battlefield 4™",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1238860/capsule_616x353.jpg?t=1734376923",
    platforms: "🪟 Windows",
    newPrice: "$35",
  },
  {
    title: "Factorio",
    image:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000056818/c700b4cc22a81c2099335d83fe379e9cdc6afd190a9985f74ba8f7e589f4ffd2",
    platforms: "🪟 Windows, 🍎 Mac",
    newPrice: "$7",
  },
  {
    title: "Horizon Zero Dawn",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVTBJ3mmMR_vBw8zCwWouT-AZKX9xyT0VI8Q&s",
    platforms: "🪟 Windows",
    newPrice: "$38",
  },
  {
    title: "Portal 2",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg",
    platforms: "🪟 Windows, 🍎 Mac",
    oldPrice: "$15",
    newPrice: "$3",
    discount: "-80%",
  },
];

function generateRandomGames(count) {
  return Array.from({ length: count }, (_, i) => {
    const template =
      gameTemplates[Math.floor(Math.random() * gameTemplates.length)];
    return {
      id: `${i}`,
      ...template,
    };
  });
}

const tabs = [
  { key: "top", label: "Top Sellers" },
  { key: "ftp1", label: "Free to play" },
  { key: "early1", label: "Early Access" },
  { key: "ftp2", label: "Free to play" },
  { key: "early2", label: "Early Access" },
];

export default function Store() {
  const [games, setGames] = useState(generateRandomGames(10));
  const [activeTab, setActiveTab] = useState("Top Sellers");

  const loadMore = () => {
    const more = generateRandomGames(10).map((game, i) => ({
      ...game,
      id: `${games.length + i}`,
    }));
    setGames((prev) => [...prev, ...more]);
  };

  return (
    <Main>
      <Header />
      <BannerScroll horizontal showsHorizontalScrollIndicator={false}>
        <BannerCard />
        <BannerCard />
      </BannerScroll>

      <TabsContainer horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            active={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          >
            <TabText>{tab.label}</TabText>
          </Tab>
        ))}
      </TabsContainer>

      <Container>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              title={item.title}
              image={item.image}
              oldPrice={item.oldPrice}
              newPrice={item.newPrice}
              discount={item.discount}
              platforms={item.platforms}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </Container>
    </Main>
  );
}
