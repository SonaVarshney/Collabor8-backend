import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import Footer from "../components/Footer";

const UserHomePage = ({ route }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigation = useNavigation();

//   const { userid } = route.params;
    const userid = "674c97be0a39b0ed88f99b11"; 

  const fetchEvents = async () => {
    try {
      // Use axios to fetch data from the backend
      // const response = await axios.get(`http://192.168.1.5:3000/api/event`);
      const response = await axios.get(`${API_URL}/api/user/${userid}`);
      setUser(response.data);
      tags = await response.data.interestedTags;
      if (tags.length === 0) {
        const data = await axios.get(`${API_URL}/api/event`);
        setEvents(data.data);
      } else {
        //Initialize events set to avoid duplicates
        let tempEvents = new Set();
        for (let i = 0; i < tags.length; i++) {
          const data = await axios.get(
            `${API_URL}/api/event/tag/${tags[i].toLowerCase()}`
          );
          const eventData = await data.data;

          // Add events to the set
          for (let j = 0; j < eventData.length; j++) {
            tempEvents.add(eventData[j]);
          }
        }
        // Convert the set to an array and set the state
        setEvents(Array.from(tempEvents));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log(events);
    }
  };

  
    useEffect(() => {
        fetchEvents();
    }, []); 

  const renderEventCard = ({ item }) => (
    // Click on the event card to view the event details
    <TouchableOpacity
      onPress={() => navigation.navigate("EventDetails", { id: item._id, userid: userid })}
    >
      <Card style={styles.card}>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="black"
          style={styles.alignRightIcon}
        />
        <Card.Cover source={{ uri: item.poster }} style={styles.cardImage} />
        <Card.Content>
          <Text style={styles.cardTitle}>{item.eventName}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.cardOrganiser}>
              Organised by: {item.organiser}
            </Text>
            <FontAwesome name="comment" size={24} color="black" />
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : events.length === 0 ? (
        <Text style={styles.empty}>No events available</Text>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventCard}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
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
    elevation: 3,
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
  alignRightIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },
});

export default UserHomePage;
