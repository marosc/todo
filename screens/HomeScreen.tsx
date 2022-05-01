import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, View} from 'react-native';
import ToDoListsComponent from '../components/ToDoListsComponent';
import AddListComponent from '../components/AddListComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
    const baseUrl = 'https://626abba96a86cd64adb1f9aa.mockapi.io';
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    
    useEffect(() => {
      loadList()
    },[])

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (         
          <Icon style={{marginEnd: 10}}
          onPress={() => loadList()}
          name="refresh" size={20} />         
        ),
      });
    }, [navigation])

    const loadList = () => {
        axios.get(`${baseUrl}/lists`)
        .then(({data}) => {
            setData(data)
        })
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }

    const handleAddList = (name) => {     
        axios({
            method: 'post',
            url: `${baseUrl}/lists`,
            data: {
              name: name              
            }
          })
          .then(({data}) => {
              loadList()      
          })
          .catch((error) => console.error(error))
    }

    return (
        <View style={styles.container}>
            <AddListComponent handleAddList={handleAddList}/>
            <ToDoListsComponent lists={data}/>          
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    }
  });