import { Button, Flex, Text, Icon, Box, Link } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { SiFacebook, SiTwitter, SiGoogle } from "react-icons/si";
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { io } from "socket.io-client";

import { CustomInput } from "../components/custom_components/CustomInput";

import { NavBar } from "../components/navbar/NavBar";
import { useAuthContext } from "../context/authContext";

/* const socket = io(`${process.env.NEXT_PUBLIC_HOST}`); */

interface LoginProps {
  data: any;
}

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const { setTokenValue } = useAuthContext();
  const { isLogin } = useAuthContext();
  const router = useRouter();

  const initialValues: FormValues = { email: "", password: "" };
  return (
    <Box h={"100vh"}>
      <NavBar></NavBar>
      {isLogin ? (
        <Box>You are already login</Box>
      ) : (
        <Flex justify="center">
          <Flex
            w={[300, 400, 500]}
            flexDirection="column"
            align={"center"}
            bgColor={"white"}
            h={700}
            borderRadius={10}
            boxShadow="2xl"
            mt={20}
          >
            <Text fontSize={30} fontWeight={700} my={35}>
              Login
            </Text>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_HOST}/users/login`,
                  {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify(values),
                  }
                );

                const data = await response.json();

                if (response.status === 201) {
                  setTokenValue(data.accessToken);
                  router.push("/");
                  /* socket.emit("login", { role: "customer", userId: data.user }); */
                } else {
                  console.log(data.message);
                }
              }}
            >
              {(props: FormikProps<FormValues>) => (
                <Form>
                  <Flex flexDirection="column">
                    <CustomInput
                      name="email"
                      type="email"
                      label="Email:"
                      placeholder="Type your email"
                    ></CustomInput>
                    <CustomInput
                      name="password"
                      type="password"
                      label="Password:"
                      placeholder="Type your password"
                    ></CustomInput>
                    <NextLink href={"/forgotPassword"}>
                      <Link color={"red"}>forgot password ?</Link>
                    </NextLink>

                    <Button
                      textColor={"white"}
                      w={[100, 300, 300]}
                      mt={5}
                      colorScheme="red"
                      borderRadius={20}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Text mt={10} mb={15} textAlign={"center"}>
                      Or sign up using
                    </Text>
                    <Flex justify={"center"}>
                      <Icon
                        as={SiFacebook}
                        color={"blue"}
                        w={10}
                        h={10}
                        mr={3}
                      ></Icon>
                      <Icon as={SiTwitter} w={10} h={10} mr={3}></Icon>
                      <Icon as={SiGoogle} color="red" w={10} h={10}></Icon>
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

/* export async function getServerSideProps({ req, res }: any) {
  const data = getCookie("cookieToken");

  return { props: { data } };
} */

export default Login;
