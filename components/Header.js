import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import SteamIcon from '../assets/steam.svg';
import SearchIcon from '../assets/search.svg';

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 34px;
  font-weight: 400;
  margin-left: 8px;
  flex: 1;
`;

export default function Header({ title = "Store" }) {
  return (
    <HeaderContainer>
      <SteamIcon width={48} height={48} />
      <Title>{title}</Title>
      {(title === "Store" || title === "Chat") && (
        <SearchIcon width={28} height={28} />
      )}
    </HeaderContainer>
  );
}
