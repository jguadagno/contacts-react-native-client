import React, { Component } from 'react';
import { ActivityIndicator, View, Text, FlatList, StyleSheet } from 'react-native';

import Api from '../../api'
import { Contact } from '../../api/generated';

import MsalHandler from '../../msal/MsalHandler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  red: {
    color: 'red',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (this.state.isError) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <Text style={styles.red}>Failed to connect to the service.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.contactList}
          keyExtractor={item => item.contactId.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.fullName}
            </Text>
          )}
        />
      </View>
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