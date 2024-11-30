import { StyleSheet, Text, View } from "react-native";
import EventSearchScreen from "./pages/searchPage";
import SignUp from "./pages/SignUpUser";
import SocietySignUp from "./pages/SignUpSociety";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    // <EventSearchScreen />
    // <SignUp />
    <SocietySignUp />
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
