import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootNavigator";
import { RouteProp } from "@react-navigation/native";

// ✅ Navigation type based on RootStackParamList
export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

// ✅ Generic reusable ScreenProps
export type ScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList
> = {
  navigation: RootNavigation;
  route: RouteProp<RootStackParamList, S>;
};
