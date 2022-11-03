import React from "react";
import { Box, Flex, Icon, Input, Text, Link, Button } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaTumblr, FaYoutube } from "react-icons/fa";
import NextLink from "next/link";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box bgColor={"black"} color="white" px={[10, 10, 10, 100]} mt="auto" p={4}>
      <Flex
        justifyContent="space-between"
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box mt={10}>
          <Text fontWeight={400} fontSize={[15, 15, 25, 25]} mb={3}>
            ALWAYS UPDATED
          </Text>
          <Text color="gray">Sign up for latest news, offer and updates</Text>
          <Flex mt={2}>
            <Input
              placeholder="Your email"
              borderRadius={"none"}
              variant="filled"
            ></Input>
            <Button colorScheme="teal" borderRadius={"none"}>
              Sign Up
            </Button>
          </Flex>
        </Box>
        <Flex mt={10} flexDirection="column">
          <Text fontWeight={400} fontSize={[15, 15, 25, 25]} mb={3}>
            FOLLOW US
          </Text>
          <Box>
            <Icon as={FaFacebookF} boxSize={6} mx="0.3rem"></Icon>
            <Icon as={FaTwitter} boxSize={6} mx="0.3rem"></Icon>
            <Icon as={FaTumblr} boxSize={6} mx="0.3rem"></Icon>
            <Icon as={FaYoutube} boxSize={6} mx="0.3rem"></Icon>
          </Box>
        </Flex>
        <Flex mt={10} flexDirection="column">
          <Text fontWeight={400} fontSize={[15, 15, 25, 25]} mb={3}>
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
        </Flex>
      </Flex>
      <Flex>
        <Text color="gray">Copyright &copy;</Text>
        <Flex></Flex>
      </Flex>
    </Box>
  );
};
