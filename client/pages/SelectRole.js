import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SelectRole = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    // Navigate to the respective signup page based on the role
    navigation.navigate(role === "Student" ? "StudentSignUp" : "OrganizerSignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SelectRole;