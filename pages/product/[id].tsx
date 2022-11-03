import React, { useState } from "react";
import { Flex, Image, Box, Text, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NavBar } from "../../components/navbar/NavBar";

import { useShopContext } from "../../context/shopContext";
import { Wrapper } from "../../components/ui/Wrapper";
import { Footer } from "../../components/ui/Footer";
import { axiosPublic } from "../../utils/axiosPublic";
import useSWR, { Fetcher } from "swr";

interface Product {
  id: string;
  mainImg: { path: string };
  images: { path: string; photoId: string }[];
  curPrice: number;
  price: number;
  discount: number;
  description: string;
  name: string;
  quantity: number;
}

const Product: React.FC<{}> = ({}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { addProduct } = useShopContext();
  const fetcher: Fetcher<Product, string> = (url: string) =>
    axiosPublic.get(url).then((res) => res.data.product);

  const { data, error } = useSWR(
    router.query.id ? `/products/product/${router.query.id}` : null,
    fetcher
  );

  const addToCart = () => {
    addProduct(data, quantity);
  };

  const changeQuantity: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setQuantity(parseInt(event.target.value));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        {error && <Box>Some error happend</Box>}
        {!data && !error && <Box>Loading</Box>}
        {data && !error && (
          <Flex
            flexDirection={["column", "column", "row", "row"]}
            justifyContent={[
              "center",
              "center",
              "space-around",
              "space-around",
            ]}
            align={["center", "center", "flex-start"]}
          >
            <Flex flexDirection="column" align="center" p={5}>
              <Image
                mx={5}
                src={data.images[index].path}
                alt="pic"
                w={[100, 200, 200, 200]}
                h={[150, 300, 300, 300]}
                fit="contain"
              ></Image>
              <Flex mt={10}>
                {data.images.map((img, index) => (
                  <Box
                    key={img.photoId}
                    border="1px solid black"
                    p="5px"
                    m="2px"
                    onMouseEnter={() => {
                      setIndex(index);
                    }}
                  >
                    <Image
                      src={img.path}
                      alt="pic"
                      fit="contain"
                      w={50}
                      h={50}
                    ></Image>
                  </Box>
                ))}
              </Flex>
            </Flex>
            <Flex flexDirection={"column"} maxW={[200, 400, 500, 500]} p={5}>
              <Text fontSize={[25, 25, 30, 30]} fontWeight={500}>
                {data.name}
              </Text>
              <Flex align="center">
                {data.discount > 0 && (
                  <Text color="red" fontSize={20} fontWeight={500} m={1}>
                    {data.curPrice}$
                  </Text>
                )}
                <Text
                  color={data.discount > 0 ? "grey" : "black"}
                  fontSize={data.discount > 0 ? 15 : 20}
                  fontWeight={data.discount > 0 ? 200 : 500}
                  textDecoration={data.discount > 0 ? "line-through" : "none"}
                >
                  {data.price}$
                </Text>
              </Flex>
              <Text mb={4} pb={2} borderBottom="1px" borderColor="lightgrey">
                <Text as="span" color="red">
                  Shipping
                </Text>{" "}
                calculated at checkout
              </Text>
              <Text fontWeight="bold">Description:</Text>
              <Text whiteSpace="pre-wrap" mb={10}>
                {data.description}
              </Text>
              <Text mb="5px" fontWeight="bold">
                Quantity
              </Text>
              <Flex mb={8} w={140}>
                <Button onClick={decreaseQuantity}>-</Button>
                <Input
                  textAlign="center"
                  type="number"
                  min={1}
                  onChange={changeQuantity}
                  value={quantity.toString()}
                />
                <Button onClick={increaseQuantity}>+</Button>
              </Flex>

              <Button
                onClick={addToCart}
                variant="outline"
                colorScheme={"red"}
                borderRadius="none"
              >
                Add to cart
              </Button>
            </Flex>
          </Flex>
        )}
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Product;
