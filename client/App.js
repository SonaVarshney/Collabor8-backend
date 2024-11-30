import { StyleSheet, Text, View } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import EventSearchScreen from "./pages/searchPage";
import UserHomePage from "./pages/userHomePage";
import EventPage from "./pages/eventPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='UserHomePage'>
        <Stack.Screen 
        name="Search" 
        component={EventSearchScreen} 
        />
        <Stack.Screen 
        name="EventDetails" 
        component={EventPage} 
        />
        <Stack.Screen 
        name="UserHomePage" 
        component={UserHomePage} 
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
