import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const EventPage = ({route}) => {
    const [event, setEvent] = useState(null);
    const { id } = route.params;

    const navigation = useNavigation();

    useEffect(() => {
        // Fetch event details from backend
        axios.get(`http://localhost:3000/api/event/${id}`)
            .then(response => {
                setEvent(response.data);
                console.log(response.data);
                console.log(id);
            })
            .catch(error => {
                console.error('There was an error fetching the event data!', error);
            });
    }, []);

    if (!event) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: event.poster }} style={styles.banner}>
                <Text style={styles.title}>{event.eventName}</Text>
            </ImageBackground>
            <View style={styles.details}>
                <Text style={styles.header}>Event Details</Text>
                <Text style={styles.text}>{event.description}</Text>
                <Text style={styles.text}><Text style={styles.bold}>Date:</Text> {event.date}</Text>
                <Text style={styles.text}><Text style={styles.bold}>Location:</Text> {event.location}</Text>
                <FontAwesome name="comment" size={24} color="black" />            
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 100,
    },
    details: {
        padding: 20,
    },
    header: {
        fontSize: 22,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default EventPage;