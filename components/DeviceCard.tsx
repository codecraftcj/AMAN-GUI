import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";

type DeviceProps = {
  deviceName: string;
};

const DeviceCard: React.FC<DeviceProps> = ({ deviceName }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [liveData, setLiveData] = useState<string>("Fetching...");

  const fetchLiveData = () => {
    // Simulate fetching live data
    setLiveData("Temperature: 25°C, Humidity: 60%");
  };

  return (
    <>
      <TouchableOpacity onPress={() => { setModalVisible(true); fetchLiveData(); }}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.deviceName}>{deviceName}</Text>
            <Text style={styles.status}>Status: Online</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Device Control Panel</Text>
            <Text style={styles.liveData}>{liveData}</Text>

            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={() => console.log("Action 1 Triggered")}>Action 1</Button>
              <Button mode="contained" onPress={() => console.log("Action 2 Triggered")}>Action 2</Button>
            </View>

            <Button mode="outlined" onPress={() => setModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "green",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  liveData: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
});

export default DeviceCard;
