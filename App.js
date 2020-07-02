import * as React from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/notifications';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const DeckStack = createStackNavigator();
const NewDeckStack = createStackNavigator();

function DeckStackScreen() {
  return (
    <DeckStack.Navigator
      initialRouteName="Deck List"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00263b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <DeckStack.Screen name="Deck List" component={DeckList} />
      <DeckStack.Screen name="Add Card" component={NewQuestion} />
      <DeckStack.Screen name="Deck Details" component={Deck} />
      <DeckStack.Screen name="Quiz" component={Quiz} />
    </DeckStack.Navigator>
  );
}

function NewDeckStackScreen() {
  return (
    <NewDeckStack.Navigator
      initialRouteName="New Deck"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00263b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <NewDeckStack.Screen name="New Deck" component={NewDeck} />
      <NewDeckStack.Screen name="Deck" component={Deck} />
    </NewDeckStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor="#00a1ab" barStyle="light-content" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'DeckList') {
                  iconName = 'md-albums';
                } else if (route.name === 'NewDeck') {
                  iconName = 'md-add-circle';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#6f0000',
              inactiveTintColor: 'gray',
              style:{
               
              }
            }}>
            <Tab.Screen
              name="DeckList"
              component={DeckStackScreen}
              options={{
                tabBarLabel: 'Deck List',
              }}
            />
            <Tab.Screen name="NewDeck" component={NewDeckStackScreen} options={{
                tabBarLabel: 'New Deck',
              }} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
