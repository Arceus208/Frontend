import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../../components/navbar/NavBar";
import { Wrapper } from "../../components/ui/Wrapper";
import { useRouter } from "next/router";
import { axiosPublic } from "../../utils/axiosPublic";
import useSWR from "swr";
import { Footer } from "../../components/ui/Footer";

const OrderDetail: React.FC<{}> = ({}) => {
  const router = useRouter();
  const orderId = router.query.orderId;

  const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    router.isReady ? `/order/${orderId}` : null,
    fetcher
  );

  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        {data && !error && (
          <Flex flexDirection="column" align="center">
            <Text fontSize={30}>Order details</Text>
            <Flex
              alignItems="flex-start"
              flexDirection={["column", "column", "row-reverse"]}
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
                  <Text> {data.order._id}</Text>
                </Flex>
                <Flex flexDirection="column" py={3}>
                  <Text fontWeight="bold">Total Price:</Text>
                  <Text> {data.order.totalPrice}&euro; </Text>
                </Flex>
                <Flex flexDirection="column">
                  <Text fontWeight="bold">Order date:</Text>
                  <Text>{data.order.createAt.slice(0, 10)}</Text>
                </Flex>
              </Box>
              <Box>
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
                    <Text>{data.order.status}</Text>
                  </Flex>

                  <Text borderBottom="1px solid grey" py={2}>
                    {data.order.items.length} Articles
                  </Text>
                  {data.order.items.map((item: any, index: number) => (
                    <Flex key={index} mt={5} justifyContent="space-between">
                      <Flex>
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
                      <Box>
                        <Text>{item.price}&euro; </Text>
                      </Box>
                    </Flex>
                  ))}
                </Box>

                <Box
                  border="1px solid grey"
                  borderRadius={5}
                  boxShadow="xl"
                  mx={2}
                  mt={6}
                  p={5}
                  w={[200, 400, 500, 700]}
                >
                  <Text fontSize={20} fontWeight="bold" mb={5}>
                    Shipping Address
                  </Text>
                  <Flex flexDirection="column">
                    <Text fontWeight="bold">Street:</Text>
                    <Text>{data.order.shippingAddress.street}</Text>
                  </Flex>

                  <Flex flexDirection="column">
                    <Text fontWeight="bold">Post number:</Text>
                    <Text>{data.order.shippingAddress.postnumber}</Text>
                  </Flex>
                  <Flex flexDirection="column">
                    <Text fontWeight="bold">City:</Text>
                    <Text>{data.order.shippingAddress.city}</Text>
                  </Flex>
                  <Flex flexDirection="column">
                    <Text fontWeight="bold">Country:</Text>
                    <Text>{data.order.shippingAddress.country}</Text>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Flex>
        )}
        {error && <Box>Some error happened</Box>}
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default OrderDetail;
