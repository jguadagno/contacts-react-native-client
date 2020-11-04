import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import Api from './api'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './screens/Auth';
import MsalHandler from './msal/MsalHandler';

// Custom Screens
import ContactsList from './screens/contacts/list';
import ContactsDetail from './screens/contacts/details';
import ContactsEdit from './screens/contacts/edit';

const msal = MsalHandler.getInstance();
var user = msal.getUserData();

function HomeScreen({navigation}) {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text>Welcome new followers!</Text>
        <Button title="View Contacts" onPress={() => navigation.navigate('contacts-list')} />
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
    </ThemeProvider>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'React Native - Contacts'}} />
      <Stack.Screen name="Auth" component={Auth} options={{title: 'Authentication'}} />
      <Stack.Screen name="contacts-list" component={ContactsList} options={{ title: 'Contacts' }}/>
      <Stack.Screen name="contacts-detail" component={ContactsDetail} />
      <Stack.Screen name="contacts-edit" component={ContactsEdit} />
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