import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Wrapper } from "../../components/ui/Wrapper";

import { CustomInput } from "../../components/custom_components/CustomInput";
import { useRouter } from "next/router";
import { axiosPublic } from "../../utils/axiosPublic";
import { passwordSchema } from "../../yup_schema/validation";

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
            validationSchema={passwordSchema}
            onSubmit={async (values) => {
              if (router.isReady) {
                if (query) {
                  await axiosPublic.post(
                    `/users/reset_password/${query[0]}/${query[1]}`,
                    values
                  );
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
