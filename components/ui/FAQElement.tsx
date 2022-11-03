import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface FAQElementProps {
  question: string;
  answer: string;
}

export const FAQElement: React.FC<FAQElementProps> = ({ question, answer }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <Box boxShadow="md" border="1px solid grey" my={2}>
      <Box
        _hover={{ cursor: "pointer" }}
        my={3}
        p={3}
        onClick={() => {
          setIsShow((prev) => !prev);
        }}
        borderRadius={5}
      >
        <Text fontWeight="bold">{question}</Text>
      </Box>
      {isShow && (
        <Box my={3} p={3}>
          <Text>{answer}</Text>
        </Box>
      )}
    </Box>
  );
};
