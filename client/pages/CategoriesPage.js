import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons for icons
import Footer from "../components/Footer";

const CategoriesPage = ({ navigation }) => {
  const categories = [
    { name: "Society Events", key: "society" },
    { name: "TnP & Alumni Events", key: "tnp" },
    { name: "Faculty/College Events", key: "faculty" },
    { name: "Other Events Across India", key: "other" },
  ];

  const handleLogout = () => {
    // Implement logout logic (e.g., clear user data)
    navigation.navigate("SelectRole");
  };

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#FFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Categories Grid */}
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={styles.categoryCard}
            onPress={() =>
              navigation.navigate("CategoryEvents", { category: category.key })
            }
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
};

export default CategoriesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center", // Center the categories grid vertically
    alignItems: "center", // Center the categories grid horizontally
  },
  grid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%", // Ensures two cards fit in a row with space between
    aspectRatio: 1, // Makes the card a square
    marginVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 600,
    elevation: 9,
  },
  categoryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B3B",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    marginTop: 50
  },
  logoutText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
});
