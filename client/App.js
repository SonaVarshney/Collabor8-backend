import { StyleSheet, Text, View } from "react-native";
import EventSearchScreen from "./pages/searchPage";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";

// Screens
import EventSearchScreen from "./pages/searchPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Search" 
        component={EventSearchScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
