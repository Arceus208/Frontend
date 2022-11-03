import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/ui/Wrapper";
import { useUser } from "../hooks/useUser";
import NextLink from "next/link";
import { axiosPrivate } from "../utils/axiosPrivate";
import useSWRInfinite from "swr/infinite";
import { OrderCard } from "../components/orders/OrderCard";

interface myOrderProps {}

const MyOrder: React.FC<myOrderProps> = ({}) => {
  const { data, loggedIn, loading } = useUser();

  const fetcher = (url: string) =>
    axiosPrivate.get(url).then((res) => res.data.orders);

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/users/getUserOrders?page=${pageIndex}`;
  };

  const {
    data: orderData,
    error,
    size,
    setSize,
  } = useSWRInfinite<any, any, any>(data ? getKey : null, fetcher);

  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        {!loggedIn ? (
          <Box>
            <Text>Please login to view your order</Text>
            <NextLink href="/login">
              <Link>To login page</Link>
            </NextLink>
          </Box>
        ) : orderData ? (
          <Flex flexDirection="column" align="center">
            {orderData.map((orders, index) => {
              return orders.map((order: any, index: number) => (
                <OrderCard
                  key={Math.random() + index}
                  order={order}
                ></OrderCard>
              ));
            })}
            <Flex justifyContent="center" my={2}>
              <Button onClick={() => setSize(size + 1)} colorScheme="teal">
                Load more
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Box></Box>
        )}
      </Wrapper>
    </Box>
  );
};

export default MyOrder;
