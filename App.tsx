import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeScreen } from "./src/screens/HomeScreen";
import RootNavigator from "./src/navigation/RootNavigator";
import Toast from "react-native-toast-message";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator/>
      <Toast />
    </QueryClientProvider>
  );
}
