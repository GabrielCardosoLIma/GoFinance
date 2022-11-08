import React, { useState } from "react";
import { Modal, Alert } from "react-native";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .transform((_value, originalValue) => Number(originalValue.replace(/,/,'.')))
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [CategoryModalOpen, setCategoryModalOpen] = useState(false);

  const [Category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
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

  function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo de transação!");
    if (Category.key === "category")
      return Alert.alert("Selecione a categoria!");
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: Category.key,
    };
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
            control={control}
            name="name"
            placeholder="Nome"
            autoCapitalize="words"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm
            control={control}
            name="amount"
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />
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
