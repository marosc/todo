import React from 'react'
import TaskComponent from './TaskComponent'
import { StyleSheet, View, ScrollView } from 'react-native'

export default function TaskListComponent(props) {
  
    return (
            <ScrollView>
                <View style={styles.listsWrapper}>
                    <View style={styles.items}>
                    {
                        props.tasks.map((item, index) => {
                        return (
                            <TaskComponent item={item} key={item.id}/> 
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
