import { StyleSheet, Text, View } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import EventSearchScreen from "./pages/searchPage";
import SignUp from "./pages/SignUpUser";
import SocietySignUp from "./pages/SignUpSociety";
import SelectRole from "./pages/SelectRole";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="selectRole"> 
        <Stack.Screen name="SelectRole" component={SelectRole} /> 
        <Stack.Screen name="EventSearch" component={EventSearchScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SocietySignUp" component={SocietySignUp} />
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
