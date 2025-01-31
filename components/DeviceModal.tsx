import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface DeviceModalProps {
    visible: boolean;
    onClose: () => void;
    onDeviceSelect: (device: any) => void;
}

const DeviceModal: React.FC<DeviceModalProps> = ({ visible, onClose, onDeviceSelect }) => {
  interface Device {
    id: string;
    name: string;
  }

  const [scannedDevices, setScannedDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (visible) {
      startScan();
    }
  }, [visible]);

  const startScan = async () => {
    setIsScanning(true);
    // Simulate device scanning
    setTimeout(() => {
      setScannedDevices([
        { id: '1', name: 'Device 1' },
        { id: '2', name: 'Device 2' },
        { id: '3', name: 'Device 3' },
      ]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Scanning for devices...</Text>
          {isScanning ? (
            <Text style={styles.scanningText}>Scanning in progress...</Text>
          ) : (
            <FlatList
              data={scannedDevices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.deviceItem}
                  onPress={() => onDeviceSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>

                </TouchableOpacity>
              )}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scanningText: {
    marginBottom: 10,
  },
  deviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceName: {
    fontSize: 16,
  },
  deviceId: {
    fontSize: 12,
    color: '#666',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeviceModal;
