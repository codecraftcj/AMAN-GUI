import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
interface Job {
  id: number;
  job_name: string;
  is_completed: boolean;
  created_date: string;
}

const API_ENDPOINT = "https://amanrest-925084270691.asia-east2.run.app";

const FlexDimensionsBasics = () => {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch water data from the API
    const fetchWaterData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/get-water-parameters`);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWaterData();
  }, []);

//   const DisplayData=({data}:any)=>{
//     data.map(
//         (info:any)=>{
//             return(

//                 <DataTable.Row>
//                     <DataTable.Cell>info.id</DataTable.Cell>
//                     <DataTable.Cell>info.hydrogen_sulfide_level</DataTable.Cell>
//                     <DataTable.Cell>info.ph_level</DataTable.Cell>
//                     <DataTable.Cell>info.turbidity</DataTable.Cell>
//                     <DataTable.Cell>info.temperature</DataTable.Cell>
//                     <DataTable.Cell>info.created_date</DataTable.Cell>
//                 </DataTable.Row>
//             )
//         }
//     )
//   } 
  return (
    <ScrollView>
        <View className="flex-1 p-5 bg-gray-100">
      <View className="mb-5">
      </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title>Hydrogn Sulfide Level</DataTable.Title>
                    <DataTable.Title>PH Level</DataTable.Title>
                    <DataTable.Title>Turbidity</DataTable.Title>
                    <DataTable.Title>Temperature</DataTable.Title>
                    <DataTable.Title>Created Date</DataTable.Title>
                </DataTable.Header>
                {data.map((info:any) => (
                    <DataTable.Row>
                    <DataTable.Cell>{info.id}</DataTable.Cell>
                    <DataTable.Cell>{info.hydrogen_sulfide_level}</DataTable.Cell>
                    <DataTable.Cell>{info.ph_level}</DataTable.Cell>
                    <DataTable.Cell>{info.turbidity}</DataTable.Cell>
                    <DataTable.Cell>{info.temperature}</DataTable.Cell>
                    <DataTable.Cell>{info.created_date}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
      <View>
       
      </View>
    </View>
    </ScrollView>
  );
};

export default FlexDimensionsBasics;
