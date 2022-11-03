import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box my={[10, 15, 20]} mx="auto" p={5} maxW={[320, 500, 800, 1200]}>
      {children}
    </Box>
  );
};
