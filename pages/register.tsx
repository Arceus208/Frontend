import { Button, Flex, Text, Icon, Box } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { SiFacebook, SiTwitter, SiGoogle } from "react-icons/si";
import React, { useEffect, useState } from "react";

import { CustomInput } from "../components/custom_components/CustomInput";
import { formSchema } from "../yup_schema/validation";

import { NavBar } from "../components/navbar/NavBar";
import router from "next/router";
import { Wrapper } from "../components/ui/Wrapper";

import { axiosPublic } from "../utils/axiosPublic";
import { useUser } from "../hooks/useUser";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = ({}) => {
  const initialValues: FormValues = { name: "", email: "", password: "" };

  const [error, setError] = useState<string>("");
  const { loggedIn } = useUser();

  useEffect(() => {
    if (loggedIn) {
      router.push("/");
    }
  }, [loggedIn]);

  return (
    <Box h={"100vh"}>
      <NavBar></NavBar>
      <Wrapper>
        <Flex justifyContent={"center"} h={"100vh"}>
          <Flex
            w={[300, 400, 500]}
            flexDirection="column"
            h={700}
            borderRadius={10}
            boxShadow="2xl"
            align="center"
            mt={20}
            px={20}
          >
            <Text fontSize={30} fontWeight={700} my={35}>
              Register
            </Text>
            <Formik
              initialValues={initialValues}
              validationSchema={formSchema}
              onSubmit={async (values) => {
                try {
                  const response = await axiosPublic.post(
                    `/users/register`,
                    values
                  );

                  if (response.status === 201) {
                    setError("");
                    router.push("/login");
                  } else {
                  }
                } catch (err: any) {
                  setError(err.response.data.message);
                }
              }}
            >
              {(props: FormikProps<FormValues>) => (
                <Form>
                  <Flex flexDirection="column">
                    <CustomInput
                      name="name"
                      type="text"
                      label="Name:"
                      placeholder="Type your name"
                    ></CustomInput>
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

                    {error && <Text color="red">{error}</Text>}
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
    </Box>
  );
};

export default Register;
