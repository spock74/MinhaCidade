import { StatusBar } from "expo-status-bar";
import { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/login/SignupScreen";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import FullMap from "./components/places/FullMap";
import IconButton from "./components/places/UI/IconButton";
import { Colors } from "./constants/Colors";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary700,
            },
            headerTintColor: Colors.gray50,
            contentStyle: {
              backgroundColor: Colors.gray900,
              tintColor: Colors.primary50,
            },
          }}
        >
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
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
