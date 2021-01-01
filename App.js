import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'

const home_screen = require('./Screens/home.js')
const about_screen = require('./Screens/about.js')

const nav = createSwitchNavigator({
  Home: {screen: home_screen},
  About: {screen: about_screen}
})

const Export_app_nav = createAppContainer(nav)

export default function App() {
  return (
    <Export_app_nav />
  );
}

