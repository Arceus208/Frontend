import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { NavBar } from "../components/navbar/NavBar";
import { Footer } from "../components/ui/Footer";
import { Wrapper } from "../components/ui/Wrapper";
import { ProductBox } from "../components/ui/ProductBox";

interface productsProps {}

const Products: React.FC<productsProps> = ({}) => {
  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Flex
          h="700"
          flexDirection={["column", "row", "row", "row"]}
          flexWrap="wrap"
          justifyContent="space-around"
          justify="center"
          align="center"
        >
          <ProductBox
            imageUrl="/image/bls.png"
            to="/products/cards"
            name="Cards"
            width={200}
            height={300}
          ></ProductBox>

          <ProductBox
            imageUrl="/image/p4.png"
            to="/"
            name="Box"
            width={300}
            height={300}
          ></ProductBox>

          <ProductBox
            imageUrl="/image/p5.jpg"
            to="/"
            name="Accessories"
            width={170}
            height={270}
          ></ProductBox>
        </Flex>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Products;
