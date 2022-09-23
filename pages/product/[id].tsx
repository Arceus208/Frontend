import React, { useEffect, useState } from "react";
import { Flex, Image, Box, Text, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NavBar } from "../../components/navbar/NavBar";
import axios from "axios";
import { useShopContext } from "../../context/shopContext";
import { Wrapper } from "../../components/ui/Wrapper";
import { Footer } from "../../components/ui/Footer";

interface Product {
  id: string;
  image: string;
  price: number;
  description: string;
  name: string;
  quantity: number;
}

const Product: React.FC<{}> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const { addProduct } = useShopContext();

  const addToCart = () => {
    addProduct(product, quantity);
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

  let productId = router.query.id;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (router.isReady) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/products/product/${productId}`
        );

        if (response.status === 201) {
          setProduct(response.data.product);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    };

    getData();
  }, [productId, router.isReady]);
  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        {isLoading && <Box>Loading</Box>}
        {!isLoading && product && (
          <Flex
            h={700}
            flexDirection={["column", "column", "row", "row"]}
            justifyContent={[
              "center",
              "center",
              "space-around",
              "space-around",
            ]}
            align={["center", "center", "flex-start"]}
          >
            <Image src={product.image} alt="pic" w={200} h={300}></Image>
            <Flex flexDirection={"column"} maxW={[200, 400, 500, 500]}>
              <Text fontSize={30} fontWeight={100}>
                {product.name}
              </Text>
              <Text my={3} color="grey">
                {product.price}$
              </Text>
              <Text mb={4} pb={2} borderBottom="1px" borderColor="lightgrey">
                <Text as="span" color="red">
                  Shipping
                </Text>{" "}
                calculated at checkout
              </Text>
              <Text>Description:</Text>
              <Text mb={10}>{product.description}</Text>
              <Text mb="5px">Quantity</Text>
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
        {!isLoading && !product && <Box>Page not found</Box>}
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Product;
