import { Text, View } from "react-native";
import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./Styles";
import { categories } from "../../Utils/categories";

export interface TransactionCardProps{
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface Category{
  name: string;
  icon: string;
}

interface Props {
  data: TransactionCardProps
}

export function TransactionsCard({ data }: Props) {

  const category = categories.filter(
    item => item.key === data.category
  )[0];

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon}></Icon>
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
