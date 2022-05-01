import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Collapsible from 'react-native-collapsible'
import moment from 'moment'

export default function TaskComponent(props) {
    const navigation = useNavigation();
    const [task, setTask] = useState(props.item);
    const [collapsed, setCollapsed] = useState(true);
    const [deleted, setDeleted] = useState(false)
    const baseUrl = 'https://626abba96a86cd64adb1f9aa.mockapi.io';  

    const editTask = () => {
      navigation.navigate('Detail', { taskId: task.id, listId: task.listId})
    }

    const deleteTask = () => {
      axios({
        method: 'delete',
        url: `${baseUrl}/lists/${props.item.listId}/items/${props.item.id}`
      })
      .then(({data}) => {
        setDeleted(true)
      })
      .catch((error) => console.error("Failed to delete task."))
  }

    const changeTask = () => {
      axios({
        method: 'put',
        url: `${baseUrl}/lists/${props.item.listId}/items/${props.item.id}`,
        data: { ...task, completed: !task.completed }
      })
      .then(({data}) => {
          setTask(data)
      })
      .catch((error) => console.error("Failed to change task."))
  }
    
    return (
      <View>
        { deleted ? <View/> : 
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
                <Text>{task.name}</Text>
              </TouchableOpacity> 
              <TouchableOpacity onPress={() => changeTask()} style={{padding: 15}}>
                <View style={task.completed ? styles.circularDone : styles.circularOpen}></View>
              </TouchableOpacity>
            </View>
            <Collapsible collapsed={collapsed}>
              <Text style={styles.deadlineText}>Deadline {moment(task.deadline).isValid() ? moment(task.deadline).format('DD. MM. YYYY') : 'Not set'}</Text>
              <Text style={styles.descriptionText}>{task.description}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title="Edit" onPress={() => editTask()}/>
                <Button title="Delete" color="red" onPress={() => deleteTask()}/>
              </View>          
            </Collapsible>
          </View>
        }
      </View>
    );
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'column',
      marginBottom: 20,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    circularOpen: {
      width: 12,
      height: 12,
      borderColor: '#55BCF6',
      borderWidth: 2,
      borderRadius: 5,
    },
    circularDone: {
      width: 12,
      height: 12,
      borderColor: '#55BCF6',
      borderWidth: 2,
      borderRadius: 5,
      backgroundColor: '#55BCF6',
    },
    deadlineText: {
      color: '#888',
      fontSize: 12,
      marginBottom: 10
    },
    descriptionText: {
      color: '#888',
      marginBottom: 24
    },
  });
  