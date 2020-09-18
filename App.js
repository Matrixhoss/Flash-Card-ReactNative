import React from 'react';
import { StyleSheet, Text, View  ,Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStore ,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {setLocalNotification} from './utils/helper'
import reducer from './reducers'
import thunk from 'redux-thunk'
import DecksList from './components/DecksList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'

   const Stack = createStackNavigator()
   const Tab = Platform.OS==='ios' ? createBottomTabNavigator() :createMaterialTopTabNavigator()
  
const Tabs = () => {
  return (
    <Tab.Navigator  
      tabBarOptions={{
      activeTintColor: '#000',
      labelStyle: { fontSize: 16 },
      indicatorStyle : { backgroundColor: '#000' },
    }}
    >
      <Tab.Screen 
        name="Decks List"
        component={DecksList}
        />

      <Tab.Screen 
        name="New Deck" 
        component={NewDeck}
         />
    </Tab.Navigator>
  );
}

const Stacks = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
          name="Deck"
          component={Deck}
          options={{
          title: 'Deck',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
          name="Add Card"
          component={AddCard}
          options={{
          title: 'Add Card',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizView}
          options={{
          title: 'Quiz',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
  )
}
export default class App extends React.Component {
  store = createStore(reducer ,applyMiddleware(thunk  ))

  componentDidMount(){
    setLocalNotification()
  }
  render(){
    return(
      <Provider store={this.store}>
        <NavigationContainer>
          <Stacks/>
        </NavigationContainer>
      </Provider>
    )
  }
}

const logger = (store)=>(next)=>(action)=>{
  console.group(action.type);
  console.log("The action is :",action)
  const nextState = next(action)
  console.log("The new State is :" ,store.getState())
  console.groupEnd()

  return nextState
}
