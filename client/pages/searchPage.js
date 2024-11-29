import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";

const EventSearchScreen = () => {
  const [searchTag, setSearchTag] = useState(""); // User input for the tag
  const [events, setEvents] = useState([]); // Events fetched from the backend
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTag.trim()) return; // Ignore empty search
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/event/tag/${searchTag.toLowerCase()}` // Convert to lowercase
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events by tag", error);
    } finally {
      setLoading(false);
    }
  };

  const renderEventItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.poster }} style={styles.cardImage} />
      <Card.Content>
        <Title style={styles.cardTitle}>{item.eventName}</Title>
        <Paragraph style={styles.cardDescription}>{item.description}</Paragraph>
        <Text style={styles.cardOrganiser}>Organiser: {item.organiser}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="Search by Tag"
        placeholder="Enter a keyword, e.g., tech, music"
        value={searchTag}
        onChangeText={setSearchTag}
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleSearch}
        loading={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Search
      </Button>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item._id}
          renderItem={renderEventItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No events found. Try a different keyword!
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  input: {
    marginBottom: 16,
    marginTop: 16, // Prevent touching the top of the screen
  },
  button: {
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  loader: {
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    backgroundColor: "#fff",
  },
  cardImage: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  cardOrganiser: {
    fontSize: 12,
    color: "gray",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});

export default EventSearchScreen;
