import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SelectRole = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    // Navigate to the respective signup page based on the role
    navigation.navigate(role === "Student" ? "SignUp" : "SocietySignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.eventry}>Eventry</Text>
      <Text style={styles.description}>Stay in the loop with all events!</Text>
      <Text style={styles.chooseRole}>Choose Your Role</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelection("Student")}
      >
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelection("Organizer")}
      >
        <Text style={styles.buttonText}>Organizer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  welcome: {
    fontSize: 20,
    fontWeight: "500",
    color: "#444",
    textAlign: "left",
    marginTop: 50, // Pushed to the top of the screen
  },
  eventry: {
    fontSize: 60,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#3D3BF3", 
    textAlign: "center",
    marginVertical: 30, // Space above and below
  },
  description: {
    fontSize: 20,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
    paddingBottom: 40,
  },
  chooseRole: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3D3BF3",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  
});

export default SelectRole;
