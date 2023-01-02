import { useEffect } from "react";
import { useRouter } from "next/router";
import { Heading, MultiStep, Text, TextInput, Button } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Container, Form, Header, FormError } from "./styles";
import { api } from "../../lib/axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário deve ter mais de 3 letras." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode ter apenas letras e hífen.",
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(5, { message: "O Nome deve ter mais de 5 letras." }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query?.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister({ name, username }: RegisterFormData) {
    try {
      await api.post("/users", {
        name,
        username,
      });
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
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você
          poderá editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text>Nome de usuário</Text>
          <TextInput prefix="ignite.com/" {...register("username")} />

          {errors.username && (
            <FormError size="xs">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text>Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register("name")} />

          {errors.name && (
            <FormError size="xs">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Proximo passo <ArrowRight />{" "}
        </Button>
      </Form>
    </Container>
  );
}
