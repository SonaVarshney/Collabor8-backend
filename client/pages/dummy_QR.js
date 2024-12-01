import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

const QRCodeGenerator = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrCodeUrl, setQRCodeUrl] = useState("");

  const generateQRCode = () => {
    const commonData = "https://example.com"; // Replace with your desired text or URL
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      commonData
    )}&size=200x200`;
    setQRCodeUrl(apiUrl);
    setIsModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QR Code Generator</Text>
      <Button title="Generate QR Code" onPress={generateQRCode} />

      {/* Modal for displaying the QR code */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Your QR Code</Text>
            {qrCodeUrl && (
              <Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QRCodeGenerator;
