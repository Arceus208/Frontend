import React from "react";
import { Stack, Link, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { ShoppingCartIcon } from "./ShoppingCartIcon";
import { useRouter } from "next/router";

import { ProfileIcon } from "./ProfileIcon";

import { SearchBar } from "./SearchBar";
import { useUser } from "../../hooks/useUser";

interface MenuLinksProps {
  isOpen: boolean;
}

export const MenuLinks: React.FC<MenuLinksProps> = ({ isOpen }) => {
  const { loggedIn, loading } = useUser();
  const router = useRouter();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <SearchBar></SearchBar>
        <NextLink href={"/"}>
          <Link textTransform="uppercase" color="white" fontWeight="bold">
            Home
          </Link>
        </NextLink>
        <NextLink href={"/products"}>
          <Link textTransform="uppercase" color="white" fontWeight="bold">
            Products
          </Link>
        </NextLink>
        <NextLink href={"/faq"}>
          <Link textTransform="uppercase" color="white" fontWeight="bold">
            FAQ
          </Link>
        </NextLink>
        {loggedIn && !loading ? null : (
          <NextLink href={"/register"}>
            <Link textTransform="uppercase" color="white" fontWeight="bold">
              Register
            </Link>
          </NextLink>
        )}
        {loggedIn && !loading ? null : (
          <NextLink href={`/login?next=${router.pathname}`}>
            <Link textTransform="uppercase" color="white" fontWeight="bold">
              Login
            </Link>
          </NextLink>
        )}
        {loggedIn && !loading && <ProfileIcon></ProfileIcon>}

        <ShoppingCartIcon></ShoppingCartIcon>
      </Stack>
    </Box>
  );
};
