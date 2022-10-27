import React, { useState } from "react";
import { Modal } from "react-native";
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
import { CategorySelectButton } from "../../components/Form/CategorySelect";
import { TransactionTypeButton } from "../../components/TransactionTypeButton/index";
import { CategorySelect } from "../CategorySelect";

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [CategoryModalOpen, setCategoryModalOpen] = useState(false);

  const [Category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type);
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
          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => handleTransactionsTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionsTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionTypes>
          <CategorySelectButton
            onPress={handleOpenSelectCategoryModal}
            title="Categoria"
          />
        </Fields>
        <Button title="Enviar" />
      </Form>
      <Modal visible={CategoryModalOpen}>
        <CategorySelect
          category={Category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
