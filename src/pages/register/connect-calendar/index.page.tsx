import { useRouter } from "next/router";
import { Heading, MultiStep, Text, Button } from "@ignite-ui/react";
import { ArrowRight, CheckCircle } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem, AuthError } from "./styles";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

  async function handleConnectCalendar() {
    try {
      await signIn("google");
    } catch (error: any) {
      if (error?.message) {
        toast.error(error.message, {
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

          {isSignedIn ? (
            <Button variant="secondary" size="sm" disabled>
              Conectado
              <CheckCircle color="green" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar no Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Proximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
