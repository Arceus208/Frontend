import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface OrderCardProps {
  order: {
    items: any[];
    createAt: string;
    status: "string";
    totalPrice: number;
    _id: string;
  };
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Flex
      alignItems="flex-start"
      flexDirection={["column", "column", "row"]}
      mb={10}
    >
      <Box
        m={2}
        p={5}
        boxShadow="xl"
        w={[200, 400, 300, 300]}
        border="1px solid grey"
        borderRadius={5}
      >
        <Flex flexDirection="column">
          <Text fontWeight="bold" mr={6}>
            OrderID:
          </Text>
          <Text> {order._id}</Text>
        </Flex>
        <Flex flexDirection="column" borderBottom="1px solid black" py={3}>
          <Text fontWeight="bold">Total Price:</Text>
          <Text> {order.totalPrice}&euro; </Text>
        </Flex>

        <NextLink href={`/orders/${order._id}`}>
          <Flex justify="center" mt={5}>
            <Button colorScheme="teal" w="100%">
              Order Details
            </Button>
          </Flex>
        </NextLink>
      </Box>
      <Box
        m={2}
        p={5}
        boxShadow="xl"
        w={[200, 400, 500, 700]}
        border="1px solid grey"
        borderRadius={5}
      >
        <Flex>
          <Text fontWeight="bold" mr={2}>
            Status:{" "}
          </Text>
          <Text>{order.status}</Text>
        </Flex>

        <Text borderBottom="1px solid grey" py={2}>
          {order.items.length} Articles
        </Text>
        {order.items.map((item, index) => (
          <Flex key={index} mt={5}>
            <Box mr={4}>
              <Image
                src={item.image}
                alt="pic"
                h={[50, 50, 50, 50]}
                w={[50, 50, 50, 50]}
                fit="contain"
              ></Image>
            </Box>
            <Box>
              <Text>{item.name}</Text>
              <Text fontSize={13} color="grey">
                Amount: {item.quantity}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};
