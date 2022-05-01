import React, {useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, ScrollView, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'
import CalendarPicker from 'react-native-calendar-picker'
import moment from 'moment'

export default function EditTaskComponent(props) {
    const navigation = useNavigation()
    const [task, setTask] = useState(props.item)
    const baseUrl = 'https://626abba96a86cd64adb1f9aa.mockapi.io'

    const changeTask = (data) => {
      Keyboard.dismiss()
      axios({
        method: 'put',
        url: `${baseUrl}/lists/${props.item.listId}/items/${props.item.id}`,
        data: { ...data, completed: task.completed}
      })
      .then(({data}) => {
          setTask(data)
          navigation.goBack()
      })
      .catch((error) => console.error("Failed to change task."))
  }
  
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    description: yup.string(),
    deadline: yup.date().nullable()
  })



    return (
      <View style={styles.item}>       
         <Formik
            validateOnMount={true}
            validationSchema={validationSchema}
            initialValues={{ 
              name: task.name, 
              description: task.description, 
              deadline: moment(task.deadline).isValid() ? 
                moment(task.deadline).format('YYYY-MM-DD') : null
              }}
            onSubmit={values => changeTask(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View style={{height: '100%'}}>
                <ScrollView>
                <TextInput
                  name="name"
                  placeholder="Task name"
                  style={styles.textInput}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {(errors.name && touched.name) &&
                  <Text style={styles.errorText}>{errors.name}</Text>
                }

                <TextInput
                  name="description"
                  placeholder="Type description"
                  style={styles.textInput}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  multiline
                  numberOfLines={5}
                />
                {(errors.description && touched.description) &&
                  <Text style={styles.errorText}>{errors.description}</Text>
                }

                {
                values.deadline==null ?
                  <CalendarPicker 
                    onDateChange={(newDate) => { setFieldValue('deadline', newDate.format('YYYY-MM-DD') ) }}  
                    onBlur={handleBlur('deadline')}
                    value={values.deadline}
                  />
                  :
                  <CalendarPicker 
                  selectedStartDate={values.deadline} 
                  initialDate={values.deadline}  
                  onDateChange={(newDate) => { setFieldValue('deadline', newDate.format('YYYY-MM-DD') ) }}  
                  onBlur={handleBlur('deadline')}
                  value={values.deadline}
                />
              }                
                {(errors.deadline && touched.deadline) &&
                  <Text style={styles.errorText}>{errors.deadline}</Text>
                }
                
                <View style={{height: 80}}></View>

                </ScrollView>

                <View style={styles.submitBtn}>
                  <Button 
                    onPress={handleSubmit}
                    title="Save"
                    disabled={!isValid || values.name === ''}
                  />
                </View>
              </View>
            )}
          </Formik>
      </View>
    );
}

const styles = StyleSheet.create({
    item: {
    
    },
    submitBtn:{
      position: 'absolute',
      bottom: 0,
      padding: 20,
      width: '100%',
      zIndex: 99
    },
    textInput: {
      width: '80%',
      margin: 10,
      padding: 10,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
    },
    errorText: {
      fontSize: 10,
      color: 'red',
      marginStart: 15,
    },
  });
  