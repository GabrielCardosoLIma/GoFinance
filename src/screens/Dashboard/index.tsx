import React from "react";
import { HighlightCard } from '../../components/HighlightCard/index';
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreething,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards
} from "./Styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
            source={{url: "https://avatars.githubusercontent.com/u/91638316?v=4"}}
            />
            <User>
              <UserGreething>Olá,</UserGreething>
              <UserName>Gabriel Cardoso</UserName>
            </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCards />
      </HighlightCards>
    </Container>
  );
}
