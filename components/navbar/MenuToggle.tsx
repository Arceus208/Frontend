import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

interface MenuToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <Icon as={AiOutlineCloseCircle}></Icon>
      ) : (
        <Icon as={GiHamburgerMenu}></Icon>
      )}
    </Box>
  );
};
