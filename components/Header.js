import React, { useContext } from 'react';
import { Switch } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { ThemeToggleContext } from '../themes/ThemeProvider';

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
  const theme = useContext(ThemeContext);
  const { toggleTheme, isDark } = useContext(ThemeToggleContext);


  return (
    <HeaderContainer>
      <SteamIcon width={48} height={48} fill={theme.text}/>
      <Title>{title}</Title>
      {title !== "Profile" && (
        <Switch value={isDark} onValueChange={toggleTheme} />
      )}
      {(title === "Store" || title === "Chat") && (
        <SearchIcon width={28} height={28} />
      )}

      
    </HeaderContainer>
  );
}
