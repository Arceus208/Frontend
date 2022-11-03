import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { CgProfile } from "react-icons/cg";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";

interface ProfileIconProps {}

export const ProfileIcon: React.FC<ProfileIconProps> = ({}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { logout } = useAuthContext();
  const router = useRouter();

  const logoutHandle = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/users/logout`,
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    await response.json();
    logout();
    sessionStorage.setItem("isLogin", "false");
    router.push("/");
  };

  return (
    <Box borderRadius="50%" onClick={onToggle} position="relative">
      <Icon as={CgProfile} boxSize={8}></Icon>
      {isOpen && (
        <Fade
          in={isOpen}
          style={{ position: "absolute", zIndex: 10, right: "-40px" }}
        >
          <Flex
            flexDirection="column"
            borderRadius={5}
            bgColor="white"
            w={150}
            p={4}
            boxShadow="md"
          >
            <Text color="black" fontWeight={500}>
              Welcome back
            </Text>
            <NextLink href="/profile">
              <Link color="black" mt={4}>
                Profile
              </Link>
            </NextLink>
            <NextLink href="/myOrders">
              <Link color="black" mt={4}>
                My shopping{" "}
              </Link>
            </NextLink>
            <Text
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={logoutHandle}
              color="black"
              mt={4}
            >
              Logout
            </Text>
          </Flex>
        </Fade>
      )}
    </Box>
  );
};
