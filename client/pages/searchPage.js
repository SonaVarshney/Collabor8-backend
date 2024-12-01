// EventSearchScreen.js
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-paper";
import SearchBar from "../components/SearchBar"; // Import the custom search bar
import { API_URL } from "@env";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";

const EventSearchScreen = () => {
  const [searchTag, setSearchTag] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!searchTag.trim()) return; // Do nothing if the search bar is empty
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/event/tag/${searchTag.toLowerCase()}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events by tag", error);
    } finally {
      setLoading(false);
    }
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("EventDetails", {id: item._id})}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.poster }} style={styles.cardImage} />
        <Card.Content>
          <Text style={styles.cardTitle}>{item.eventName}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardOrganiser}>Organiser: {item.organiser}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  useEffect(() => {
    axios.get(`${API_URL}/api/event`).then((response) => {
      setEvents(response.data);
    }); // Fetch all events on component mount
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        searchPhrase={searchTag}
        setSearchPhrase={setSearchTag}
        onSearch={handleSearch}
        setClicked={setClicked}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#6c63ff" style={styles.loader} />
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
      <Footer navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    marginTop: 20,
  },
  list: {
    padding: 15,
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    // color: "gray",
    marginTop: 50,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    padding: 15,
    backgroundColor: "#CAE1F9",
  },
  cardImage: {
    borderRadius: 10,
    margin: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  cardOrganiser: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
});

export default EventSearchScreen;
