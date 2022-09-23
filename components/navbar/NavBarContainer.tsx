import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface NavBarContainerProps {
  children: ReactNode;
}

export const NavBarContainer: React.FC<NavBarContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["black", "black", "black", "black"]}
      color={["white", "white", "white", "white"]}
      {...props}
    >
      {children}
    </Flex>
  );
};
