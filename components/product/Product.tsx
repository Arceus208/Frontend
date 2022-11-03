import React from "react";
import { Box, Flex, Text, Image, Button, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useShopContext } from "../../context/shopContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface ProductProps {
  product: {
    id: string;
    discount: number;
    mainImg: { path: string };
    curPrice: number;
    price: number;
    name: string;
  };
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter();
  const { addProduct } = useShopContext();
  const addToCart = (event: any) => {
    event.stopPropagation();
    addProduct(product, 1);
  };

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Flex
      onClick={handleClick}
      flexDirection="column"
      w={[200, 200, 250, 250]}
      minH={[300, 300, 350, 350]}
      mb={10}
      mx={2}
      _hover={{
        transform: "translate(0px,-10px)",
        transition: "0.3s ease-in",
      }}
      boxShadow="2xl"
      px={7}
      py={5}
      justifyContent="space-between"
    >
      <Box>
        <Box mt={6} position="relative">
          {product.discount > 0 && (
            <Box
              position="absolute"
              color="white"
              bgColor="teal"
              fontWeight="bold"
              right="-2rem"
              top={0}
              py={1}
              px={4}
            >
              Sale
            </Box>
          )}
          <Flex justify="center" m={2}>
            <Image
              src={product.mainImg.path}
              alt="pic"
              h={[100, 150, 200, 200]}
              w={[100, 150, 200, 200]}
              fit="contain"
            ></Image>
          </Flex>
        </Box>

        <Flex>
          <Flex align="center">
            {product.discount > 0 && (
              <Text color="red" fontSize={20} fontWeight={500} m={1}>
                {product.curPrice}&euro;
              </Text>
            )}
            <Text
              color={product.discount > 0 ? "grey" : "black"}
              fontSize={product.discount > 0 ? 15 : 20}
              fontWeight={product.discount > 0 ? 200 : 500}
              textDecoration={product.discount > 0 ? "line-through" : "none"}
            >
              {product.price}&euro;
            </Text>
          </Flex>
        </Flex>
        <Text my={1}>{product.name}</Text>
      </Box>
      <Button colorScheme="teal" onClick={addToCart} fontWeight="bold" p={2}>
        <Icon as={AiOutlineShoppingCart} mr={2}></Icon>Add to cart
      </Button>
    </Flex>
  );
};
