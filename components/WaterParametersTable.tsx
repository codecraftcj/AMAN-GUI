import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

interface WaterParametersTableProps {
    limit?: number;
}

interface WaterParameters {
    temperature: number;
    turbidity: number;
    ph_level: number;
    hydrogen_sulfide_level: number;
}

const WaterParametersTable : React.FC<WaterParametersTableProps> = ({ limit = 100 }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://your-flask-api-url/get_water_parameters?limit=${limit}`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error));
    }, [limit]);
    const sampleData = [
        {
            id: 1,
            temperature: 25,
            turbidity: 3.5,
            ph_level: 7.2,
            hydrogen_sulfide_level: 0.1,
        },
        {
            id: 2,
            temperature: 22,
            turbidity: 4.0,
            ph_level: 7.0,
            hydrogen_sulfide_level: 0.05,
        },
        // Add more sample entries as needed
    ];
    return (
        <ScrollView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Temperature (°C)</DataTable.Title>
                    <DataTable.Title>Turbidity (NTU)</DataTable.Title>
                    <DataTable.Title>pH Level</DataTable.Title>
                    <DataTable.Title>H₂S Level (mg/L)</DataTable.Title>
                </DataTable.Header>
                {sampleData.map((item: WaterParameters, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.temperature}</DataTable.Cell>
                        <DataTable.Cell>{item.turbidity}</DataTable.Cell>
                        <DataTable.Cell>{item.ph_level}</DataTable.Cell>
                        <DataTable.Cell>{item.hydrogen_sulfide_level}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </ScrollView>
    );
};

export default WaterParametersTable;
