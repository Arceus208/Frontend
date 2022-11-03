import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Router from "next/router";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onEnterEvents = (event: any) => {
    if (event.key === "Enter") {
      router.push(`/searchResult?search=${inputRef.current!.value}`);
    }
  };

  return (
    <Box>
      <Box
        display={{ base: isOpen ? "none" : "block" }}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <BsSearch></BsSearch>
      </Box>
      <InputGroup display={{ base: isOpen ? "block" : "none" }}>
        <InputLeftElement
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <BsSearch color="white"></BsSearch>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search product"
          variant="flushed"
          ref={inputRef}
          onKeyDown={onEnterEvents}
        />
      </InputGroup>
    </Box>
  );
};
