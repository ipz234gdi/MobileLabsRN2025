import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Header from "../components/Header";

const Main = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 16px;
`;

const Tabs = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.card};
  padding: 4px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ active, theme }) =>
    active ? theme.background : theme.card};
  padding: 10px;
  border-radius: 6px;
  align-items: center;
`;

const TabText = styled.Text`
  color: ${({ active, theme }) => (active ? theme.text : theme.gray)};
  font-weight: bold;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.gray};
  font-size: 13px;
  text-align: center;
  margin-bottom: 6px;
`;

const Code = styled.Text`
  font-size: 38px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  text-align: center;
  letter-spacing: 4px;
`;

const ProgressBarContainer = styled.View`
  height: 6px;
  background-color: #444;
  border-radius: 4px;
  overflow: hidden;
  margin: 12px 50px;
`;

const ProgressBarFill = styled.View`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: #1a8cff;
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
`;

const Tip = styled.Text`
  color: #5fa8ff;
  text-align: center;
  font-size: 13px;
  margin-top: 6px;
`;

const OptionList = styled.View`
  margin-top: 20px;
`;

const OptionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Arrow = styled.Text`
  color: ${({ theme }) => theme.gray};
  font-size: 18px;
`;

const Option = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.card};
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
`;

export default function Safety() {
  const [activeTab, setActiveTab] = useState("Guard");
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p <= 0 ? 100 : p - 5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Main>
      <Header title="Safety" />

      <Tabs>
        <Tab
          active={activeTab === "Guard"}
          onPress={() => setActiveTab("Guard")}
        >
          <TabText active={activeTab === "Guard"}>Guard</TabText>
        </Tab>
        <Tab
          active={activeTab === "Confirmations"}
          onPress={() => setActiveTab("Confirmations")}
        >
          <TabText active={activeTab === "Confirmations"}>
            Confirmations
          </TabText>
        </Tab>
      </Tabs>

      <Label>Logged in as player</Label>
      <Code>N5KCV</Code>

      <ProgressBarContainer>
        <ProgressBarFill progress={progress} />
      </ProgressBarContainer>

      <Description>
        You’ll enter your code each time you enter your password to sign in to
        your Steam account.
      </Description>

      <Tip>
        Tip: If you don’t share your PC, you can select "Remember my password"
        when you sign in to the PC client...
      </Tip>

      <OptionList>
        <Option>
          <OptionRow>
            <OptionText>Remove Authenticator</OptionText>
            <Arrow>›</Arrow>
          </OptionRow>
        </Option>
        <Option>
          <OptionRow>
            <OptionText>My Recovery Code</OptionText>
            <Arrow>›</Arrow>
          </OptionRow>
        </Option>
        <Option>
          <OptionRow>
            <OptionText>Help</OptionText>
            <Arrow>›</Arrow>
          </OptionRow>

        </Option>
      </OptionList>
    </Main>
  );
}
