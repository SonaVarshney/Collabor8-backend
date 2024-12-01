import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { API_URL } from "@env";

const SocietySignUp = () => {
  const [socName, setSocName] = useState("");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [socEmail, setSocEmail] = useState("");
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleSocietySignUp = async () => {
    if (!socName || !socEmail) {
      Alert.alert("Error", "Please fill in the required fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/society/`, {
        socName,
        description,
        socialLinks: socialLinks.split(",").map((link) => link.trim()),
        socEmail,
      });

      Alert.alert("Success", "Society registered successfully!");

      // Redirect to login screen after successful signup
      navigation.navigate("LogInSociety"); // Replace with your actual login screen name
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register Your Society</Text>

        <TextInput
          style={styles.input}
          placeholder="Society Name (required)"
          value={socName}
          onChangeText={setSocName}
        />

        <TextInput
          style={[styles.input, styles.multiLineInput]}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <TextInput
          style={styles.input}
          placeholder="Social Links (comma-separated)"
          value={socialLinks}
          onChangeText={setSocialLinks}
        />

        <TextInput
          style={styles.input}
          placeholder="Society Email (required)"
          value={socEmail}
          onChangeText={setSocEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleSocietySignUp}>
          <Text style={styles.buttonText}>Register Society</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  multiLineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#6c63ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SocietySignUp;
