import { Button, Flex, Text, Icon, Box, Link } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { SiFacebook, SiTwitter, SiGoogle } from "react-icons/si";
import React, { useEffect, useState } from "react";
import router from "next/router";
import NextLink from "next/link";

import { CustomInput } from "../components/custom_components/CustomInput";

import { NavBar } from "../components/navbar/NavBar";
import { useAuthContext } from "../context/authContext";
import { Wrapper } from "../components/ui/Wrapper";
import { Footer } from "../components/ui/Footer";
import { useUser } from "../hooks/useUser";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const { loggedIn } = useUser();

  useEffect(() => {
    if (loggedIn) {
      router.push("/");
    }
  }, [loggedIn]);

  const { setToken } = useAuthContext();

  const [error, setError] = useState<string>("");

  const initialValues: FormValues = { email: "", password: "" };

  return (
    <Box h={"100vh"}>
      <NavBar></NavBar>
      <Wrapper>
        <Flex justify="center" h="100vh">
          <Flex
            w={[300, 400, 500]}
            flexDirection="column"
            align={"center"}
            bgColor={"white"}
            h={600}
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
                  setToken(data.accessToken);
                  setError("");
                  sessionStorage.setItem("isLogin", "true");
                  if (typeof router.query.next === "string") {
                    router.push(router.query.next);
                  } else {
                    router.push("/");
                  }
                } else {
                  setError(data.message);
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
                      <Link color="blue">forgot password ?</Link>
                    </NextLink>
                    {error && (
                      <Flex justify="center">
                        <Text color="red">{error}</Text>
                      </Flex>
                    )}
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
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Login;
