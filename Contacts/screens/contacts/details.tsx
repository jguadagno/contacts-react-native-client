import { Link } from '@react-navigation/native';
import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet, Linking } from 'react-native';
import { Avatar, ListItem, Text, ThemeProvider, colors, Divider, Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Api from '../../api'
import { Contact } from '../../api/generated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  justify_center: {
    justifyContent: 'center',
  }
});

export class State {
  isLoading: boolean;
  isError: boolean;
  contact: Contact;
  contactId: number;
}

export default class ContactsDetail extends Component {

  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      contact: null,
      contactId: props.route.params.contactId
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ThemeProvider>
          <View style={[styles.container, styles.justify_center]}>
            <ActivityIndicator size="large" />
          </View>
        </ThemeProvider>
      );
    }

    if (this.state.isError) {
      return (
        <ThemeProvider>
          <View style={[styles.container, styles.justify_center]}>
            <Text style={{ color: colors.error }}>Failed to connect to the service.</Text>
          </View>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider>
        <View style={styles.container}>
          <Avatar rounded size="large"
            source={{uri: this.state.contact.imageUrl, }} />
          <Text h1>{this.state.contact.fullName}</Text>
          <Divider style={{ backgroundColor: 'red' }} />
          <Text>&nbsp;&nbsp;</Text>
          <Button 
            icon={
              <Icon name="envelope" size={15} color="white" />
            }
            title={this.state.contact.emailAddress}
            onPress={() => Linking.openURL("mailto:" + this.state.contact.emailAddress) } />
        </View>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    Api.Contacts.contactsIdGet(this.state.contactId).then(
      (response) => {
        this.setState(
          {
            contact: response.data,
            isLoading: false
          });
        this.props.navigation.setOptions({title: this.state.contact.fullName});
      }
    ).catch((error) => {
      this.setState({
        isError: true,
        isLoading: false
      });
    })
  }
}