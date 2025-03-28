import React from "react";
import styled from "styled-components/native";

const ChatItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.gray};
`;

const Avatar = styled.View`
  width: 46px;
  height: 46px;
  border-radius: 23px;
  background-color: ${({ bg }) => bg || "#999"};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  overflow: hidden;
`;

const AvatarText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 22px;
`;

const ChatContent = styled.View`
  flex: 1;
`;

const ChatTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 16px;
`;

const Date = styled.Text`
  color: ${({ theme }) => theme.gray};
  font-size: 12px;
`;

const Message = styled.Text`
  color: ${({ theme }) => theme.gray};
  font-size: 13px;
  margin-top: 2px;
`;

export default function ChatItem({ name, message, date, initials }) {
  return (
    <ChatItemWrapper>
      <Avatar>
        <AvatarText>{initials}</AvatarText>
      </Avatar>
      <ChatContent>
        <ChatTop>
          <Name>{name}</Name>
          <Date>{date}</Date>
        </ChatTop>
        <Message>{message}</Message>
      </ChatContent>
    </ChatItemWrapper>
  );
}
