// SearchBar.js
import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ searchPhrase, setSearchPhrase, onSearch, setClicked }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.searchBar, isFocused && styles.focused]}>
        <Feather name="search" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search events..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSearch}
        />
        {searchPhrase && (
          <TouchableOpacity onPress={() => setSearchPhrase("")}>
            <Entypo
              name="cross"
              size={20}
              color="gray"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddin: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
  },
  focused: {
    backgroundColor: "#ffffff",
    borderColor: "#6c63ff",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "gray",
  },
  clearIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
