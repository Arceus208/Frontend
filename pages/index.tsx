import type { NextPage } from "next";

import { NavBar } from "../components/navbar/NavBar";
import { Box } from "@chakra-ui/react";

import { Footer } from "../components/ui/Footer";
import { Wrapper } from "../components/ui/Wrapper";
import { CustomSlider } from "../components/ui/home/CustomSlider";
import { SalesProducts } from "../components/ui/home/SalesProducts";
import { NewProducts } from "../components/ui/home/NewProduct";
import { BestSeller } from "../components/ui/home/BestSeller";
import { SpecialProduct1 } from "../components/ui/home/SpecialProduct1";
import { SpecialProduct2 } from "../components/ui/home/SpecialProduct2";

const Home: NextPage = () => {
  return (
    <Box>
      <NavBar></NavBar>
      <CustomSlider></CustomSlider>
      <Wrapper>
        <Box>
          <SalesProducts></SalesProducts>
          <NewProducts></NewProducts>
          <SpecialProduct1
            imgPath="url('/image/blw.jpg')"
            keyWord="structure_deck"
          ></SpecialProduct1>
          <SpecialProduct2
            keyWord="playmat"
            imgPath="url('/image/doll.jpg')"
          ></SpecialProduct2>
          <BestSeller></BestSeller>
        </Box>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Home;
