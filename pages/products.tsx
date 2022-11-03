import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { NavBar } from "../components/navbar/NavBar";
import { Footer } from "../components/ui/Footer";
import { Wrapper } from "../components/ui/Wrapper";
import { ProductBox } from "../components/product/ProductBox";

interface productsProps {}

const Products: React.FC<productsProps> = ({}) => {
  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Flex
          flexDirection={["column", "row", "row", "row"]}
          flexWrap="wrap"
          justifyContent="space-around"
          justify="center"
          align="center"
        >
          <ProductBox
            imageUrl="/image/bls.png"
            to="/searchResult?category=card"
            name="Card"
          ></ProductBox>

          <ProductBox
            imageUrl="/image/p4.png"
            to="/searchResult?category=cards&subCategory=structure_deck"
            name="Structure deck"
          ></ProductBox>

          <ProductBox
            imageUrl="/image/ph.png"
            to="/searchResult?category=cards&subCategory=booster_pack"
            name="Booster pack"
          ></ProductBox>

          <ProductBox
            imageUrl="/image/aetb.png"
            to="/searchResult?category=accessory&subCategory=playmat"
            name="Playmat"
          ></ProductBox>

          <ProductBox
            imageUrl="/image/sp.png"
            to="/searchResult?category=cards&subCategory=special"
            name="Special Edition Box"
          ></ProductBox>

          <ProductBox
            imageUrl="/image/gs.png"
            to="/searchResult?category=accessory&subCategory=sleeves+other"
            name="Sleeves & Other"
          ></ProductBox>
        </Flex>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Products;
