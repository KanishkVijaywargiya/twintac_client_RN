import React, { Component } from 'react';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen.js';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen.js';
import HomeScreen from '../screens/HomeScreen/HomeScreen.js';
import DetailScreen from '../screens/DetailScreen/DetailScreen.js';
import Profile from '../components/Profile.js';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LottieTest from '../LottieTest.js';
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../config/Config.js';

const LoginStackNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    SignUpScreen: {
        screen: SignUpScreen,
        navigationOptions: {
            header: null
        }
    }
}, { mode: 'modal' })

const Home = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    DetailScreen: {
        screen: DetailScreen,
        navigationOptions: {
            header: null
        }
    }
}, { mode: 'modal' })

const AppSwitchNavigator = createSwitchNavigator({
    WelcomeScreen: WelcomeScreen,
    // LottieTest: LottieTest
    LoginStackNavigator,
    Home
});
const AppContainer = createAppContainer(AppSwitchNavigator);

class TabNavigator extends Component {
    constructor() {
        super();
        this.initializeFirebase();
    }
    initializeFirebase = () => {
        firebase.initializeApp(firebaseConfig);
    };
    render() {
        return (
            <AppContainer />
        )
    }
}
export default TabNavigator;






