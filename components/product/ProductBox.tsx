import React from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

import { useRouter } from "next/router";

interface ProductBoxProps {
  imageUrl: string;
  to: string;
  name: string;
}

export const ProductBox: React.FC<ProductBoxProps> = ({
  imageUrl,
  to,
  name,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(to);
  };

  return (
    <Flex
      onClick={handleClick}
      flexDirection="column"
      align="center"
      width={[200, 200, 300, 300]}
      p={4}
      height={[300, 300, 500, 500]}
      mb={10}
      mx={2}
      _hover={{
        transform: "scale(1.05)",
        transition: "0.3s ease-in",
      }}
      borderRadius="10px"
      boxShadow="2xl"
      justifyContent="space-evenly"
    >
      <Text
        fontSize={[20, 20, 30, 30]}
        fontFamily="fantasy"
        letterSpacing={2}
        mt={5}
        textAlign="center"
        color="black"
      >
        {name}
      </Text>

      <Box mt={4}>
        <Image
          src={imageUrl}
          alt="pic"
          h={[150, 150, 300, 300]}
          w={[100, 100, 200, 200]}
          fit="contain"
        ></Image>
      </Box>
    </Flex>
  );
};
