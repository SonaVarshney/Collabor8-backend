import { StyleSheet, Text, View, Image } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import EventSearchScreen from "./pages/searchPage";
import UserHomePage from "./pages/userHomePage";
import EventPage from "./pages/eventPage";

import FontAwesome from '@expo/vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen 
        name="Search" 
        component={EventSearchScreen} 
        />
        <Stack.Screen 
        name="EventDetails" 
        component={EventPage} 
        />
        <Stack.Screen 
        name="HomePage" 
        component={UserHomePage}
        options={{
          title: 'Home',
          headerBackVisible: false,
          headerBackTitle: 'Back',
          headerRight: () => (
            <Image 
              source={{ uri: 'https://avatar.iran.liara.run/public/girl'}}
              style={styles.tinyLogo}
            />      
          )
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
  }
});
