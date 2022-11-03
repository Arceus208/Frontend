import { Box, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { CustomInput } from "../components/custom_components/CustomInput";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/ui/Wrapper";

import { axiosPublic } from "../utils/axiosPublic";

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const initialValues = { email: "" };
  const [message, setMessage] = useState<string>("");
  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Box>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const response = await axiosPublic.post(
                `/users/forgot_password`,
                values
              );

              if (response.status === 201) {
                setMessage(response.data.message);
              }
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
                {message && <Text>{message}</Text>}
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default ForgotPassword;
