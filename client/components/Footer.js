import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Keep only necessary imports

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomePage")}
        style={styles.iconContainer}
      >
        <Ionicons name="home-outline" size={24} color="purple" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("EventSearch")}
        style={styles.iconContainer}
      >
        <Ionicons name="search-outline" size={24} color="purple" />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Categories")}
        style={styles.iconContainer}
      >
        <Ionicons name="list-outline" size={24} color="purple" />
        <Text style={styles.iconText}>Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 60,
    width: "90%", // Footer width
    alignSelf: "center", // Center horizontally
    position: "absolute", // Makes it float
    bottom: 20, // Distance from bottom of screen
    borderTopWidth: 1,
    borderColor: "#DDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded corners
  },

  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    color: "black",
  },
});
