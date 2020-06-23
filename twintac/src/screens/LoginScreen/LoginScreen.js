import React, { Component } from 'react';
import { View, SafeAreaView, Dimensions, Keyboard, Alert, Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../assets/colors/Colors.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Success from '../../components/Success.js';
import Loading from '../../components/Loading.js';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
    }
}

class LoginScreen extends Component {
    state = {
        email: '',
        password: '',
        isSuccessful: false,
        isLoading: false,
    }
    storeData = async (uid, uidtoken) => {
        try {
            await AsyncStorage.setItem(uid, uidtoken)
        } catch (e) {
            // saving error
        }
    }
    onSignIn = async () => {
        console.log("DATA: ", this.state.email, this.state.password);
        const email = this.state.email
        const password = this.state.password
        if (email && password) {
            this.setState({ isLoading: true })
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    Alert.alert("Error", error.message)
                    Keyboard.dismiss();
                    this.setState({ isLoading: false })
                })
                .then(response => {
                    Keyboard.dismiss()
                    if (response) {
                        console.log("RESPONSE aaja:: ", response);
                        this.storeData("uid", response.user.uid);
                        this.props.updateUid(response.user.uid);
                        this.setState({ isLoading: false, isSuccessful: true, email: '', password: '' });
                        setTimeout(() => {
                            this.setState({ isSuccessful: false })
                            Alert.alert('Congrats', "You've logged in Successfully!");
                            this.props.navigation.navigate('HomeScreen');
                        }, 2000)
                    }
                })
        } else {
            Alert.alert("Please fill the details.....!")
        }
    };
    render() {
        return (
            <RootView>
                <KeyboardAwareScrollView>
                    <SafeAreaView>
                        <ContainerOne>
                            <Image source={require('../../assets/images/loginLogo.png')} />
                        </ContainerOne>
                        <ContainerTwo>
                            <Title>Welcome</Title>
                            <SubTitle>Log in to your existed account of Twintac</SubTitle>
                        </ContainerTwo>
                        <ContainerThree>
                            <EmailImage>
                                <Ionicons name='ios-mail' size={30} color={colors.primary} />
                            </EmailImage>
                            <TextInput
                                autocapitalize='none'
                                placeholder='Email'
                                placeholderTextColor="#3C4560"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                opacity={0.5}
                            />
                        </ContainerThree>
                        <ContainerFour>
                            <EmailImage>
                                <Ionicons name='ios-lock' size={30} color={colors.primary} />
                            </EmailImage>
                            <TextInput
                                autocapitalize='none'
                                placeholder='Password'
                                placeholderTextColor="#3C4560"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry
                                opacity={0.5}
                            />
                        </ContainerFour>
                        <Cover>
                            <TouchableOpacity onPress={() => this.onSignIn()}>
                                <ContainerFive>
                                    <Text>LOG IN</Text>
                                </ContainerFive>
                            </TouchableOpacity>
                        </Cover>
                        {Platform.OS === 'android' ?
                            <ContainerAndroid>
                                <TextAccount>Don't have an account? </TextAccount>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen')}><TextSignup>Sign Up</TextSignup></TouchableOpacity>
                            </ContainerAndroid>
                            :
                            null
                        }
                    </SafeAreaView>
                </KeyboardAwareScrollView>
                {Platform.OS === 'ios' ?
                    <ContainerSix>
                        <TextAccount>Don't have an account? </TextAccount>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen')}><TextSignup>Sign Up</TextSignup></TouchableOpacity>
                    </ContainerSix>
                    :
                    null
                }
                <Success isActive={this.state.isSuccessful} />
                <Loading isActive={this.state.isLoading} />
            </RootView >
        )
    }
}
export default connect(null, mapDispatchToProps)(LoginScreen);

const RootView = styled.View`
    flex:1;
    background:${colors.white};
`;
const ContainerOne = styled.View`
    height:200px;
    align-items:center;
`;
const Image = styled.Image`
    position:absolute;
    top:30px;
    height:80%;
    width:50%;
`;
const ContainerTwo = styled.View`
    align-items:center;
    margin-top:${Platform.OS === 'ios' ? hp('3%') : hp('0.5%')};
`;
const Title = styled.Text`
    font-size:30px;
    font-weight:bold;
`;
const SubTitle = styled.Text`
    font-size:12px;
    font-weight:500;
    color:rgba(0,0,0,0.4);
`;
const ContainerThree = styled.View`
    flex-direction:row;
    align-items:center;
    margin-top:${Platform.OS === 'ios' ? hp('3%') : hp('3%')};
    height:60px;
    border-radius:30px;
    border-width:1px;
    border-color:${colors.primary};
    align-self: center;
    width:${Dimensions.get('window').width - 30};
`;
const EmailImage = styled.View`
    flex:0.2;
    align-items:center;
`;
const TextInput = styled.TextInput`
    flex:0.8;
    font-size:22px;
    color: ${colors.primary};
`;
const ContainerFour = styled.View`
    flex-direction:row;
    align-items:center;
    margin-top:${Platform.OS === 'ios' ? hp('3%') : hp('3%')};
    height:60px;
    border-radius:30px;
    border-width:1px;
    border-color:${colors.primary};
    align-self: center;
    width:${Dimensions.get('window').width - 30};
`;
const Cover = styled.View`
    align-self: center;
    align-items:center;
    justify-content:center;
    margin-top:${Platform.OS === 'ios' ? hp('5%') : hp('3%')};
    height:50px;
    width:${Dimensions.get('window').width};
`;
const ContainerFive = styled.View`
    align-self: center;
    align-items:center;
    justify-content:center;
    background:${colors.primary};
    height:50px;
    border-radius:25px;
    border-width:1px;
    border-color:${colors.primary};
    width:${Dimensions.get('window').width - 250};
    shadow-color: ${colors.black};
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.8;
    shadow-radius: 2;
    elevation: 1;
    /* box-shadow:5px 3px 15px rgba(60, 64, 198, 0.2); */
`;
const Text = styled.Text`
    color:${colors.white};
    font-size:22px;
`;
const ContainerAndroid = styled.View`
    align-items:center;
    padding-left:20px;
    flex-direction: row;
    justify-content:center;
    /* padding-top:hp('5%'); */
`;
const ContainerSix = styled.View`
    position:absolute;
    align-items:center;
    padding-left:20px;
    bottom:30px;
    right:0;
    left:0;
    flex-direction: row;
    justify-content:center;
`;
const TextAccount = styled.Text`
    color:${colors.black};
    font-size:16px;
`;
const TextSignup = styled.Text`
    color:${colors.primary};
    font-size:16px;
    font-weight:700
`;