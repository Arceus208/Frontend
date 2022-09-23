import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Product } from "../../components/ui/Product";
import { Box, Flex } from "@chakra-ui/react";
import { NavBar } from "../../components/navbar/NavBar";
import { Wrapper } from "../../components/ui/Wrapper";
import { Filter } from "../../components/filter/Filter";
import { Footer } from "../../components/ui/Footer";

interface CardData {
  id: string;
  name: string;
  price: number;
  image: string;
}

const CategoryPage: React.FC<{}> = ({}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  let search = "";

  if (
    router.query.search &&
    typeof router.query.search === "string" &&
    router.query.search.length !== 0
  ) {
    search = router.query.search;
  }

  let subCategory = "";

  if (
    router.query.subCategory &&
    typeof router.query.subCategory === "string" &&
    router.query.subCategory.length !== 0
  ) {
    subCategory = router.query.subCategory;
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/products?category=card&subCategory=${subCategory}&search=${search}`
      );

      if (response.status === 200) {
        setData(response.data.products);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    getData();
  }, [search, subCategory]);

  return (
    <Box position="relative">
      <NavBar></NavBar>
      <Wrapper>
        <Flex flexDirection={["column", "column", "row", "row"]}>
          <Filter prePath="/products/cards"></Filter>
          <Flex
            flexDirection={["column", "row", "row", "row"]}
            flexWrap="wrap"
            justifyContent="space-around"
            mx={[30, 70, 70, 70]}
            justify="center"
            align="center"
            minH={700}
          >
            {!isLoading &&
              data.length !== 0 &&
              data.map((item: CardData) => (
                <Product
                  key={item.id}
                  id={item.id}
                  imageUrl={item.image}
                  name={item.name}
                  to={"/"}
                  price={item.price}
                ></Product>
              ))}
          </Flex>
        </Flex>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default CategoryPage;
