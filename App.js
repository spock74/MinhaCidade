//import "react-native-gesture-handler";
import { NativeBaseProvider, Box, extendTheme } from "native-base";
import { Entypo } from "@native-base/icons";
import { FontAwesome } from "@native-base/icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import LoginScreen from "./screens/login/LoginScreen";
// import NbLoginScreen from "./screens/login/NbLoginScreen";
import SignupScreen from "./screens/login/SignupScreen";
import WelcomeScreen from "./screens/login/WelcomeScreen";
import Configurations from "./screens/Configurations";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/places/UI/IconButton";
import { Colors } from "./constants/Colors";

import { initSqlite } from "./util/database";

import ExplorerScreen from "./screens/ExplorerScreen";

import { Alert } from "react-native";
import FullMap from "./components/places/FullMap";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Login" component={NbLoginScreen} /> */}
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.Logout}
            />
          ),
          title: "Início",
          drawerIcon: ({ color, size }) => (
            <FontAwesome
              name="home"
              color={"green"}
              size={size}
              onPress={() => navigation.navigate("Welcome")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          title: "Lista de Locais",
          drawerIcon: ({ color, size }) => (
            <FontAwesome
              name="list"
              color={"red"}
              size={size}
              onPress={() => navigation.navigate("AllPlace")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: "Adicionar Local",
          drawerIcon: ({ color, size }) => (
            <FontAwesome
              name="plus"
              color={"red"}
              size={size}
              onPress={() => navigation.navigate("AddPlace")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="FullMap"
        component={FullMap}
        visible={false}
        options={{
          title: "Mapa",
          drawerIcon: ({ color, size }) => (
            <FontAwesome
              name="map"
              color={"red"}
              size={size}
              onPress={() => navigation.navigate("FullMap")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Explorer"
        component={ExplorerScreen}
        options={{
          title: "Mapa Explorador",
          drawerItemStyle: {
            color: "white",
            fonntWeight: "bold",
            fontSize: 20,
          },
          drawerIcon: ({ color, size }) => (
            <FontAwesome
              name="map-marker"
              color={"red"}
              size={size}
              onPress={() => navigation.navigate("Explorer")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Configurations"
        component={Configurations}
        options={{
          title: "Configurações",
          drawerIcon: ({ color, size }) => (
            <FontAwesome
              name="cog"
              color={"red"}
              size={size}
              onPress={() => navigation.navigate("AllPlace")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary800,
        },
        headerTintColor: Colors.gray50,
        contentStyle: {
          backgroundColor: Colors.primary50,
          tintColor: "black",
        },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem("authToken_st12");
      if (storedToken) {
        authCtx.Authenticate(storedToken);
        // console.log("storedToken appp ******", storedToken);
      }
      setIsLoading(false);
    }

    getToken();
  }, []);

  // if (isLoading) {
  //   return <AppLoading />;
  // }

  return <Navigation />;
}

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initSqlite()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log("Error initializing database: ", err);
        Alert.alert("Erro", "Erro ao inicializar banco de dados", err);
      });
  }, []);

  // if (!dbInitialized) {
  //   return <AppLoading />;
  // }

  return (
    <NativeBaseProvider theme={theme}>
      <>
        <StatusBar style="light" />
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
