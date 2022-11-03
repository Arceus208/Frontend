import React, { useState } from "react";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";
import { SearchBar } from "./SearchBar";
import { ShopLogo } from "./ShopLogo";

export const NavBar: React.FC<{}> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <NavBarContainer>
      <ShopLogo></ShopLogo>

      <MenuToggle toggle={toggle} isOpen={isOpen}></MenuToggle>
      <MenuLinks isOpen={isOpen}></MenuLinks>
    </NavBarContainer>
  );
};
