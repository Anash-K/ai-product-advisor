import { StatusBar, StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { Product, Recommendation } from "../types";
import { NavigationContainer } from "@react-navigation/native";
import { ProductDetailScreen } from "../screens/ProductDetails";

// 1. Define type for stack params
export type RootStackParamList = {
  Home: undefined;
  Details: { product: Recommendation };
};

// 2. Pass types into Stack
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} translucent />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
