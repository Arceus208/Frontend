import { Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import useSWR, { Fetcher } from "swr";
import { axiosPublic } from "../../../utils/axiosPublic";
import { Product } from "../../product/Product";

interface Product {
  id: string;
  discount: number;
  mainImg: { path: string };
  curPrice: number;
  price: number;
  name: string;
}

export const BestSeller: React.FC<{}> = ({}) => {
  const fetcher: Fetcher<Product[], string> = (url: string) =>
    axiosPublic.get(url).then((res) => res.data.products);

  const { data, error } = useSWR(
    `/products/search?sort=bestSelling&limit=8`,
    fetcher
  );

  return (
    <Flex flexDirection="column">
      <Box fontWeight="bold" fontSize={[25, 40]} my={[5, 10]}>
        Best
        <Box display="inline" color="red">
          {" "}
          selling
        </Box>
      </Box>
      {error && <Box>Some error occured</Box>}
      {data && (
        <Flex justifyContent="center">
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
          >
            {data.map((product: Product) => (
              <Product key={product.id} product={product}></Product>
            ))}
          </Grid>
        </Flex>
      )}
    </Flex>
  );
};
