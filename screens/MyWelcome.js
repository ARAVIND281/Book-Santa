import React, { Component } from 'react';
import db from '../config';
import firebase from 'firebase';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native'

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: false,
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            pincode: '',
            confirmpassword: ''
        };
    }

    
    showModal = () => {
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}
        >
            <View style = {{flex:1, borderRadius:20, backgroundColor:'#ffffff', justifyContent:'center', alignItems:'center'}}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>Register here</Text>
                        <TextInput
                            placeholder='Fist Name'
                            onChangeText={(text) => { this.setState({ firstName: text }) }}
                        />
                        <Text>Last Name</Text>
                        <TextInput
                            placeholder='Last Name'
                            onChangeText={(text) => { this.setState({ lastName: text }) }}
                        />

                        <TextInput
                            placeholder='contact'
                            onChangeText={(text) => { this.setState({ contact: text }) }}
                        />

                        <TextInput
                            placeholder='address'
                            onChangeText={(text) => { this.setState({ address: text }) }}
                            multiline={true}
                        />

                        <TextInput
                            placeholder='pincode'
                            onChangeText={(text) => { this.setState({ pincode: text }) }}
                            keyboardType={"numeric"}
                        />

                        <TextInput keyboardType="email-address"
                            placeholder={"abc@xyz.com"}
                            onChangeText={(text) => { this.setState({ emailId: text }) }}
                            style={styles.textInput}
                        />

                        <TextInput secureTextEntry={true}
                            placeholder={"Password"}

                            onChangeText={(text) => { this.setState({ password: text }) }}
                            style={styles.textInput}
                        />

                        <TextInput secureTextEntry={true}
                            placeholder={"Password"}
                            onChangeText={(text) => { this.setState({ confirmpassword: text }) }}
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                        onPress={() => this.userSignUp(this.state.emailId, this.state.password, this.state.confirmpassword) }>
                            <Text>Sign up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.setState({isModalVisible:false}) }}>
                            <Text>cancel</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Modal>
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword){
            return Alert.alert("passowrd do not match");
        }
        else{            
           firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
                db.collection('user').add({
                    first_name : this.state.firstName,
                    lastName : this.state.lastName,
                    address : this.state.address,
                    contact : this.state.contact,
                    pincode : this.state.pincode,
                })
                return Alert.alert("User added successfully",
                '',
                [
                    {text:'OK', onPress:()=>this.setState({'isModalVisible':false})}
                ])
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                return Alert.alert(errorMessage);
            });

           
        }
    }

    Login = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then((response) => {
                return Alert.alert("Login successfully")
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            });


    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#58be85', justifyContent: 'center', alignItems: 'center' }}>
               <View>
                {this.showModal()}   
                </View> 
                <View>
                    <Text style={{ color: '#ff4500', fontSize: 20, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>
                        Book Santa
                    </Text></View>

                <View>
                    <TextInput keyboardType="email-address"
                        placeholder="abc@xyz.com"
                        onChangeText={(text) => { this.setState({ emailId: text }) }}
                        style={styles.textInput}
                    />
                    <TextInput secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(text) => { this.setState({ password: text }) }}
                        style={styles.textInput}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        onPress={() => { this.Login(this.state.emailId, this.state.password) }}
                        style = {styles.button}>
                        <Text style={styles.welcomeButtontext}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({isModalVisible:true})
                        console.log(this.state.isModalVisible)}}
                        style = {styles.button}>
                        <Text style={styles.welcomeButtontext}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    textInput: {
        width: 200,
        height: 40,
        margin: 10,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 4,
        fontSize: 20,
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#ffa500',
        margin: 10,
    },
    welcomeButtontext: {
        color: '#3333ff',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',

    },
})