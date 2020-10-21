import React from 'react';
import { Button, View, Text, FlatList, StyleSheet } from 'react-native';
import MsalHandler from '../msal/MsalHandler';

export class Claim {
    key: string;
    value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export default class Auth extends React.Component {
    msalHandler: MsalHandler;
    accountAvailable: boolean;

    constructor(props: any) {
        super(props);
        this.msalHandler = MsalHandler.getInstance(); // note this returns the previously instantiated MsalHandler
        this.handleClick = this.handleClick.bind(this);
        this.accountAvailable = false;
    }

    state = {
        claims: Array<Claim>(),
    }

    componentDidMount() {
        var account = this.msalHandler.msalObj.getAccount();
        if (account) {
            this.accountAvailable = true;
        }
        if (this.accountAvailable) {
            this.parseToken(this.msalHandler.msalObj.getAccount().idToken);
        }
        else { }
    }

    parseToken(token: any) {
        var claimData = Object.keys(token).filter(y => y !== "decodedIdToken" && y !== "rawIdToken").map(x => {
            return new Claim(x, Array.isArray(token[x]) ? token[x].join(",") : token[x].toString());
        });
        this.setState({ claims: claimData });
    }

    render() {
        if (this.accountAvailable) {
            return (
                <View style={styles.container}>
                    <Text>User Claims</Text>
                    <FlatList 
                        data={this.state.claims}
                        renderItem={(claimData) => (
                            <View style={styles.row}>
                                <Text style={styles.column}>{claimData.item.key}</Text>
                                <Text style={styles.column}>{claimData.item.value}</Text>
                            </View>
                        )} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Button onPress={this.handleClick} title="Login" />
                </View>
            )
        }
    }

    async handleClick(e: any) {
        e.preventDefault();
        console.log("clicked");
        await this.msalHandler.login();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },     
    column: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '50%',
        flex: 1
    }
});