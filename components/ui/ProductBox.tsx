import React from "react";
import { Box, Text, Link, Flex } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface ProductBoxProps {
  imageUrl: string;
  to: string;
  name: string;
  width: number;
  height: number;
}

export const ProductBox: React.FC<ProductBoxProps> = ({
  imageUrl,
  to,
  name,
  width,
  height,
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
      width={[200, 300, 300, 300]}
      height={500}
      mb={10}
      borderRadius={20}
      _hover={{
        transform: "translate(0px,-10px)",
        borderTop: "2px solid lightgrey",
      }}
      boxShadow="2xl"
    >
      <Text fontWeight={400} fontSize={35} letterSpacing={2} mt={5}>
        {name}
      </Text>
      <NextLink href={to}>
        <Link color="red" fontSize={20}>
          View All
        </Link>
      </NextLink>
      <Box mt={4}>
        <Image src={imageUrl} alt="pic" width={width} height={height}></Image>
      </Box>
    </Flex>
  );
};
