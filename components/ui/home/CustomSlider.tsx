import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai";

interface SliderProps {}

export const CustomSlider: React.FC<SliderProps> = ({}) => {
  const router = useRouter();
  return (
    <div>
      <Carousel
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
        showThumbs={false}
      >
        <Flex
          bgImage={
            "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.5)) , url('image/bn9.jpg')"
          }
          h={[60, 300, 300, 600]}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          position="relative"
          justify="center"
        >
          <Flex align="flex-end" mb={10}>
            <Box>
              <Text
                color="white"
                fontSize={[20, 30, 40, 50]}
                fontWeight={500}
                letterSpacing={2}
              >
                Best Yugioh Shop
              </Text>
              <Text color="white" fontWeight={500}>
                Explore thousand of cards, boxes and accessories in our shop.
              </Text>
              <Button
                borderRadius="none"
                w={200}
                mt={4}
                onClick={() => {
                  router.push("/products");
                }}
                boxShadow="dark-lg"
              >
                TO SHOP
                <Icon as={AiOutlineArrowRight} ml={4}></Icon>
              </Button>
            </Box>
          </Flex>
        </Flex>
        <Flex
          bgImage={
            "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.5)) , url('image/bn11.jpg')"
          }
          h={[60, 300, 300, 600]}
          bgRepeat="no-repeat"
          bgSize="cover"
          position="relative"
          justify="center"
        >
          <Flex align="flex-end" mb={10}>
            <Box>
              <Text
                color="white"
                fontSize={[20, 30, 40, 50]}
                fontWeight={500}
                letterSpacing={2}
              >
                High quality cards
              </Text>
              <Text color="white" fontWeight={500}>
                Strengthen your deck with the card you want!
              </Text>
              <Button
                borderRadius="none"
                w={200}
                mt={4}
                onClick={() => {
                  router.push("/searchResult?category=card");
                }}
                boxShadow="dark-lg"
              >
                Cards collection
                <Icon as={AiOutlineArrowRight} ml={4}></Icon>
              </Button>
            </Box>
          </Flex>
        </Flex>
        <Flex
          bgImage={
            "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.5)) , url('image/bn6.jpg')"
          }
          h={[60, 300, 300, 600]}
          bgRepeat="no-repeat"
          bgSize="cover"
          position="relative"
          justify="center"
        >
          <Flex align="flex-end" mb={10}>
            <Box>
              <Text
                color="white"
                fontSize={[20, 30, 40, 50]}
                fontWeight={500}
                letterSpacing={2}
              >
                Structure deck and boxes
              </Text>
              <Text color="white" fontWeight={500}>
                Theme deck and special boxes
              </Text>
              <Button
                borderRadius="none"
                w={200}
                mt={4}
                onClick={() => {
                  router.push("/searchResult?category=cards");
                }}
                boxShadow="dark-lg"
              >
                Boxes collection
                <Icon as={AiOutlineArrowRight} ml={4}></Icon>
              </Button>
            </Box>
          </Flex>
        </Flex>
        <Flex
          bgImage={
            "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.5)) , url('image/bn10.png')"
          }
          h={[60, 300, 300, 600]}
          bgRepeat="no-repeat"
          bgSize="cover"
          position="relative"
          justify="center"
        >
          <Flex align="flex-end" mb={10}>
            <Box>
              <Text
                color="white"
                fontSize={[20, 30, 40, 50]}
                fontWeight={500}
                letterSpacing={2}
              >
                Hundred of accessories
              </Text>
              <Text color="white" fontWeight={500}>
                Card sleeves, playmat, toys and more !
              </Text>
              <Button
                borderRadius="none"
                w={300}
                mt={4}
                onClick={() => {
                  router.push("/searchResult?category=accessory");
                }}
                boxShadow="dark-lg"
              >
                Acccessories collection
                <Icon as={AiOutlineArrowRight} ml={4}></Icon>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Carousel>
    </div>
  );
};
