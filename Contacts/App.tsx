import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Api from './api'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './screens/Auth';
import MsalHandler from './msal/MsalHandler';

const msal = MsalHandler.getInstance();
var user = msal.getUserData();

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome new followers!</Text>
      <Button title="Hello" onPress={() => {console.log("Hello");}} />
      <Button title={user.accountAvailable ? "Claims for " + user.displayName : "Login"} onPress={() => navigation.navigate('Auth')} />
      <Button title="Number of Contacts" onPress={async () => {
        var contactList = await Api.Contacts.contactsGet();
        console.log("Number of contacts: " + contactList.data.length);}} />
      <Button title="Get First Contact" onPress={async () => {
        var contact = await Api.Contacts.contactsIdGet(1);
        console.log("First name: '" + contact.data.fullName + "'");
      }} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});