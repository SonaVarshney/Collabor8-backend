import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const SocietyHome = ({ route }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
//   const {societyName} = route.params;
  const societyName = "LeanIn";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
        console.log(societyName);
      const response = await axios.get(
        `${API_URL}/api/event/organiser/${societyName}`
      );
      const events = response.data;

      const today = new Date();
      const futureEvents = events.filter(
        (event) => new Date(event.date) >= today
      );
      const previousEvents = events.filter(
        (event) => new Date(event.date) < today
      );

      setUpcomingEvents(futureEvents);
      setPastEvents(previousEvents);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderEventItem = ({ item, isUpcoming }) => (
    <View style={isUpcoming ? styles.UpcomingEventCard : styles.PastEventCard}>
      <Text style={styles.eventName}>{item.eventName}</Text>
      <Text style={styles.eventDate}>{new Date(item.date).toDateString()}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6c63ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.UpcomingEvents}>Upcoming Events</Text>
        {upcomingEvents.length > 0 ? (
          <FlatList
            data={upcomingEvents}
            renderItem={({ item }) => renderEventItem({ item, isUpcoming: true })}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text style={styles.noEventsText}>No upcoming events found.</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.PastEvents}>Past Events</Text>
        {pastEvents.length > 0 ? (
          <FlatList
            data={pastEvents}
            renderItem={({ item }) => renderEventItem({ item, isUpcoming: false })}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text style={styles.noEventsText}>No past events found.</Text>
        )}
      </View>
  
      {/* Floating Button to navigate to Create Event */}
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={() => navigation.replace("CreateEvent")}
      >
        <Text style={styles.createEventText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 30,
    marginTop: 50
  },
  section: {
    flex: 1,
    marginBottom: 20,
  },
  UpcomingEvents: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0000FF",
    marginBottom: 10,
  },
  PastEvents: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#808080",
    marginBottom: 10,
  },
  UpcomingEventCard: {
    backgroundColor: "#DEEFF5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  PastEventCard: {
    backgroundColor: "#E4E0E1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  eventDate: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  noEventsText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  createEventButton: {
    position: "absolute",
    bottom: 40, // Move slightly above the bottom
    right: 20,
    backgroundColor: "#6c63ff",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  createEventText: {
    fontSize: 40, // Make the plus sign larger
    color: "#fff",
    fontWeight: "bold",
    lineHeight: 50, // Center the plus sign vertically
    marginBottom: 5, // Keep the plus sign above the center
  },
});

export default SocietyHome;
