import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'

export default function AddListComponent(props) {
    const [name, setName] = useState()
  
    const handleAddList = () => {
      Keyboard.dismiss()
      props.handleAddList(name)
      setName(null)
    }

    return (        
            <View style={styles.writeListWrapper}>
                <TextInput style={styles.input} placeholder={'New list'} value={name} onChangeText={text => setName(text)} />
                <TouchableOpacity onPress={handleAddList}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
                </TouchableOpacity>
           </View>
    )
}

const styles = StyleSheet.create({   
      writeListWrapper: {
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
