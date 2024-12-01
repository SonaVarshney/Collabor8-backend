import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EventCard = ({ event }) => {
  const navigation = useNavigation(); 
  return (
    <TouchableOpacity onPress={() => navigation.navigate("EventDetails", {id: event._id})}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: event.poster }} style={styles.cardImage} />
        <Card.Content>
          <Text style={styles.cardTitle}>{event.eventName}</Text>
          <Text style={styles.cardDescription}>{event.description}</Text>
          <Text style={styles.cardOrganiser}>Organiser: {event.organiser}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
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
