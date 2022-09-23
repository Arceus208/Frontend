import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { CustomInput } from "../components/custom_components/CustomInput";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/ui/Wrapper";
import axios from "axios";

interface forgotPasswordProps {}

const forgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const initialValues = { email: "" };
  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Box>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/users/forgot_password`,
                values,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );

              console.log(response.data);
            }}
          >
            {(props) => (
              <Form>
                <CustomInput
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                ></CustomInput>
                <Button type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default forgotPassword;
