import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Wrapper } from "../../components/ui/Wrapper";
import axios from "axios";
import { CustomInput } from "../../components/custom_components/CustomInput";
import { useRouter } from "next/router";

const ResetPassword: React.FC<{}> = ({}) => {
  const router = useRouter();

  const query = router.query.slug;
  const initialValues = { password: "" };
  return (
    <Box>
      <Wrapper>
        <Box>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              if (router.isReady) {
                if (query) {
                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_HOST}/users/reset_password/${query[0]}/${query[1]}`,
                    values,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                    }
                  );

                  console.log(response.data);
                }
              }
            }}
          >
            {(props) => (
              <Form>
                <CustomInput
                  label="Enter your new password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
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

export default ResetPassword;
