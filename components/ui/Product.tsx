import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ProductProps {
  imageUrl: string;
  name: string;
  price: number;
  id: string;
  to: string;
}

export const Product: React.FC<ProductProps> = ({
  imageUrl,
  name,
  price,
  id,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <Flex
      onClick={handleClick}
      flexDirection="column"
      align="center"
      width={[200, 300, 300, 300]}
      height={400}
      mb={10}
      borderRadius={20}
      _hover={{
        transform: "translate(0px,-10px)",
        borderTop: "2px solid lightgrey",
      }}
      boxShadow="2xl"
    >
      <Box mt={4}>
        <Image src={imageUrl} alt="pic" h={300} w={200}></Image>
      </Box>
      <Text>{name}</Text>
      <Text>{price} $</Text>
    </Flex>
  );
};
