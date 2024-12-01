import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [poster, setPoster] = useState("");
  const [groupLink, setGroupLink] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [society, setSociety] = useState("");
  const navigation = useNavigation();

  const handleCreateEvent = async () => {
    if (
      !eventName ||
      !date ||
      !location ||
      !poster ||
      !description ||
      !society
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const data = {
        eventName,
        date: date.toISOString(),
        location,
        poster,
        groupLink,
        tags: tags.split(",").map((tag) => tag.trim()),
        description,
        organiser: society,
      };

      const response = await axios.post(`${API_URL}/api/event`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        Alert.alert("Success", "Event created successfully!");
        // navigation.pop("SocietyHome"); 
        navigation.navigate("SocietyHome");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Event</Text>

        <TextInput
          style={styles.input}
          placeholder="Event Name (required)"
          value={eventName}
          onChangeText={setEventName}
        />

        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerText}>
            {date ? date.toDateString() : "Select Event Date (required)"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Event Location (required)"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Poster URL (required)"
          value={poster}
          onChangeText={setPoster}
        />

        <TextInput
          style={styles.input}
          placeholder="Group Link (optional)"
          value={groupLink}
          onChangeText={setGroupLink}
        />

        <TextInput
          style={styles.input}
          placeholder="Tags (comma-separated)"
          value={tags}
          onChangeText={setTags}
        />

        <TextInput
          style={[styles.input, styles.multiLineInput]}
          placeholder="Event Description (required)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <TextInput
          style={styles.input}
          placeholder="Society/College Name (required)"
          value={society}
          onChangeText={setSociety}
        />

        <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  multiLineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#6c63ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateEvent;
