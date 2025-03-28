import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import GameCard from '../components/GameCard';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const mockGames = Array.from({ length: 20 }, (_, i) => ({
  id: `${i}`,
  title: `Game #${i + 1}`,
}));

export default function Store() {
  const [games, setGames] = useState(mockGames);

  const loadMore = () => {
    const more = Array.from({ length: 10 }, (_, i) => ({
      id: `${games.length + i}`,
      title: `Game #${games.length + i + 1}`,
    }));
    setGames(prev => [...prev, ...more]);
  };

  return (
    <Container>
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <GameCard title={item.title} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
}
