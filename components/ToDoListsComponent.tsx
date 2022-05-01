import React from 'react'
import ToDoListComponent from './ToDoListComponent'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ToDoListsComponent(props) {
  const navigation = useNavigation();
  
    const completeTask = (item) => {
        navigation.navigate('List', { listId: item.id, listName: item.name})
    }

    return (
            <ScrollView>
                <View style={styles.listsWrapper}>
                    <View style={styles.items}>
                    {
                        props.lists.map((item, index) => {
                        return (
                            <TouchableOpacity key={index}  onPress={() => completeTask(item)}>
                            <ToDoListComponent item={item} /> 
                            </TouchableOpacity>
                        )
                        })
                    }
                    </View>
                </View>                
            </ScrollView>
    )
}

const styles = StyleSheet.create({   
      listsWrapper: {
        paddingHorizontal: 20,
      },      
      items: {        
      },
});