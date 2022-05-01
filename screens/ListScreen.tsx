import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import TaskListComponent from '../components/TaskListComponent';
import AddTaskComponent from '../components/AddTaskComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListScreen({ route, navigation }) {
    const baseUrl = 'https://626abba96a86cd64adb1f9aa.mockapi.io';
    const [data, setData] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [search, setSearch] = useState(false)
    const [title, setTitle] = useState('')
    const [progress, setProgress] = useState(-1)

    const { listId, listName } = route.params

    useEffect(() => {
        loadTasks()
      },[])

      React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
            <Icon style={{marginEnd: 20}}
            onPress={() => loadTasks()}
            name="refresh" size={20} />
            <Icon  style={{marginEnd: 10}}
            onPress={() => setSearch(true)}
            name="search" size={20} />
            </View>
          ),
        });
      }, [navigation])

    const filterTasks = (type) => {
      if (type>=0){
        setData(originalData.filter(({name, completed}) => name.toLowerCase().includes(title.toLowerCase()) && completed == Boolean(type)))
      }else{
        setData(originalData.filter(({name}) => name.toLowerCase().includes(title.toLowerCase())))
      }
     
      setProgress(type)
    } 
    
    const loadTasks = () => {
        axios.get(`${baseUrl}/lists/${listId}/items`)
        .then(({data}) => {
            setData(data)
            setOriginalData(data)
        })
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }

    const handleAddTask = (newTask) => {
        axios({
          method: 'post',
          url: `${baseUrl}/lists/${listId}/items`,
          data: {
            name: newTask,
            deadline: '',
            completed: false
          }
        })
        .then(({data}) => {
            loadTasks()
        })
        .catch((error) => console.error(error))
    }

    return (
        <View style={styles.container}>
            {search ?
            <View style={styles.searchContainer}> 
              <View style={styles.searchRowContainer}> 
                <TextInput style={styles.input} placeholder={'Search task'} value={title} onChangeText={text => setTitle(text)}/>
                <Button onPress={() => filterTasks(progress)} title={'Search'}/> 
              </View>
              <View style={styles.searchRowContainer}>        
                <TouchableOpacity style={styles.circularRow} onPress={() => { filterTasks(1)}}>
                  <View style={styles.circularDone}/>
                  <Text style={styles.circularText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.circularRow} onPress={() => { filterTasks(0)}}>
                  <View style={styles.circularOpen}/>
                  <Text style={styles.circularText}>Open</Text>
                </TouchableOpacity>    
                <TouchableOpacity style={styles.circularRow} onPress={() => { filterTasks(-1)}}>
                  <View style={styles.circularDone}/>
                  <View style={styles.circularOpen}/>
                  <Text style={styles.circularText}>All</Text>
                </TouchableOpacity>
              </View>
              <Button onPress={() => setSearch(false)} title={'Close'} color='#888'/>
            </View>
            
            : <AddTaskComponent listId={listId} handleAddTask={handleAddTask} />
            }            
            <TaskListComponent listId={listId} tasks={data} />          
        </View>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    searchContainer: {
      flexDirection: 'column',
      margin: 20
    },
    searchRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    searchBtn:{
      
    },
    closeBtn: {
            
    },
    closeBtnStyle: {
      backgroundColor: 'silver',      
    },
    input: {
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 250,
    },
    circularOpen: {
      width: 12,
      height: 12,
      borderColor: '#55BCF6',
      borderWidth: 2,
      borderRadius: 5,
      marginEnd: 10
    },
    circularDone: {
      width: 12,
      height: 12,
      borderColor: '#55BCF6',
      borderWidth: 2,
      borderRadius: 5,
      backgroundColor: '#55BCF6',
      marginEnd: 10
    },
    circularText: {
      
    },
    circularRow: {
      padding: 15, 
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 5,
    }
  });