import { useRouter } from "next/router";
import { Heading, MultiStep, Text, Button } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem } from "./styles";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  async function handleRegister() {
    try {
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message, {
          style: {
            font: "normal 1rem 'Roboto', Segoe-ui, sans-serif",
          },
        });
      }

      console.error(error);
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => signIn("google")}
          >
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit" disabled>
          Proximo passo <ArrowRight />
        </Button>

        {JSON.stringify(session.data)}
      </ConnectBox>
    </Container>
  );
}
