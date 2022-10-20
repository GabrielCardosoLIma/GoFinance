import React from "react";
import { HighlightCard } from "../../components/HighlightCard/index";
import { TransactionsCard } from "../../components/TransactionsCard/index";
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
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from "./Styles";

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de site",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      amount: "R$ 12.000,00",
      date: "13/04/2020",
    },
    {
      title: "Hamburgueria Pizzy",
      category: {
        name: "Alimentação",
        icon: "dollar-sign",
      },
      amount: "- R$ 59,00",
      date: "10/04/2020",
    },
    {
      title: "Aluguel do apartamento",
      category: {
        name: "Casa",
        icon: "dollar-sign",
      },
      amount: "- R$ 1.200,00",
      date: "18/06/2020",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                url: "https://avatars.githubusercontent.com/u/91638316?v=4",
              }}
            />
            <User>
              <UserGreething>Olá,</UserGreething>
              <UserName>Gabriel Cardoso</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
          data={data}
          renderItem={({ item }) => 
          <TransactionsCard data={item} 
         />}
        />
      </Transactions>
    </Container>
  );
}
