import React from "react";
import {
  Box,
  Flex,
  Icon,
  Input,
  Text,
  Link,
  Button,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box bgColor={"black"} color="white" px={[10, 10, 10, 200]} mt="auto">
      <Flex
        justifyContent="space-between"
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box mt={10}>
          <Text fontWeight={400} fontSize={25} mb={3}>
            ALWAYS UPDATED
          </Text>
          <Text color="gray">Sign up for latest news, offer and updates</Text>
          <Flex mt={2}>
            <Input
              placeholder="Your email"
              borderRadius={"none"}
              variant="filled"
            ></Input>
            <Button colorScheme={"red"} borderRadius={"none"}>
              Sign Up
            </Button>
          </Flex>
        </Box>
        <Box mt={10}>
          <Text fontWeight={400} fontSize={25} mb={3}>
            FOLLOW US
          </Text>
          <Flex>
            <Icon></Icon>
            <Icon></Icon>
            <Icon></Icon>
            <Icon></Icon>
          </Flex>
        </Box>
        <Box mt={10}>
          <Text fontWeight={400} fontSize={25} mb={3}>
            LINKS
          </Text>
          <Flex flexDirection="column">
            <NextLink href="/">
              <Link color="gray" fontWeight={700} mb={2}>
                CONTACT US
              </Link>
            </NextLink>
            <NextLink href="/">
              <Link color="gray" fontWeight={700} mb={2}>
                PRIVACY POLICY
              </Link>
            </NextLink>
            <NextLink href="/">
              <Link color="gray" fontWeight={700} mb={2}>
                RETURN POLICY
              </Link>
            </NextLink>
            <NextLink href="/">
              <Link color="gray" fontWeight={700} mb={2}>
                SHIPPING POLICY
              </Link>
            </NextLink>
            <NextLink href="/">
              <Link color="gray" fontWeight={700} mb={2}>
                TERM AND CONDITION
              </Link>
            </NextLink>
            <NextLink href="/">
              <Link color="gray" fontWeight={700} mb={2}>
                FAQ
              </Link>
            </NextLink>
          </Flex>
        </Box>
      </Flex>
      <Flex>
        <Text color="gray">Copyright &copy;</Text>
        <Flex></Flex>
      </Flex>
    </Box>
  );
};
