import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/navbar/NavBar";
import { Footer } from "../components/ui/Footer";
import { Wrapper } from "../components/ui/Wrapper";
import { useRouter } from "next/router";

interface successProps {}

const Success: React.FC<successProps> = ({}) => {
  const router = useRouter();
  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Flex flexDirection={"column"} align="center" h="50vh">
          <Text my={4}>
            Your order have been complete. Please check your email for billing
          </Text>
          <Button
            onClick={() => {
              router.push("/");
            }}
            colorScheme="red"
          >
            Return to shop
          </Button>
        </Flex>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Success;
