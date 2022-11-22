import React, { useState, useEffect } from "react";
import { Container, Header, Title } from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../Utils/categories";

export interface TransactionCard {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface CategoryData {
  key: string;
  name: string;
  totalFormated: string;
  color: string;
  total: number;
}

export function Resume() {

  const [totalsByCategory, setTotalsByCategory] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const responseFormated = response ? JSON.parse(response) : [];

    const expensives = responseFormated.filter(
      (expensive: TransactionCard) => expensive.type === "negative"
    );

    const totalByCategory: CategoryData[] = [];
    
    console.log(expensives);

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCard) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      })

      if(categorySum > 0){
        const totalFormated = categorySum 
        .toLocaleString( 'pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormated,
          color: category.color,
          total: categorySum
        })
      }
    });
    setTotalsByCategory(totalByCategory);
    console.log(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categorias</Title>
      </Header>
      <HistoryCard title="Compras" amount="R$ 150,00" color="blue" />
    </Container>
  );
}
