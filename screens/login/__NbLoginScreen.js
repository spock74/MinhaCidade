import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useState, useContext } from "react";
import { Alert } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/places/UI/LoadingOverlay";
import { login } from "../auth/auth";
import { AuthContext } from "../../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NbLoginScreen = () => {

    const [isAuthenticanting, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    //const email = authCtx.email;
  
    async function loginHandler({ email, password }) {
      AsyncStorage.setItem("st_11_email", email);
      setIsAuthenticating(true);
      try {
        const token = await login(email, password);
        authCtx.Authenticate(token.idToken);
        // console.log("Sucesso 7777777", token);
      } catch (error) {
        console.log("error:: ", error);
        Alert.alert(
          "Erro",
          "Não foi possível realizar login.\n\nError: " + error
        );
        setIsAuthenticating(false);
      }
    }

    if (isAuthenticanting) {
        return <LoadingOverlay message="Realizando login..." />;
      }
    
  return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>;
};

export default NbLoginScreen;