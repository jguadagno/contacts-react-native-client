import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet } from 'react-native';
import { Avatar, ListItem, Text, ThemeProvider } from 'react-native-elements';

import Api from '../../api'
import { Contact } from '../../api/generated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class State {
  isLoading: boolean;
  isError: boolean;
  contactList: Contact[];
}

export default class ContactsList extends Component {

  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      contactList: null
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ThemeProvider>
          <View style={[styles.container]}>
            <ActivityIndicator size="large" />
          </View>
        </ThemeProvider>
      );
    }

    if (this.state.isError) {
      return (
        <ThemeProvider>
          <View style={[styles.container]}>
            <Text>Failed to connect to the service.</Text>
          </View>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider>
        <View style={styles.container}>
          <FlatList
            data={this.state.contactList}
            keyExtractor={item => item.contactId.toString()}
            renderItem={({ item }) => (
              <ListItem>
                <Avatar source={{uri: item.imageUrl}} />
                <ListItem.Content>
                  <ListItem.Title>{item.fullName}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </View>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    Api.Contacts.contactsGet().then(
      (response) => {
        this.setState(
          {
            contactList: response.data,
            isLoading: false
          });
      }
    ).catch((error) => {
      this.setState({
        isError: true,
        isLoading: true
      });
    })
  }
}