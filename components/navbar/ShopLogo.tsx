import { Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface ShopLogoProps {}

export const ShopLogo: React.FC<ShopLogoProps> = ({}) => {
  return (
    <Text fontWeight="bold" _hover={{ cursor: "pointer" }}>
      <NextLink href="/">My Shop</NextLink>
    </Text>
  );
};
