import { useRouter } from "next/router";
import { Button, TextInput, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormAnnotation } from "./styles";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário deve ter mais de 3 letras." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode ter apenas letras e hífen.",
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  async function handlePreRegister({ username }: ClaimUsernameFormData) {
    if (username) return await router.push(`/register?username=${username}`);

    await router.push("/register");
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu_usuário"
        {...register("username")}
      />
      <Button size="sm" type="submit" disabled={isSubmitting}>
        Reservar
        <ArrowRight />
      </Button>

      <FormAnnotation>
        <Text size="xs">
          {errors.username
            ? errors.username?.message
            : "Digite o nome do usuário"}
        </Text>
      </FormAnnotation>
    </Form>
  );
}
