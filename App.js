//import "react-native-gesture-handler";

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
import SignupScreen from "./screens/login/SignupScreen";
import WelcomeScreen from "./screens/login/WelcomeScreen";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/places/UI/IconButton";
import { Colors } from "./constants/Colors";

import { initSqlite } from "./util/database";

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
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Stack.Screen
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
        }}
      />      
      <Drawer.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          title: "Locais",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} onPress={() => navigation.navigate("AddPlace")}/>
          ),
        }}
      />
      <Drawer.Screen  
        name="AddPlace"
        component={AddPlace}
        options={{
          title: "Adicionar",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
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
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: "Todos os Locais",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add-circle"
              size={28}
              color={tintColor}
              onPress={() => navigation.navigate("AddPlace")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: "Adicionar Local",
        }}
      />
      <Stack.Screen
        name="FullMap"
        component={FullMap}
        options={{
          title: "Mapa",
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
      const storedToken = await AsyncStorage.getItem("authToken_st11");
      if (storedToken) {
        authCtx.Authenticate(storedToken);
        console.log("storedToken appp ******", storedToken);
      }
      setIsLoading(false);
    }

    getToken();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initSqlite()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log("Error initializing database: ", err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
