import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import DeviceModal from './DeviceModal';

const AddDeviceButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeviceSelect = (device:any) => {
    // Implement your device registration logic here
    console.log('Registering device:', device);
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>Add Device</Text>
      </TouchableOpacity>
      <DeviceModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDeviceSelect={handleDeviceSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 2,
    alignSelf: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddDeviceButton;
