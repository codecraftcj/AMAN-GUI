import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';

interface Job {
  id: number;
  job_name: string;
  is_completed: boolean;
  created_date: string;
}

const API_ENDPOINT = "https://amanrest-925084270691.asia-east2.run.app";

const FlexDimensionsBasics = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch jobs from the API
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/get-jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to create a new job
  const handleCreateJob = async (jobName: string) => {
    try {
      const payload = {
        job_name: jobName,
      };
      const response = await fetch(`${API_ENDPOINT}/add-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        Alert.alert("Job created", `The job ${jobName} has been created.`);
        // Refresh the job list
        const data = await response.json();
        setJobs((prevJobs) => [...prevJobs, data]);
      } else {
        Alert.alert("Error", "Failed to create the job.");
      }
    } catch (error) {
      console.error("Error creating job: ", error);
      Alert.alert("Error", "Failed to create the job.");
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <View className="mb-5">
        <Button
          title="Create Extend Motors Job"
          onPress={() => handleCreateJob('extend_motors')}
          color="blue"
        />
        <View className="mt-3">
          <Button
            title="Create Retract Motors Job"
            onPress={() => handleCreateJob('retract_motors')}
            color="red"
          />
        </View>
      </View>

      <View>
        {loading && <Text>Loading jobs...</Text>}
        {!loading && jobs.length > 0 && (
          jobs.map((job) => (
            <View key={job.id} className="mb-4 p-3 bg-white rounded shadow">
              <Text>Job Name: {job.job_name}</Text>
              <Text>Status: {job.is_completed ? 'Completed' : 'Pending'}</Text>
              <Text>Created Date: {job.created_date}</Text>
            </View>
          ))
        )}
        {!loading && jobs.length === 0 && (
          <Text>No jobs available.</Text>
        )}
      </View>
    </View>
  );
};

export default FlexDimensionsBasics;
