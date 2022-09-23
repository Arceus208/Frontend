import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

interface AdvertiseProps {}

export const Advertise: React.FC<AdvertiseProps> = ({}) => {
  return (
    <Box
      bgImage={"url('image/p1.jpg')"}
      w="100vw"
      h={[60, 300, 500, 500]}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      position="relative"
    ></Box>
  );
};
