import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const WaterQualityView = () => {
  const [data, setData] = useState({
    temperature: 0,
    turbidity: 0,
    ph_level: 0,
    hydrogen_sulfide_level: 0,
  });

  useEffect(() => {
    const fetchLatestParameters = async () => {
      try {
        const response = await fetch('https://amanrest-925084270691.asia-east2.run.app/get-latest-water-parameters'); // Update the URL if needed
        const result = await response.json();
        if (response.ok) {
          setData({
            temperature: result.temperature,
            turbidity: result.turbidity,
            ph_level: result.ph_level,
            hydrogen_sulfide_level: result.hydrogen_sulfide_level,
          });
        } else {
          console.error('Error fetching data:', result.message || result.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data every second
    const intervalId = setInterval(fetchLatestParameters, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View>
      <Text>
        Water Quality View
      </Text>
      <Text>
        Temperature: {data.temperature}
      </Text>
      <Text>
        Turbidity: {data.turbidity}
      </Text>
      <Text>
        PH Level: {data.ph_level}
      </Text>
      <Text>
        Hydrogen Sulfide Level: {data.hydrogen_sulfide_level}
      </Text>
    </View>
  );
};

export default WaterQualityView;
