import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
type DeviceProps = {
  deviceName: string;
};

const DeviceCard: React.FC<DeviceProps> = ({ deviceName }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [liveData, setLiveData] = useState<string>("Fetching...");
  const [terminalAccessPoint, setTerminalAccessPoint] = useState("");
  // const fetchLiveData = () => {
  //   // Simulate fetching live data
  //   setLiveData("Temperature: 25°C, Humidity: 60%");
  // };
  const getTerminalAccessPoint  = async (): Promise<string | null> => {
    try {
      const accessPoint = await AsyncStorage.getItem("terminalAccessPoint");

    return accessPoint ? accessPoint : null;
    } catch(e) { 
      console.log(e)
      return null;
    }}

    const getWaterParameters = async () => {
      try {
        console.log(terminalAccessPoint + "/get-latest-water-parameters")
        const response = await fetch(terminalAccessPoint + "/get-latest-water-parameters");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const resultString = JSON.stringify(result)
        console.log(resultString)

        setLiveData(resultString);
      }catch(err){

      }
    }
    
  useEffect(() => {
    getTerminalAccessPoint().then((value) => {setTerminalAccessPoint(value ?? "")});
    getWaterParameters()
    
  }, []);
  return (
    <>
      <TouchableOpacity onPress={() => { setModalVisible(true); getWaterParameters(); }}>
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
              <Button mode="contained" onPress={() => console.log("Action 1 Triggered")}>Open Feed Hatch</Button>
              <Button mode="contained" onPress={() => console.log("Action 2 Triggered")}>Close Feed Hatch</Button>
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
