import React from "react";
import styled from "styled-components/native";

const Main = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 32px 16px;
  align-items: center;
`;

const AvatarWrapper = styled.View`
  position: relative;
  margin-bottom: 12px;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const OnlineDot = styled.View`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #00d156;
  border: 3px solid ${({ theme }) => theme.background};
`;

const Name = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const Group = styled.Text`
  color: gray;
  font-size: 14px;
  margin-bottom: 32px;
`;

const Option = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.card};
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 12px;
`;

const OptionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OptionText = styled.Text`
  color: white;
  font-size: 15px;
`;

const Arrow = styled.Text`
  color: gray;
  font-size: 18px;
`;

export default function Profile() {
  return (
    <Main>
      <AvatarWrapper>
        <Avatar source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjRmMTzC9sPBw-LShqk-lmz56yizMjK-2zQ&s" }} />
        <OnlineDot />
      </AvatarWrapper>
      <Name>Firstname Lastname</Name>
      <Group>Group</Group>

      <Option>
        <OptionRow>
          <OptionText>Change Theme</OptionText>
          <Arrow>›</Arrow>
        </OptionRow>
      </Option>

      <Option>
        <OptionRow>
          <OptionText>Logout</OptionText>
          <Arrow>›</Arrow>
        </OptionRow>
      </Option>
    </Main>
  );
}
