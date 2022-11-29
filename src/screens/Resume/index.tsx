import React, { useState, useEffect, useCallback } from "react";
import { Container, Header, Title, Content, ChartContainer } from "./Styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../Utils/categories";
import { VictoryPie } from "victory-native";
import theme from "../../global/Styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";

export interface TransactionData {
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
  percent: string;
}

export function Resume() {
  const [totalsByCategory, setTotalsByCategory] = useState<CategoryData[]>([]);

  const theme = useTheme();

  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const responseFormated = response ? JSON.parse(response) : [];

    const expensives = responseFormated.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const totalByCategory: CategoryData[] = [];

    const expensivesTotal = expensives
    .reduce((acumulator: number, expensive: TransactionData) => {
      return acumulator + Number(expensive.amount)
    },0)

    console.log(expensives);

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormated = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${(categorySum / expensivesTotal*100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormated,
          color: category.color,
          total: categorySum,
          percent,
        });
      }
    });
    setTotalsByCategory(totalByCategory);
    console.log(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categorias</Title>
      </Header>
      <Content
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight(),
        }} 
      >
        <ChartContainer>
          <VictoryPie
            data={totalsByCategory}
            colorScale={totalsByCategory.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(17),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={60}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {totalsByCategory.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormated}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}