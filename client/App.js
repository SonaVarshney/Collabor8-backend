import { StyleSheet, Text, View } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import EventSearchScreen from "./pages/searchPage";
import SignUp from "./pages/SignUpUser";
import SocietySignUp from "./pages/SignUpSociety";
import SelectRole from "./pages/SelectRole";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryEventsPage from "./pages/CategoryEventsPage";
import LogInUser from "./pages/LogInUser";
import LogInSociety from "./pages/LogInSociety";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectRole">
        <Stack.Screen name="LogInUser" component={LogInUser} />
        <Stack.Screen name="LogInSociety" component={LogInSociety} />
        <Stack.Screen name="SelectRole" component={SelectRole} />
        <Stack.Screen name="EventSearch" component={EventSearchScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SocietySignUp" component={SocietySignUp} />
        <Stack.Screen name="Categories" component={CategoriesPage} />
        <Stack.Screen name="CategoryEvents" component={CategoryEventsPage} />
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
