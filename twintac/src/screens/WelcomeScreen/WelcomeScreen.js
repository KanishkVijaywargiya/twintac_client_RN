import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

function mapDispatchToProps(dispatch) {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateName: (name) => dispatch({ type: 'UPDATE_NAME', name }),
    }
}

class WelcomeScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.checkIfLoggedIn();
            this.retrieveUid();
        }, 2000)
    }
    retrieveUid = async () => {
        try {
            const uids = await AsyncStorage.getItem("uid")
            console.log("UIDS IN WELCOME", uids)
            if (uids !== null) {
                console.log("UID IS:", uids)
                this.props.updateUid(uids)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    checkIfLoggedIn = async () => {
        // const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //Navigation to home screen
                this.props.navigation.navigate(
                    'Home',
                );
            } else {
                //navigate to login screen
                this.props.navigation.navigate('LoginStackNavigator');
            }
        });
    };
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/images/splashscreen.png')} />
        )
    }
}

export default connect(null, mapDispatchToProps)(WelcomeScreen);