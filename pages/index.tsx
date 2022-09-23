import type { NextPage } from "next";

import { NavBar } from "../components/navbar/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import { Advertise } from "../components/ui/Advertise";
import { ProductBox } from "../components/ui/ProductBox";
import { Footer } from "../components/ui/Footer";
import { Wrapper } from "../components/ui/Wrapper";

const Home: NextPage = () => {
  return (
    <Box>
      <NavBar></NavBar>
      <Advertise></Advertise>
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

export default Home;
