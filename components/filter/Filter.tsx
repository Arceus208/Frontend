import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { CustomInput } from "../custom_components/CustomInput";
import { spellCheckBox, trapCheckBox, monsterCheckBox } from "../../data/data";
import { useRouter } from "next/router";

interface FilterValues {
  search: string;
  category: string;
  subCategory: [];
}

interface FilterProps {
  prePath: string;
}

export const Filter: React.FC<FilterProps> = ({ prePath }) => {
  const initialValues: FilterValues = {
    search: "",
    category: "",
    subCategory: [],
  };

  const router = useRouter();
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          let path = "";

          if (values.search.trim().length !== 0) {
            path = path + `search=${values.search}&`;
          }

          if (values.subCategory.length !== 0) {
            path = path + `subCategory=${values.subCategory.join("+")}`;
          }

          router.push(`${prePath}?${path}`);
        }}
      >
        {(props) => (
          <Form>
            <CustomInput
              label="Search"
              name="search"
              placeholder="Search card name.."
              type="text"
            ></CustomInput>
            <Flex direction={"column"} justifyContent="space-around" mt={5}>
              <Flex direction={"column"} mb={[7]}>
                {spellCheckBox.map((item) => (
                  <Box key={Math.random()}>
                    <Field
                      type="checkbox"
                      name="subCategory"
                      value={item.value}
                    />
                    {item.label}
                  </Box>
                ))}
              </Flex>
              <Flex direction={"column"} mb={[7]}>
                {trapCheckBox.map((item) => (
                  <Box key={Math.random()}>
                    <Field
                      type="checkbox"
                      name="subCategory"
                      value={item.value}
                    />
                    {item.label}
                  </Box>
                ))}
              </Flex>
              <Flex direction={"column"}>
                {monsterCheckBox.map((item) => (
                  <Box key={Math.random()}>
                    <Field
                      type="checkbox"
                      name="subCategory"
                      value={item.value}
                    />
                    {item.label}
                  </Box>
                ))}
              </Flex>
              <Button mt={5} type="submit" colorScheme="red">
                Search
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
