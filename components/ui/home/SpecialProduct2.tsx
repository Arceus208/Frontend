import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import useSWR, { Fetcher } from "swr";
import { axiosPublic } from "../../../utils/axiosPublic";
import { Product } from "../../product/Product";
import NextLink from "next/link";

interface SpecialProductProps {
  keyWord: string;
  imgPath: string;
}

interface Product {
  id: string;
  discount: number;
  mainImg: { path: string };
  curPrice: number;
  price: number;
  name: string;
}

export const SpecialProduct2: React.FC<SpecialProductProps> = ({
  keyWord,
  imgPath,
}) => {
  const fetcher: Fetcher<Product[], string> = (url: string) =>
    axiosPublic.get(url).then((res) => res.data.products);

  const { data, error } = useSWR(
    `products/search?subCategory=${keyWord}&limit=6`,
    fetcher
  );

  return (
    <Flex
      flexDirection={["column", "column", "row-reverse", "row-reverse"]}
      my={20}
    >
      <Flex
        flexDirection="column"
        p={5}
        my={5}
        bgImage={imgPath}
        bgRepeat="no-repeat"
        bgSize="cover"
        align="center"
      >
        <Text
          mt={[0, 5, 20, 20]}
          fontSize={[30, 40, 50, 50]}
          fontWeight={1000}
          color="white"
          textShadow="5px 5px grey"
          textAlign="center"
        >
          High quality playmat
        </Text>
        <Text
          mt={4}
          fontSize={25}
          color="white"
          fontStyle="italic"
          textShadow="2px 2px grey"
        ></Text>
        <Button
          color="white"
          colorScheme="purple"
          borderRadius="20px"
          px="4rem"
          mt={10}
        >
          <NextLink href="/searchResult?category=accessory&subCategory=playmat">
            <Text fontWeight="bold">Explore</Text>
          </NextLink>
        </Button>
      </Flex>
      {error && <Box>Some error occured</Box>}
      {data && (
        <Flex justifyContent="center">
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
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
