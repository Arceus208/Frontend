import React from "react";
import { Stack, Link, Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ShoppingCartIcon } from "./ShoppingCartIcon";
import { useAuthContext } from "../../context/authContext";

interface MenuLinksProps {
  isOpen: boolean;
}

export const MenuLinks: React.FC<MenuLinksProps> = ({ isOpen }) => {
  const { isLogin, logout } = useAuthContext();

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

    const data = await response.json();
    logout();
    console.log(data.message);
  };
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <NextLink href={"/"}>
          <Link>Home</Link>
        </NextLink>
        <NextLink href={"/products"}>
          <Link>Products</Link>
        </NextLink>
        <NextLink href={"/accessories"}>
          <Link>FAQ</Link>
        </NextLink>
        {!isLogin && (
          <NextLink href={"/register"}>
            <Link>Register</Link>
          </NextLink>
        )}
        {!isLogin && (
          <NextLink href={"/login"}>
            <Link>Login</Link>
          </NextLink>
        )}
        {isLogin && (
          <Text
            onClick={logoutHandle}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Logout
          </Text>
        )}

        <ShoppingCartIcon></ShoppingCartIcon>
      </Stack>
    </Box>
  );
};
