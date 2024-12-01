import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";

const CategoriesPage = ({ navigation }) => {
  const categories = [
    { name: "Society Events", key: "society" },
    { name: "TnP & Alumni Events", key: "tnp" },
    { name: "Faculty/College Events", key: "faculty" },
    { name: "Other Events Across India", key: "other" },
  ];

  return (
    <View style={styles.container}>
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
      <Footer navigation={navigation} />
    </View>
  );
};

export default CategoriesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
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
});
