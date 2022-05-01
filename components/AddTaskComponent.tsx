import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

export default function AddTaskComponent(props) {
    const baseUrl = 'https://626abba96a86cd64adb1f9aa.mockapi.io';
    const [task, setTask] = useState();
  
    const handleAddTask = () => {
        Keyboard.dismiss()
        props.handleAddTask(task)
        setTask(null)
    }

    return (        
            <View style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'New task'} value={task} onChangeText={text => setTask(text)} />
                <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
                </TouchableOpacity>
           </View>
    )
}

const styles = StyleSheet.create({   
      writeTaskWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        width: 250,
      },
      addWrapper: {
        marginTop: 20,  
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
      },
      addText: {},
});
