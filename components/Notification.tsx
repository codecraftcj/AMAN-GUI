import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

interface NotificationProps {
    title: string;
    message: string;
    timestamp: string;
    }   
    
const Notification: React.FC<NotificationProps> = ({ title, message, timestamp }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-blue-500 p-4 rounded-xl shadow-md mb-3"
      >
        <Text className=" font-bold text-lg">{title}</Text>
        <Text className=" text-sm">{timestamp}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded-xl w-11/12 shadow-lg">
            <Text className="text-lg font-bold mb-2">{title}</Text>
            <Text className="text-gray-700 mb-4">{message}</Text>
            <Text className="text-gray-500 text-xs mb-4">{timestamp}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-red-500 p-2 rounded-lg"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Notification;
