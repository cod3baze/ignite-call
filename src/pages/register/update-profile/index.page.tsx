import { GetServerSideProps } from "next";
import {
  Heading,
  MultiStep,
  Text,
  Button,
  TextArea,
  Avatar,
} from "@ignite-ui/react";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight } from "phosphor-react";

import { Container, Header } from "../styles";
import { ProfileBox, FormAnnotation } from "./styles";
import { api } from "../../../lib/axios";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";

const updateProfileSchema = z.object({
  image: z.string(),
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();

  async function handleUpdateProfile({ image, bio }: UpdateProfileData) {
    try {
      await api.post("/users", {
        image,
        bio,
      });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message, {
          style: {
            font: "normal 1rem 'Roboto', Segoe-ui, sans-serif",
          },
        });
        return;
      }

      console.error(error);
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá </Heading>
        <Text>Por último uma breve descrição e uma foto de perfil.</Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text>Sobre você</Text>
          <TextArea {...register("bio")} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar <ArrowRight />{" "}
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
