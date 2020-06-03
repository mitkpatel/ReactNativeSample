import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ToastAndroid } from 'react-native'
import ApiContainer from './ApiContainer'
import StackNavigator from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'
import {Keyboard} from 'react-native'

class LoginView extends Component {
   static navigationOptions = {
    title: 'First',
  }
   state = {
      email: ' ',
      password: ' ',
      toast: null
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (email, pass) => {
      alert('email: ' + email + ' password: ' + pass)
   }

    goForFetch = (email, pass) => {
        this.setState({
            fromFetch: true,
            loading: true,

        })
        //const {navigate} = this.props.navigation;
        fetch('http://115.124.111.239:8069/web/session/authenticate', {
        method: 'POST', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "call",
            "params": {
            "db": "zota_odoo",
            "login": email,
            "password": pass
        }

        }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if(responseJson.result == null) {
              alert("Invalid credentails" );
          } else {
             alert("Successfully Login")
          //  console.log(responseJson.result);
          //  navigate('ApiContainer');
             console.log(responseJson.result);
             Keyboard.dismiss();
            this.toast.show("Company name and ID:"+responseJson.result.user_companies.current_company, DURATION.FOREVER);
           // Toast.show('hello world!', DURATION.FOREVER);
          }
        })
        .catch((error) => {
            console.log("Error occur:" +error);
         });
    }
    
   render() {
      return (
         <View style = {styles.container}>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => this.goForFetch(this.state.email, this.state.password) }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

            <Toast ref={ref => { this.toast = ref; }} />
         </View>
      )
   }
}
export default LoginView

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})