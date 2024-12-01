import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const EventPage = ({ route }) => {
    const [event, setEvent] = useState(null);
    const [comments, setComments] = useState('');
    const [commentList, setCommentList] = useState([]);
    const { id } = route.params;
    const userid = "674a0aa17779aa90fe26a02f"; // Dummy user ID

    // Fetch event details
    const fetchEventDetails = async () => {
        try {
            const response = await axios.get(`http://192.168.1.5:3000/api/event/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    // Fetch comments
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://192.168.1.5:3000/api/comments/event/${id}`);
            setCommentList(
                response.data.map((comment) => ({
                    id: comment._id,
                    text: comment.description,
                    avatar: 'https://avatar.iran.liara.run/public/girl',
                }))
            );
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Post a comment
    const handleCommentPost = async () => {
        if (comments.trim() === '') {
            return; // Do not allow empty comments
        }

        try {
            await axios.post(`http://192.168.1.5:3000/api/comments`, {
                eventId: id,
                userId: userid,
                description: comments,
            });

            // Add the comment to the local state for immediate update
            setCommentList((prevComments) => [
                ...prevComments,
                {
                    id: Date.now().toString(),
                    text: comments,
                    avatar: 'https://avatar.iran.liara.run/public/girl',
                },
            ]);

            setComments(''); // Clear the input field
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    useEffect(() => {
        fetchEventDetails();
        fetchComments();
    }, []);

    if (!event) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Entypo name="dots-three-horizontal" size={18} color="black" style={styles.alignRightIcon} />
                <Card.Cover source={{ uri: event.poster }} style={styles.cardImage} />
                <Card.Content>
                    <Text style={styles.cardTitle}>{event.eventName}</Text>
                    <Text style={styles.cardDescription}>{event.description}</Text>
                    <View style={styles.textWithIcon}>
                        <Text style={styles.cardOrganiser}>Organised by: {event.organiser}</Text>
                        <FontAwesome name="comment" size={24} color="black" />
                    </View>
                </Card.Content>
            </Card>

            {/* Comment Input Section */}
            <View style={styles.commentSection}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Write a comment..."
                    placeholderTextColor="gray"
                    value={comments}
                    onChangeText={(text) => setComments(text)}
                />
                <TouchableOpacity style={styles.iconButton} onPress={handleCommentPost}>
                    <FontAwesome6 name="arrow-up-right-from-square" size={24} color="#f5f5f5" />
                </TouchableOpacity>
            </View>

            {/* Comments List */}
            <FlatList
                data={commentList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentItem}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    card: {
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
    },
    cardImage: {
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    cardOrganiser: {
        fontSize: 12,
        color: 'gray',
    },
    alignRightIcon: {
        alignSelf: 'flex-end',
        margin: 5,
    },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    commentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginVertical: 10,
    },
    commentInput: {
        flex: 1,
        color: 'black',
        padding: 10,
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
    iconButton: {
        backgroundColor: '#CAE1F9',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentText: {
        flex: 1,
        color: 'black',
    },
    list: {
        paddingBottom: 20,
    },
});

export default EventPage;
