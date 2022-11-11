import React, { useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard/index";
import { TransactionsCard } from "../../components/TransactionsCard/index";
import { TransactionCardProps } from "../../components/TransactionsCard/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  TransactionList,
} from "./Styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  async function loadTransaction() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    const transactionsFormated: DataListProps[] = transactions
    .map
    (( item: DataListProps ) => {
        const amount = Number(item.amount)
        .toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: "2-digit"
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      });
    setData(transactionsFormated);
  }
  // const data: DataListProps[] = [
  //   {
  //     id: "1",
  //     type: 'positive',
  //     title: "Desenvolvimento de site",
  //     category: {
  //       name: "Vendas",
  //       icon: "dollar-sign",
  //     },
  //     amount: "R$ 12.000,00",
  //     date: "13/04/2020",
  //   },
  //   {
  //     id: "2",
  //     type: 'negative',
  //     title: "Hamburgueria Pizzy",
  //     category: {
  //       name: "Alimentação",
  //       icon: "coffee",
  //     },
  //     amount: "R$ 59,00",
  //     date: "10/04/2020",
  //   },
  //   {
  //     id: "3",
  //     type: 'negative',
  //     title: "Aluguel do apartamento",
  //     category: {
  //       name: "Casa",
  //       icon: "home",
  //     },
  //     amount: "R$ 1.200,00",
  //     date: "18/06/2020",
  //   },
  // ];

  useEffect(() => {
    loadTransaction();
  }, []);

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionsCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
