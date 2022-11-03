import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { CustomInput } from "../components/custom_components/CustomInput";
import { NavBar } from "../components/navbar/NavBar";

import { Footer } from "../components/ui/Footer";
import { Wrapper } from "../components/ui/Wrapper";

import { useShopContext } from "../context/shopContext";
import { useRouter } from "next/router";
import { useAxiosAuth } from "../utils/axiosAuth";
import { axiosPublic } from "../utils/axiosPublic";

import { useUser } from "../hooks/useUser";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { orderSchema } from "../yup_schema/validation";

const Order: React.FC<{}> = ({}) => {
  const { cartItems, setCartItems, totalPrice } = useShopContext();

  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const { data, loading, loggedIn, error } = useUser();
  const [step, setStep] = useState<number>(0);

  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Flex
          justifyContent="space-around"
          flexDirection={["column", "column", "row-reverse"]}
          alignItems={["center", "center", "flex-start"]}
        >
          <Box mb={10}>
            <Text fontWeight="bold">Order details:</Text>
            {cartItems?.map((item) => (
              <Box key={item.id}>
                <Flex
                  borderBottom="1px solid grey"
                  align="center"
                  p={4}
                  justifyContent="space-between"
                >
                  <Flex align="center">
                    <Image
                      p={0.5}
                      borderRadius={4}
                      border="1px solid grey"
                      src={item.image}
                      alt="Pic"
                      w={50}
                      h={50}
                      fit="contain"
                    ></Image>
                    <Text mx={2}>x{item.quantity}</Text>
                    <Text w="15rem">{item.name}</Text>
                  </Flex>
                  <Text fontWeight={500}>{item.quantity * item.price}$</Text>
                </Flex>
              </Box>
            ))}
            <Flex justifyContent="space-between" p={4}>
              <Text fontWeight="bold">Total</Text>
              <Text fontWeight="bold">{totalPrice}$</Text>
            </Flex>
          </Box>
          <Box>
            <Formik
              initialValues={
                data && !loading
                  ? {
                      name: data.user.name,
                      email: data.user.email,
                      city: data.user.address?.city,
                      postnumber: data.user.address?.postnumber,
                      street: data.user.address?.street,
                      country: data.user.address?.country,
                    }
                  : {
                      name: "",
                      email: "",
                      city: "",
                      postnumber: "",
                      street: "",
                      country: "",
                    }
              }
              enableReinitialize={true}
              validationSchema={orderSchema}
              onSubmit={async (values) => {
                setStep((s) => s + 1);
              }}
            >
              {({ handleSubmit, values }) => (
                <Form>
                  {step === 0 && (
                    <Flex direction="column" w={[200, 400, 500, 500]}>
                      <Text fontWeight="bold">Customer info:</Text>
                      <CustomInput
                        type="text"
                        label="Name:"
                        name="name"
                        placeholder="Type your name"
                      ></CustomInput>

                      <CustomInput
                        type="text"
                        label="Email:"
                        name="email"
                        placeholder="Type your email"
                      ></CustomInput>

                      <Text fontWeight="bold">Shipping address:</Text>
                      <CustomInput
                        type="text"
                        label="Street:"
                        name="street"
                        placeholder="Enter your street"
                      ></CustomInput>

                      <CustomInput
                        type="text"
                        label="City:"
                        name="city"
                        placeholder="Enter your city"
                      ></CustomInput>

                      <CustomInput
                        type="number"
                        label="Postal code:"
                        name="postnumber"
                        placeholder=""
                      ></CustomInput>

                      <CustomInput
                        type="text"
                        label="Country:"
                        name="country"
                        placeholder="Enter your country"
                      ></CustomInput>
                      <Button
                        colorScheme="teal"
                        onClick={(e: any) => {
                          handleSubmit(e);
                        }}
                      >
                        Checkout option
                      </Button>
                    </Flex>
                  )}
                  {step === 1 && (
                    <Flex p={4} flexDirection="column" w={[300, 400, 500, 500]}>
                      <PayPalScriptProvider
                        options={{
                          "client-id": process.env.NEXT_PUBLIC_CLIENTID!,
                          currency: "EUR",
                        }}
                      >
                        <PayPalButtons
                          createOrder={async () => {
                            try {
                              console.log(values.name);
                              const response = await axiosPublic.post(
                                `/order/createOrder`,
                                {
                                  items: cartItems!.map((item) => {
                                    return {
                                      id: item.id,
                                      quantity: item.quantity,
                                    };
                                  }),
                                }
                              );
                              if (response.status === 201) {
                                return response.data.id;
                              }
                            } catch (err: any) {
                              return Promise.reject(err.response.data.message);
                            }
                          }}
                          onApprove={async (p_data, actions) => {
                            try {
                              let bodyValues = {
                                address: {
                                  city: values.city,
                                  postnumber: values.postnumber,
                                  street: values.street,
                                  country: values.country,
                                },
                                email: values.email,
                              } as any;

                              if (data && !error) {
                                bodyValues.customerId = data.user.id;
                              }

                              const response = await axiosPublic.post(
                                `/order/captureOrder/${p_data.orderID}`,
                                bodyValues
                              );

                              if (response.status === 201) {
                                setCartItems([]);
                                router.push("/success");
                              }
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                        />
                      </PayPalScriptProvider>
                      <Button
                        colorScheme="teal"
                        onClick={() => {
                          setStep((s) => s - 1);
                        }}
                      >
                        Back
                      </Button>
                    </Flex>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Order;
