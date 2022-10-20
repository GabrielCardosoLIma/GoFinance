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

export interface TransactionCardProps{
  title: String;
  amount: String;
  category: Category;
  date: String;
}

export interface Category{
  name: String;
  icon: String;
}

interface Props {
  data: TransactionCardProps
}

export function TransactionsCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount>{data.amount}</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign"></Icon>
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
