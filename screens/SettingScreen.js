import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            docId: '',
            emailId: ''
        }
    }

    getUserDetails = () => {
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id', '==', email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        address: data.address,
                        contact: data.contact,
                        emailId: data.email_id,
                        docId: doc.id
                    })
                })
            })
    }

    updateUserProfile = () => {
        db.collection('users').doc(this.state.docId).update({
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "address": this.state.address,
            "contact": this.state.contact,
        })
        Alert.alert("Profile Updated Successfully")
    }

    componentDidMount() {
        this.getUserDetails()
    }


    render() {
        return (
            <View style={styles.container}>
                <MyHeader title="Settings" navigation={this.props.navigation} />
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"First Name"}
                        onChangeText={(text) => {
                            this.setState({
                                firstName: text
                            })
                        }}
                        value={this.state.firstName}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Last Name"}
                        onChangeText={(text) => {
                            this.setState({
                                lastName: text
                            })
                        }}
                        value={this.state.lastName}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Address"}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                address: text
                            })
                        }}
                        value={this.state.address}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Contact"}
                        maxLength={10}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                contact: text
                            })
                        }}
                        value={this.state.contact}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.updateUserProfile()
                        }}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },

})