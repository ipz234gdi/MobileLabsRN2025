import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.card};
  padding: 10px;
  margin: 6px 12px 6px 0px;
  border-radius: 10px;
`;

const GameImage = styled.Image`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

const Info = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: bold;
`;

const Platforms = styled.Text`
  color: gray;
  font-size: 12px;
  margin-top: 2px;
`;

const PriceColumn = styled.View`
  align-items: flex-end;
`;

const OldPrice = styled.Text`
  font-size: 12px;
  color: gray;
  text-decoration: line-through;
`;

const NewPrice = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Discount = styled.Text`
  background-color: #00c853;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
`;

export default function GameCard({ title, image, oldPrice, newPrice, discount, platforms }) {
  return (
    <Card>
      <GameImage source={{ uri: image }} />
      <Info>
        <Title>{title}</Title>
        <Platforms>{platforms}</Platforms>
      </Info>
      <PriceColumn>
        {oldPrice && <OldPrice>{oldPrice}</OldPrice>}
        <NewPrice>{newPrice}</NewPrice>
        {discount && <Discount>{discount}</Discount>}
      </PriceColumn>
    </Card>
  );
}
