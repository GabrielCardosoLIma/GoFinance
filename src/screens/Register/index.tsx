import React from "react";
import { Container, Header, Title, Form } from "./Styles";
import { Input } from "../../components/Form/Input/index";
import { Button } from "../../components/Form/Button";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input placeholder="Nome" />
        <Input placeholder="Preço" />
        <Button title="Enviar"/>
      </Form>
    </Container>
  );
}
