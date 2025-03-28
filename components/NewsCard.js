import React from "react";
import styled from "styled-components/native";

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const InRow = styled.View`
  flex-direction: row;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 8px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
`;

const Time = styled.Text`
  color: gray;
  font-size: 12px;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  margin-vertical: 10px;
`;

const Headline = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const Subtext = styled.Text`
  color: gray;
  font-size: 12px;
  margin-top: 4px;
`;

const Footer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const Action = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

const Icon = styled.Text`
  margin-right: 4px;
`;

export default function NewsCard({
  avatar,
  author,
  time,
  image,
  headline,
  subtext,
  likes,
  comments,
}) {
  return (
    <Card>
      <Row>
        <Avatar source={{ uri: avatar }} />
        <InRow>
          <Title>{author}</Title>
          <Time> • {time}</Time>
        </InRow>
      </Row>

      <NewsImage source={{ uri: image }} />
      <Headline>{headline}</Headline>
      <Subtext>{subtext}</Subtext>

      <Footer>
        <Action>
          <Icon>👍</Icon>
          <Headline>{likes}</Headline>
        </Action>
        <Action>
          <Icon>💬</Icon>
          <Headline>{comments}</Headline>
        </Action>
      </Footer>
    </Card>
  );
}
