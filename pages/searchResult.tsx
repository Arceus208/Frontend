import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import React from "react";
import { Filter } from "../components/filter/Filter";
import { NavBar } from "../components/navbar/NavBar";
import { Product } from "../components/product/Product";
import { Wrapper } from "../components/ui/Wrapper";
import { axiosPublic } from "../utils/axiosPublic";
import useSWRInfinite from "swr/infinite";
import { SortData } from "../components/filter/SortData";

interface Product {
  id: string;
  discount: number;
  mainImg: { path: string };
  curPrice: number;
  price: number;
  name: string;
}

const SearchResult: React.FC<{}> = ({}) => {
  const { query, isReady } = useRouter();
  const fetcher = (url: string) =>
    axiosPublic.get(url).then((res) => res.data.products);

  const getKey = (pageIndex: any, previousPageData: any) => {
    let path = "products/search?";

    for (let key in router.query) {
      path = path + `${key}=${query[key]}&`;
    }

    if (previousPageData && !previousPageData.length) return null;
    return `${path}page=${pageIndex}`;
  };

  const { data, error, size, setSize } = useSWRInfinite<any, any, any>(
    isReady ? getKey : null,
    fetcher
  );

  return (
    <Box>
      <NavBar></NavBar>

      <Wrapper>
        <Flex
          flexDirection={["column", "column", "row"]}
          justifyContent="space-around"
          alignItems={["center", "center", "flex-start"]}
        >
          <Filter></Filter>
          {data && (
            <Box>
              <Flex justifyContent="center">
                <Flex flexDirection="column" align={["center", "flex-end"]}>
                  <SortData></SortData>
                  <Grid
                    templateColumns={[
                      "repeat(1, 1fr)",
                      "repeat(2, 1fr)",
                      "repeat(2, 1fr)",
                      "repeat(3, 1fr)",
                    ]}
                  >
                    {data.map((products, index) => {
                      return products.map((product: Product) => (
                        <Product key={product.id} product={product}></Product>
                      ));
                    })}
                  </Grid>
                </Flex>
              </Flex>
              <Flex justifyContent="center" my={2}>
                <Button onClick={() => setSize(size + 1)} colorScheme="teal">
                  Load more
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>
      </Wrapper>
    </Box>
  );
};

export default SearchResult;
