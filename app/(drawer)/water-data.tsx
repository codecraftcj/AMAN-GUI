import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

interface Job {
  id: number;
  hydrogen_sulfide_level: string;
  ph_level: string;
  turbidity: string;
  temperature: string;
  created_date: string;
}

const API_ENDPOINT = "https://amanrest-925084270691.asia-east2.run.app";

const WaterData = () => {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    ph_level_min: '',
    ph_level_max: '',
    temperature_min: '',
    temperature_max: '',
  });

  useEffect(() => {
    // Fetch water data from the API with the initial query (latest 100 entries)
    // fetchWaterData();
  }, []);

  const fetchWaterData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('limit', '100');

      // Apply filters if defined
      if (filters.ph_level_min) queryParams.append('ph_level_min', filters.ph_level_min);
      if (filters.ph_level_max) queryParams.append('ph_level_max', filters.ph_level_max);
      if (filters.temperature_min) queryParams.append('temperature_min', filters.temperature_min);
      if (filters.temperature_max) queryParams.append('temperature_max', filters.temperature_max);

      const response = await fetch(`${API_ENDPOINT}/get-water-parameters?${queryParams.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="bg-gray-100">
      <View className="flex-1 p-5">
        <Text className="text-lg font-bold mb-4 text-center">Water Parameters Data</Text>
        
        {/* Filters Section */}
        <View className="mb-5 p-4 rounded-lg bg-white">
          <Text className="font-semibold mb-2">Filters:</Text>
          <View className="mb-2">
            <Text>pH Level Min:</Text>
            <TextInput
              className="border rounded-lg p-2 mb-2"
              value={filters.ph_level_min}
              onChangeText={(text) => setFilters({ ...filters, ph_level_min: text })}
              placeholder="Enter minimum pH level"
              keyboardType="numeric"
            />
            <Text>pH Level Max:</Text>
            <TextInput
              className="border rounded-lg p-2 mb-2"
              value={filters.ph_level_max}
              onChangeText={(text) => setFilters({ ...filters, ph_level_max: text })}
              placeholder="Enter maximum pH level"
              keyboardType="numeric"
            />
          </View>
          <View className="mb-2">
            <Text>Temperature Min:</Text>
            <TextInput
              className="border rounded-lg p-2 mb-2"
              value={filters.temperature_min}
              onChangeText={(text) => setFilters({ ...filters, temperature_min: text })}
              placeholder="Enter minimum temperature"
              keyboardType="numeric"
            />
            <Text>Temperature Max:</Text>
            <TextInput
              className="border rounded-lg p-2 mb-2"
              value={filters.temperature_max}
              onChangeText={(text) => setFilters({ ...filters, temperature_max: text })}
              placeholder="Enter maximum temperature"
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-lg mt-3"
            onPress={fetchWaterData}
          >
            <Text className="text-white text-center">Apply Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Data Table */}
        {loading ? (
          <Text className="text-center">Loading...</Text>
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>H2S Level</DataTable.Title>
              <DataTable.Title>pH Level</DataTable.Title>
              <DataTable.Title>Turbidity</DataTable.Title>
              <DataTable.Title>Temperature</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
            </DataTable.Header>
            {data.map((info) => (
              <DataTable.Row key={info.id}>
                <DataTable.Cell>{info.id}</DataTable.Cell>
                <DataTable.Cell>{info.hydrogen_sulfide_level}</DataTable.Cell>
                <DataTable.Cell>{info.ph_level}</DataTable.Cell>
                <DataTable.Cell>{info.turbidity}</DataTable.Cell>
                <DataTable.Cell>{info.temperature}</DataTable.Cell>
                <DataTable.Cell>{info.created_date}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </View>
    </ScrollView>
    </GestureHandlerRootView>
  );
};

export default WaterData;
