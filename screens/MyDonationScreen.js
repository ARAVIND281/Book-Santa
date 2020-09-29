import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
    constructor() {
        super();
        this.state = {
            donorId: firebase.auth().currentUser.email,
            donorName: '',
            allDonations: []
        }
        this.requestRef = null
    }

    getDonorDetails = (userId) => {
        db.collection("users").where('email_id', '==', userId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        donorName: doc.data().first_name + " " + doc.data().last_name
                    })
                })
            })
    }

    getAllDonations = () => {
        this.requestRef = db.collection("all_donations").where("donor_id", "==", this.state.donorId)
            .onSnapshot((snapshot) => {
                var allDonations = snapshot.docs.map(doc => doc.data())
                this.setState({
                    allDonations: allDonations
                });
            })
    }

    sendBook = (bookDetails) => {
        if (bookDetails.request_status === "Book Sent") {
            var requestStatus = "Donor Interested"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "request_status": "Donor Interested"
            })
            this.sendNotification(bookDetails, requestStatus)
        }
        else {
            var requestStatus = "Book Sent"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "request_status": "Book Sent"
            })
            this.sendNotification(bookDetails, requestStatus)
        }
    }

    sendNotification = (bookDetails, requestStatus) => {
        var requestId = bookDetails.request_Id
        var donorId = bookDetails.donor_id
        db.collection("all_notifications")
            .where("request_id", "==", requestId)
            .where("donor_id", "==", donorId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var message = ''
                    if (requestStatus === 'Book Sent') {
                        message = this.state.donorName + "sent you book"
                    }
                    else {
                        message = this.state.donorName + "has shown interest in donating the book"
                    }
                    db.collection("all_notifications").doc(doc.id).update({
                        "date": firebase.firestore.FieldValue.serverTimestamp(),
                        "notification_status": "unread",
                        "message": message
                    })
                })
            })
    }
    keyExtractor = (item, index) => index.toString()


    renderItem = ({ item, i }) => {
        <ListItem
            key={i}
            title={item.book_name}
            subtitle={"Requested By : " + item.requested_by + "\nStatus : " + item.request_status}
            leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
            titleStyle={{ color: "black", fontWeight: "bold" }}
            rightElement={
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor: item.request_status === "Book Sent" ? "#00ff00" : "#ffcc00"
                        }]}
                        onPress = {()=>{
                            this.sendBook(item)
                        }}
                >
                    <Text>
                        {item.request_status === "Book Sent" ? "Book Sent" : "Send Book"}
                    </Text>
                </TouchableOpacity >
            }
        />

    }
    componentDidMount(){
        this.getDonorDetails(this.state.donorId);
        this.getAllDonations();
    }
    render() {
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="My Donations" />
                <View>
                    <FlatList
                        data={this.state.allDonations}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 8
        },

    }
})