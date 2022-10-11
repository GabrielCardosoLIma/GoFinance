import React from "react";
import {
  Container,
  Header,
  Ttile,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Ttile>Entradas</Ttile>
        <Icon name="arrow-up-circle" />
      </Header>
      <Footer>
        <Amount>R$ 17.400,00</Amount>
        <LastTransaction>Ultima entrada dia 13 de abril</LastTransaction>
      </Footer>
    </Container>
  );
}
