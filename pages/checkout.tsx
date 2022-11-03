import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useShopContext } from "../context/shopContext";
import { CheckoutItem } from "../components/product/CheckoutItem";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/ui/Wrapper";
import { Footer } from "../components/ui/Footer";
import { useRouter } from "next/router";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = ({}) => {
  const { totalPrice, cartItems } = useShopContext();
  const router = useRouter();

  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Flex flexDirection={"column"}>
          <Text fontSize={30} fontWeight={500} mb={5}>
            Shopping cart
          </Text>
          <Flex flexDirection={"column"}>
            {cartItems?.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              ></CheckoutItem>
            ))}
          </Flex>

          <Flex flexDirection={"column"} mx={[10, 30, 30, 60]}>
            <Text fontSize={20} borderBottom={"1px"} pb={3}>
              Summary
            </Text>
            <Flex justifyContent="space-between" mt={3} fontWeight={500}>
              Amount <Text as="span">{totalPrice}&euro;</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              pb={3}
              borderBottom="1px"
              fontWeight={500}
            >
              Shipping cost <Text as="span">0&euro;</Text>
            </Flex>
            <Flex justifyContent="space-between" fontWeight={500}>
              Total <Text as="span">{totalPrice}&euro;</Text>
            </Flex>
            <Button
              mt={4}
              colorScheme="red"
              onClick={() => {
                router.push("/order");
              }}
            >
              Check out
            </Button>
          </Flex>
        </Flex>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Checkout;
