import React, { useState } from "react";

import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/ui/Wrapper";
import { Form, Formik, FormikProps } from "formik";
import { CustomInput } from "../components/custom_components/CustomInput";
import { useRouter } from "next/router";
import { editSchema } from "../yup_schema/validation";
import { Footer } from "../components/ui/Footer";
import NextLink from "next/link";
import { useAxiosAuth } from "../utils/axiosAuth";
import { useUser } from "../hooks/useUser";

interface FormValues {
  email: string;
  name: string;
}

const EditProfile: React.FC<{}> = ({}) => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [error, setError] = useState("");

  const { data, loading, loggedIn } = useUser();

  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        {data && !loading && (
          <Box
            w={[200, 400, 600, 600]}
            mx="auto"
            p={10}
            boxShadow="xl"
            mb={500}
          >
            <Formik
              initialValues={{ email: data.user.email, name: data.user.name }}
              validationSchema={editSchema}
              onSubmit={async (values) => {
                try {
                  const response = await axiosAuth.post(
                    `/users/changeProfile`,
                    values
                  );

                  if (response.status === 201) {
                    setError("");
                    router.push("/profile");
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
                      name="email"
                      type="email"
                      label="Email:"
                      placeholder="Type your email"
                    ></CustomInput>

                    <CustomInput
                      name="name"
                      type="text"
                      label="Name:"
                      placeholder="Type your name"
                    ></CustomInput>
                    {error && (
                      <Text color="red" textAlign="center">
                        {error}
                      </Text>
                    )}
                    <Button
                      textColor={"white"}
                      mx="auto"
                      w={[100, 300, 300]}
                      mt={5}
                      colorScheme="red"
                      borderRadius={20}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        )}

        {!loggedIn && !loading && (
          <Flex h="60vh" flexDirection="column" align="center">
            <Text fontWeight={500}>Please log in to edit your profile.</Text>
            <NextLink href={"/login"}>
              <Link>To login page</Link>
            </NextLink>
          </Flex>
        )}
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default EditProfile;
