import { Button, Flex, Text, Icon, Box } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { SiFacebook, SiTwitter, SiGoogle } from "react-icons/si";
import React from "react";

import { CustomInput } from "../components/custom_components/CustomInput";
import { formSchema } from "../yup_schema/validation";
import axios from "axios";
import { NavBar } from "../components/navbar/NavBar";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = ({}) => {
  const initialValues: FormValues = { name: "", email: "", password: "" };
  return (
    <Box h={"100vh"}>
      <NavBar></NavBar>
      <Flex justifyContent={"center"} h={"100vh"}>
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
            Register
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={async (values) => {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/users/register`,
                values,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
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
    </Box>
  );
};

export default Register;
