import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import EventCard from "../components/EventCard";
import { API_URL } from "@env";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";

const API_URLL = `${API_URL}/api/event/`;

const CategoryEventsPage = ({ route }) => {
  const { category } = route.params;
  const [events, setEvents] = useState([]);

  const navigation = useNavigation();


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URLL);
      const data = await response.json();
      const filteredEvents = filterEventsByCategory(data, category);
      setEvents(filteredEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const filterEventsByCategory = (events, categoryKey) => {
    return events.filter((event) => {
      if (
        categoryKey === "society" &&
        !event.organiser.includes("Generic") &&
        !event.organiser.includes("Placement Cell") &&
        !event.organiser.includes("Dept")
      ) {
        return true;
      }
      if (categoryKey === "tnp" && event.organiser.includes("Placement Cell")) {
        return true;
      }
      if (categoryKey === "faculty" && event.organiser.includes("Dept")) {
        return true;
      }
      if (categoryKey === "other" && event.organiser.includes("Generic")) {
        return true;
      }
      return false;
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
      />
      <Footer navigation={navigation}/>
    </View>
  );
};

export default CategoryEventsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 40,
    backgroundColor: "#F8F9FA",
  },
});
