import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import db from '../config.js';
import { Card, Header, Icon } from 'react-native-elements'

export default class RecieverDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            recieverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')["request_id"],
            bookName: this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting: this.props.navigation.getParam('details')["reason_to_request"],
            recieverName: '',
            recieverContact: '',
            recieverAddress: '',
        }
    }

    getRecieverDetails() {
        db.collection('users').where('email_id', '==', this.state.recieverId).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        recieverName: doc.data().first_name,
                        recieverContact: doc.data().contact,
                        recieverAddress: doc.data().address,
                    })
                })
            })
    }

    componentDidMount() {
        this.getRecieverDetails()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1 }}>
                    <Header
                        leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()} />}
                        centerComponent={{ text: "Donate Books", style: { color: '#90A5A9', fontWeight: "bold" } }}
                        backgroundColor='#eaf8fe'
                    />
                </View>

                <View style={{ flex: 0.3 }}>
                    <Card
                        title={"Book Details"}
                    >
                        <Card>
                            <Text>Name : {this.state.bookName}</Text>
                        </Card>
                        <Card>
                            <Text>Reason : {this.state.reason_for_requesting}</Text>
                        </Card>
                    </Card>
                </View>

                <View style={{ flex: 0.3 }}>
                    <Card
                        title={"Receiver Details"}
                    >
                        <Card>
                            <Text>Name : {this.state.recieverName}</Text>
                        </Card>
                        <Card>
                            <Text>Contact : {this.state.recieverContact}</Text>
                        </Card>
                        <Card>
                            <Text>Address : {this.state.recieverAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    {
                        this.state.recieverId !== this.state.userId
                            ? (
                                <TouchableOpacity
                                >
                                    <Text>I want to Donate</Text>
                                </TouchableOpacity>
                            )
                            : null
                    }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})