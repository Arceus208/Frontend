import React from "react";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { useShopContext } from "../../context/shopContext";

interface ShoppingCartIconProps {}

export const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({}) => {
  const { totalCartQuantity } = useShopContext();
  const router = useRouter();
  const clickHandle = () => {
    router.push("/checkout");
  };

  return (
    <Box
      position="relative"
      onClick={clickHandle}
      _hover={{ cursor: "pointer" }}
    >
      <Icon as={AiOutlineShoppingCart} boxSize={8}></Icon>

      <Flex
        position="absolute"
        borderRadius="50%"
        bgColor="red"
        w={5}
        h={5}
        top={5}
        left={5}
        justify="center"
        align="center"
        fontSize={12}
      >
        {totalCartQuantity}
      </Flex>
    </Box>
  );
};
