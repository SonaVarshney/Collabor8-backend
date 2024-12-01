import { StyleSheet, Text, View, Image } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import EventSearchScreen from "./pages/searchPage";
import UserHomePage from "./pages/userHomePage";
import EventPage from "./pages/eventPage";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import SignUp from "./pages/SignUpUser";
import SocietySignUp from "./pages/SignUpSociety";
import SelectRole from "./pages/SelectRole";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryEventsPage from "./pages/CategoryEventsPage";
import LogInUser from "./pages/LogInUser";
import LogInSociety from "./pages/LogInSociety";
import CreateEvent from "./pages/CreateEvent";
import QRCodeGenerator from "./pages/dummy_QR";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectRole">
        <Stack.Screen
          name="LogInUser"
          component={LogInUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogInSociety"
          component={LogInSociety}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectRole"
          component={SelectRole}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventSearch"
          component={EventSearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SocietySignUp"
          component={SocietySignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryEvents"
          component={CategoryEventsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="generateQRCode"
          component={QRCodeGenerator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="EventDetails" component={EventPage} />
        <Stack.Screen
          name="HomePage"
          component={UserHomePage}
          options={{
            title: "Home",
            headerBackVisible: false,
            headerBackTitle: "Back",
            headerRight: () => (
              <Image
                source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
                style={styles.tinyLogo}
              />
            ),
          }}
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
