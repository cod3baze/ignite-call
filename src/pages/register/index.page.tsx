import { Heading, MultiStep, Text, TextInput, Button } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { Container, Form, Header } from "./styles";

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você
          poderá editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form">
        <label>
          <Text>Nome de usuário</Text>
          <TextInput prefix="ignite.com/" />
        </label>

        <label>
          <Text>Nome completo</Text>
          <TextInput placeholder="Seu nome" />
        </label>

        <Button type="submit">
          Proximo passo <ArrowRight />{" "}
        </Button>
      </Form>
    </Container>
  );
}
