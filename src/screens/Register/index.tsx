import React, { useState } from "react";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./Styles";
import { Input } from "../../components/Form/Input/index";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/TransactionTypeButton/index";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </Fields>
        <TransactionTypes>
          <TransactionTypeButton
            title="Income"
            type="up"
            onPress={() => handleTransactionsTypeSelect("up")}
            isActive={transactionType === 'up'}
          />
          <TransactionTypeButton
            title="Outcome"
            type="down"
            onPress={() => handleTransactionsTypeSelect("down")}
            isActive={transactionType === 'down'}
          />
        </TransactionTypes>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
