import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { CustomInput } from "../custom_components/CustomInput";
import {
  spellCheckBox,
  trapCheckBox,
  monsterCheckBox,
  cardsCheckBox,
  accessoryCheckBox,
} from "../../data/data";
import router, { useRouter } from "next/router";
import { CustomSelect } from "../custom_components/CustomSelect";

export const Filter: React.FC<{}> = ({}) => {
  const { query, isReady } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [initialValues, setInitialValues] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    subCategory: [] as string[],
  });

  useEffect(() => {
    if (isReady) {
      setInitialValues({
        category: (query.category as string) || "",
        minPrice: (query.minPrice as string) || "",
        maxPrice: (query.maxPrice as string) || "",
        subCategory: (query.subCategory as string)?.split(" ") || [],
      });
    }
  }, [isReady, query]);

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="center" my={4}>
        <Button
          mx={4}
          w="9rem"
          display={["block", "block", "none"]}
          colorScheme="teal"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          + Filter
        </Button>
      </Flex>
      <Box
        boxShadow="xl"
        p={7}
        maxW={["100%", "100%", "18rem"]}
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mb={4}
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values: any) => {
            const queryObj = {} as any;
            for (let key in values) {
              if (values[key] !== "") {
                if (key === "subCategory" && values[key].length !== 0) {
                  queryObj[key] = values[key].join(" ");
                } else {
                  queryObj[key] = values[key];
                }
              }
            }

            queryObj.search = query.search;

            router.push(
              {
                pathname: `/searchResult`,
                query: { ...queryObj },
              },
              undefined,
              {
                shallow: true,
              }
            );
          }}
        >
          {(props) => (
            <Form>
              <CustomSelect
                handleChange={props.handleChange}
                setField={props.setFieldValue}
                name="category"
                label="Category"
                placeholder="All"
                value={props.values}
                category={["card", "cards", "accessory"]}
              ></CustomSelect>
              {props.values.category === "card" && (
                <Flex my={5} flexDirection="column" p={3}>
                  <Flex
                    flexDirection="column"
                    py={2}
                    borderBottom="1px solid lightgrey"
                  >
                    {spellCheckBox.map((item) => (
                      <Box key={Math.random()}>
                        <Field
                          type="checkbox"
                          name="subCategory"
                          value={item.value}
                        />
                        <Text display="inline" ml="0.3rem">
                          {item.label}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                  <Flex
                    flexDirection="column"
                    py={2}
                    borderBottom="1px solid lightgrey"
                  >
                    {trapCheckBox.map((item) => (
                      <Box key={Math.random()}>
                        <Field
                          type="checkbox"
                          name="subCategory"
                          value={item.value}
                        />
                        <Text display="inline" ml="0.3rem">
                          {item.label}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                  <Flex
                    flexDirection="column"
                    py={2}
                    borderBottom="1px solid lightgrey"
                  >
                    {monsterCheckBox.map((item) => (
                      <Box key={Math.random()}>
                        <Field
                          type="checkbox"
                          name="subCategory"
                          value={item.value}
                        />
                        <Text display="inline" ml="0.3rem">
                          {item.label}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              )}
              {props.values.category === "cards" && (
                <Flex my={5} flexDirection="column" p={3}>
                  <Flex flexDirection="column">
                    {cardsCheckBox.map((item) => (
                      <Box key={Math.random()}>
                        <Field
                          type="checkbox"
                          name="subCategory"
                          value={item.value}
                        />
                        <Text display="inline" ml="0.3rem">
                          {item.label}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              )}

              {props.values.category === "accessory" && (
                <Flex my={5} flexDirection="column" p={3}>
                  <Flex flexDirection="column">
                    {accessoryCheckBox.map((item) => (
                      <Box key={Math.random()}>
                        <Field
                          type="checkbox"
                          name="subCategory"
                          value={item.value}
                        />
                        <Text display="inline" ml="0.3rem">
                          {item.label}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              )}
              <Text mt={2}>Price:</Text>
              <Flex alignItems="flex-end">
                <CustomInput
                  label=""
                  min="0"
                  name="minPrice"
                  type="number"
                  placeholder="min"
                ></CustomInput>
                <Text p={4}>-</Text>
                <CustomInput
                  label=""
                  min="0"
                  name="maxPrice"
                  type="number"
                  placeholder="max"
                ></CustomInput>
              </Flex>
              <Flex justifyContent="center" mt={3}>
                <Button type="submit" colorScheme="teal" minW={200}>
                  Apply filter
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
