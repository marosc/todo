import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>{
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'To-Do Lists' }} />
          <Stack.Screen name="List" component={ListScreen} initialParams={{ listId: 2, listName: "Hej" }}  options={({ route }) => ({ title: route.params.listName })} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Edit task' }} initialParams={{ listId: 2, taskId: 2 }} />
        </Stack.Navigator>
    }</NavigationContainer>   
  );
};
