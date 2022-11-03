import React from "react";

import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/ui/Wrapper";
import { Form, Formik, FormikProps } from "formik";
import { CustomInput } from "../components/custom_components/CustomInput";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Footer } from "../components/ui/Footer";

import { useAxiosAuth } from "../utils/axiosAuth";

import { useUser } from "../hooks/useUser";

interface FormValues {
  country: string;
  city: string;
  postnumber: string;
  street: string;
}

const ChangePassword: React.FC<{}> = ({}) => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

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
              initialValues={
                data.user.address
                  ? {
                      city: data.user.address.city,
                      country: data.user.address.country,
                      postnumber: data.user.address.postnumber,
                      street: data.user.address.street,
                    }
                  : { city: "", country: "", postnumber: "", street: "" }
              }
              onSubmit={async (values) => {
                try {
                  const response = await axiosAuth.post(
                    `/users/changeAddress`,
                    values
                  );

                  if (response.status === 201) {
                    router.push("/profile");
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {(props: FormikProps<FormValues>) => (
                <Form>
                  <Flex flexDirection="column">
                    <CustomInput
                      name="street"
                      type="text"
                      label="Street"
                      placeholder="Type your street"
                    ></CustomInput>

                    <CustomInput
                      name="postnumber"
                      type="text"
                      label="Post number:"
                      placeholder="00000"
                    ></CustomInput>

                    <CustomInput
                      name="city"
                      type="text"
                      label="City"
                      placeholder="Type your city"
                    ></CustomInput>

                    <CustomInput
                      name="country"
                      type="text"
                      label="Country"
                      placeholder="Type your country"
                    ></CustomInput>

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

export default ChangePassword;
