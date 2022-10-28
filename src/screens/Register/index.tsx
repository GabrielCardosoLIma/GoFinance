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
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelect";
import { TransactionTypeButton } from "../../components/TransactionTypeButton/index";
import { CategorySelect } from "../CategorySelect";
import { Input } from "../../components/Form/Input/index";
import { InputForm } from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [CategoryModalOpen, setCategoryModalOpen] = useState(false);

  const [Category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });

  const {
    control,
    handleSubmit,
  } = useForm();

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleRegister(form: FormData){
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: Category.key
    }
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm control={control} name="name" placeholder="Nome" />
          <InputForm control={control} name="amount" placeholder="Preço" />
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
            title={Category.name}
          />
        </Fields>
        <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
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
