import React from "react";
import styled from "styled-components/native";

const Card = styled.View`
  width: 376px;
  border-radius: 12px;
  margin: 8px 16px 4px 0;
  overflow: hidden;
  position: relative;
`;

const BannerImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Info = styled.View`
  position: absolute;
  bottom: 0px;
  padding: 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Subtitle = styled.Text`
  font-size: 12px;
  color: gray;
  margin-top: 4px;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const OldPrice = styled.Text`
  text-decoration: line-through;
  color: gray;
  padding: 3px 5px;

  background-color: #222222;
`;

const NewPrice = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  padding: 3px 5px;
  background-color: #222222;
  border-radius: 0 3px 3px 0;
`;

const Discount = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  background-color: #00ff88;
  padding: 3px 5px;
  border-radius: 3px 0 0 3px;
`;

const PlatformIcon = styled.Text`
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: white;
  font-size: 16px;
`;

export default function BannerCard() {
  return (
    <Card>
      <BannerImage source={{ uri: "https://image.api.playstation.com/vulcan/ap/rnd/202203/1520/e6VbPQ56CBzVPgKmWdMMrICz.png" }} />
      <Info>
        <Title>Dead by Daylight</Title>
        <Subtitle>Recommended by your friend, Player</Subtitle>
        <PriceRow>
          <Discount>-70%</Discount>
          <OldPrice>$18</OldPrice>
          <NewPrice>$5</NewPrice>
        </PriceRow>
      </Info>
      <PlatformIcon>🪟</PlatformIcon>
    </Card>
  );
}
