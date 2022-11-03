import { Box, Text, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/ui/Wrapper";
import { useAuthContext } from "../context/authContext";
import NextLink from "next/link";
import { Footer } from "../components/ui/Footer";

import { useUser } from "../hooks/useUser";

interface UserInterface {
  name: string;
  email: string;
  address?: {
    city: string;
    postnumber: number;
    street: string;
    country: string;
  };
}

const Profile: React.FC<{}> = ({}) => {
  const { token } = useAuthContext();
  const { data, loggedIn, loading } = useUser();

  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Flex justify="center">
          {data && token && (
            <Flex
              justifyContent={"flex-start"}
              alignItems={["center", "center", "flex-start"]}
              flexDirection="column"
            >
              <Flex
                p={10}
                boxShadow="xl"
                flexDirection="column"
                h={250}
                justifyContent="space-between"
                w={[200, 300, 800, 800]}
              >
                <Box>
                  <Text fontSize={20} fontWeight={500} mb={3}>
                    Profile data
                  </Text>
                  <Text>{data.user.name}</Text>
                  <Text>{data.user.email}</Text>
                </Box>

                <NextLink href="/editProfile">
                  <Link color="blue">Edit Profile</Link>
                </NextLink>
              </Flex>
              <Flex
                p={10}
                boxShadow="xl"
                flexDirection="column"
                justifyContent="space-between"
                w={[200, 300, 800, 800]}
                h={250}
              >
                <Box>
                  <Text fontSize={20} fontWeight={500} mb={3}>
                    Password
                  </Text>
                  <Text>*********</Text>
                </Box>

                <NextLink href="/changePassword">
                  <Link color="blue">Change password</Link>
                </NextLink>
              </Flex>
              <Flex
                p={10}
                boxShadow="xl"
                flexDirection="column"
                justifyContent="space-between"
                w={[200, 300, 800, 800]}
                h={250}
              >
                <Box>
                  <Text fontSize={20} fontWeight={500} mb={3}>
                    Shipping address
                  </Text>

                  {data.user.address ? (
                    <Flex flexDirection="column">
                      <Text>{data.user.address.street}</Text>
                      <Text>{data.user.address.postnumber}</Text>
                      <Text>{data.user.address.city}</Text>
                      <Text>{data.user.address.country}</Text>
                    </Flex>
                  ) : (
                    <Text>Add shipping address</Text>
                  )}
                </Box>
                <NextLink href="/changeAddress">
                  <Link color="blue">Change Address</Link>
                </NextLink>
              </Flex>
            </Flex>
          )}
          {!loggedIn && !token && (
            <Flex h="60vh" align="center" flexDirection="column">
              <Text>Please log in to view your profile</Text>
              <NextLink href={"/login"}>
                <Link color="blue">To login page</Link>
              </NextLink>
            </Flex>
          )}
        </Flex>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Profile;
