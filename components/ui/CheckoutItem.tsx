import React, { useState } from "react";
import { Box, Flex, Image, Text, Icon, Button, Input } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { useShopContext } from "../../context/shopContext";

interface CheckoutItemProps {
  name: string;
  id: string;
  image: string;
  quantity: number;
  price: number;
}

export const CheckoutItem: React.FC<CheckoutItemProps> = ({
  name,
  id,
  price,
  quantity,
  image,
}) => {
  const { removeItem, increaseItemQuantity, decreaseItemQuantity } =
    useShopContext();

  const increaseQuantity = () => {
    increaseItemQuantity(id);
  };

  const decreaseQuantity = () => {
    decreaseItemQuantity(id);
  };

  return (
    <Box boxShadow="base" p={5} mb={10}>
      <Flex
        flexDirection={["column", "column", "row", "row"]}
        justifyContent="space-between"
      >
        <Flex
          align="center"
          justify="center"
          flexDirection={["column", "column", "row", "row"]}
        >
          <Image src={image} alt="Pic" w={100} h={150}></Image>
          <Flex ml={[0, 0, 10, 10]} my={3} flexDirection="column">
            <Text fontSize={20} fontWeight={500}>
              {name}
            </Text>
            <Text fontSize={12}>Price per unit: {price}$</Text>
            <Text
              color="red"
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={removeItem.bind(null, id)}
            >
              Remove
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" flexDirection={["column", "column", "row", "row"]}>
          <Flex my={3}>
            <Flex align="center">
              <Flex>
                <Button onClick={decreaseQuantity}>-</Button>
                <Flex align={"center"} mx={4}>
                  <Text>{quantity}</Text>
                </Flex>

                <Button onClick={increaseQuantity}>+</Button>
              </Flex>
            </Flex>
          </Flex>
          <Text ml={[0, 0, 20, 20]} fontWeight={500}>
            {price * quantity}$
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
