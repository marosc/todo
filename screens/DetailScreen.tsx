import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import EditTaskComponent from '../components/EditTaskComponent';

export default function DetailScreen({ route, navigation }) {
    const [isLoading, setLoading] = useState(true)
    const { listId, taskId } = route.params
    const [task, setTask] = useState(null);   
    const baseUrl = 'https://626abba96a86cd64adb1f9aa.mockapi.io';

    useEffect(() => {
        axios.get(`${baseUrl}/lists/${listId}/items/${taskId}`)
          .then(({data}) => {            
            setTask(data)
          })
          .catch((error) => console.error(error))
          .finally(()=>setLoading(false))
      },[])

    return (
        <View style={styles.container}>
           { task == null ? <Text>Loading...</Text> : <EditTaskComponent item={task}/>}
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        
    }
  });