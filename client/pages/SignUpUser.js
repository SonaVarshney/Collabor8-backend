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
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const SignUp = () => {
  const [name, setName] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [interestedTags, setInterestedTags] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (
      !name ||
      !collegeEmail ||
      !password ||
      !enrollmentNumber ||
      !branch ||
      !year
    ) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}:3000/api/user/`, {
        name,
        collegeEmail,
        password,
        enrollmentNumber,
        branch,
        year,
        interestedTags: interestedTags.split(",").map((tag) => tag.trim()),
      });
      Alert.alert(
        "Success",
        "Account created successfully! Please log in to get started."
      );
      navigation.navigate("LogInUser"); // Redirect to login page
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="College Email"
          value={collegeEmail}
          onChangeText={setCollegeEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Enrollment Number"
          value={enrollmentNumber}
          onChangeText={setEnrollmentNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Branch (e.g., CSE, IT)"
          value={branch}
          onChangeText={setBranch}
        />

        <TextInput
          style={styles.input}
          placeholder="Year of admission (e.g., 2024)"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Interested Tags (comma-separated)"
          value={interestedTags}
          onChangeText={setInterestedTags}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUp;
