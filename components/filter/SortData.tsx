import { Box, Select } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";

interface SortDataProps {}

export const SortData: React.FC<SortDataProps> = ({}) => {
  const { query, isReady } = useRouter();

  const [initialValues, setInitialValues] = useState({
    sort: "",
  });

  useEffect(() => {
    if (isReady) {
      setInitialValues({
        sort: (query.sort as string) || "",
      });
    }
  }, [isReady, query]);

  return (
    <Box mb={5} w={[200, 200]}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          let queryObj = {} as any;

          for (let key in query) {
            if (key === "sort" && values.sort === "") {
              continue;
            }
            queryObj[key] = query[key];
          }

          if (values.sort !== "") {
            queryObj["sort"] = values.sort;
          }

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
        {({ handleChange, values, handleSubmit }) => (
          <Form>
            <Select
              value={values.sort}
              name="sort"
              onChange={(e) => {
                handleChange(e);
                handleSubmit();
              }}
            >
              <option value="">Best Result</option>
              <option value="priceInc">Price increasing</option>
              <option value="priceDesc">Price decreasing</option>
              <option value="bestSelling">Best selling</option>
              <option value="newProduct">New product</option>
            </Select>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
