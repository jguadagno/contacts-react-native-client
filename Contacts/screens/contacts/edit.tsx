import { Link } from '@react-navigation/native';
import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet, Linking } from 'react-native';
import { Avatar, ListItem, Text, ThemeProvider, colors, Divider, Button, Header, Input } from 'react-native-elements';
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
  errorMessage: string;
}

export default class ContactsEdit extends Component {

  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      contact: null,
      contactId: props.route.params.contactId,
      errorMessage: null
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
            <Text style={{ color: colors.error }}>{this.state.errorMessage}</Text>
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
          <Text>Email Address</Text>
          <Input
            value={this.state.contact.emailAddress}
            placeholder='Email Address'
            editable
            autoCompleteType="email"
            onChangeText={(value) => { 
              var newContact: Contact = this.state.contact;
              newContact.emailAddress = value;
              this.setState({ contact: newContact})}
            }
            
            leftIcon={
              <Icon
                name='envelope'
                size={24}
                color='black'
              />
            }
          />
          <Button 
            icon={
              <Icon name="save" size={15} color="white" />
            }
            title={"  Save"}
            onPress={() => this.handleSaveClick(this.state.contact) } />
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
        this.props.navigation.setOptions({title: "Edit: " + this.state.contact.fullName});
      }
    ).catch((error) => {
      this.setState({
        isError: true,
        isLoading: false,
        errorMessage: "Failed to load the contact from the service."
      });
    })
  }
  
  handleSaveClick(item: Contact) {
    // Navigate to the Contact View
    console.log("Save Clicked");
    // TODO: Save the contact
    Api.Contacts.contactsPost(this.state.contact).then(
      (response) => {
        this.setState(
          {
            contact: response.data,
            isLoading: false
          });
        // Save successful, navigate to details
        this.props.navigation.navigate('contacts-detail', {contactId: item.contactId} );
      }
    ).catch((error) => {
      this.setState({
        isError: true,
        isLoading: false,
        errorMessage: "Failed to save the contact"
      });
    })    

    
  }
}