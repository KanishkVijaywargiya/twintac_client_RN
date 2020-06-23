import React, { Component } from 'react';
import { View, SafeAreaView, Dimensions, TouchableOpacity, Alert, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from "styled-components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../assets/colors/Colors.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading.js';
import Success from '../../components/Success.js';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return {
        uid: state.uid,
        fullName: state.fullName,
        email: state.email,
        phone: state.phone
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateName: (fullName) => dispatch({ type: 'UPDATE_NAME', fullName }),
        updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),
        updatePhone: (phone) => dispatch({ type: 'UPDATE_PHONE', phone })
    }
}

class SignUpScreen extends Component {

    state = {
        fullName: '',
        email: '',
        phone: '',
        password: '',
        conformPassword: '',
        isSuccessful: false,
        isLoading: false,
        token: ""
    }
    retrieveUid = async () => {
        try {
            const uids = await AsyncStorage.getItem("uid")
            if (uids !== null) {
                console.log("UID IS:", uids)
                this.setState({ token: uids })
                this.props.updateUid(uids)
            }
        } catch (error) {
            console.log(error);
        }
    }

    storeData = async (uid, uidtoken) => {
        try {
            await AsyncStorage.setItem(uid, uidtoken)
        } catch (e) {
            // saving error
        }
    }

    onSignUp = async () => {
        console.log("DATA: ", this.state.email, this.state.password, this.state.fullName, this.state.phone, this.state.conformPassword);
        const fullName = this.state.fullName
        const email = this.state.email
        const phone = this.state.phone
        const password = this.state.password
        const conformPassword = this.state.conformPassword
        if (email && password && fullName && phone && conformPassword) {
            if (password == conformPassword) {
                this.setState({ isLoading: true })
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .catch((error) => {
                        Alert.alert("Error", error.message)
                        Keyboard.dismiss();
                    })
                    .then(response => {
                        Keyboard.dismiss()
                        console.log("RESPONSE", response);

                        const user = firebase.database().ref('users/').child(response.user.uid).set({ email: response.user.email, uid: response.user.uid, fullName: this.state.fullName, phone: this.state.phone });

                        this.storeData("uid", response.user.uid)
                        // AsyncStorage.setItem("uid", response.user.uid)
                        this.props.updateUid(response.user.uid)
                        this.props.updateName(this.state.fullName)
                        this.props.updateEmail(response.user.email)
                        this.props.updatePhone(this.state.phone)

                        this.setState({ isLoading: false, isSuccessful: true, fullName: '', email: '', phone: '', password: '', conformPassword: '' });
                        setTimeout(() => {
                            this.setState({ isSuccessful: false })
                            Alert.alert('Congrats', "You've logged in Successfully!");
                            this.props.navigation.navigate('HomeScreen');

                            console.log('Data storing in redux:: ', this.props.uid, this.props.name, this.props.email, this.props.phone);

                        }, 2000)
                    })
            } else {
                Alert.alert("Please Check you Password.....!")
            }
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
                            <Title>Let's Get Started!</Title>
                            <SubTitle>Create an account to Twintac to get all features</SubTitle>
                        </ContainerOne>
                        <ContainerTwo>
                            <EmailImage>
                                <Ionicons name='ios-person' size={30} color={colors.primary} />
                            </EmailImage>
                            <TextInput
                                autocapitalize='none'
                                placeholder='Full name'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                onChangeText={fullName => this.setState({ fullName })}
                                value={this.state.fullName}
                            />
                        </ContainerTwo>
                        <ContainerThree>
                            <EmailImage>
                                <Ionicons name='ios-mail' size={30} color={colors.primary} />
                            </EmailImage>
                            <TextInput
                                autocapitalize='none'
                                placeholder='Email'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                keyboardType='email-address'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                        </ContainerThree>
                        <ContainerFour>
                            <EmailImage>
                                <Ionicons name='ios-phone-portrait' size={30} color={colors.primary} />
                            </EmailImage>
                            <TextInput
                                autocapitalize='none'
                                placeholder='Phone'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                maxLength={10}
                                keyboardType='numeric'
                                onChangeText={phone => this.setState({ phone })}
                                value={this.state.phone}
                            />
                        </ContainerFour>
                        <ContainerFour>
                            <EmailImage>
                                <Ionicons name='ios-lock' size={30} color={colors.primary} />
                            </EmailImage>
                            <TextInput
                                autocapitalize='none'
                                placeholder='Password'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                        </ContainerFour>
                        <ContainerFour>
                            <EmailImage>
                                <Ionicons name='md-lock' size={30} color={colors.primary} />
                            </EmailImage>
                            <TextInput
                                autocapitalize='none'
                                placeholder='Conform password'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                secureTextEntry
                                onChangeText={conformPassword => this.setState({ conformPassword })}
                                value={this.state.conformPassword}
                            />
                        </ContainerFour>
                        <Cover>
                            <TouchableOpacity onPress={() => this.onSignUp()}>
                                <ContainerFive>
                                    <Text>CREATE</Text>
                                </ContainerFive>
                            </TouchableOpacity>
                        </Cover>
                        {Platform.OS === 'android' ?
                            <ContainerAndroid>
                                <TextAccount>Already have an account? </TextAccount>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}><TextSignup>Log In</TextSignup></TouchableOpacity>
                            </ContainerAndroid>
                            :
                            null
                        }
                    </SafeAreaView>
                </KeyboardAwareScrollView>
                {Platform.OS === 'ios' ?
                    <ContainerSix>
                        <TextAccount>Already have an account? </TextAccount>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}><TextSignup>Log In</TextSignup></TouchableOpacity>
                    </ContainerSix>
                    :
                    null
                }
                <Success isActive={this.state.isSuccessful} />
                <Loading isActive={this.state.isLoading} />
            </RootView>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)

const RootView = styled.View`
    flex:1;
    background:${colors.white};
`;
const ContainerOne = styled.View`
    align-items:center;
    margin-top: ${Platform.OS === 'ios' ? hp('3%') : hp('0.5%')};
    /* margin-top:40px; */
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
const ContainerTwo = styled.View`
    flex-direction:row;
    align-items:center;
    margin-top:${Platform.OS === 'ios' ? hp('5%') : hp('3%')};
    height:60px;
    border-radius:30px;
    border-width:1px;
    border-color:${colors.primary};
    align-self: center;
    width:${Dimensions.get('window').width - 30};
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
`;
const ContainerSix = styled.View`
    position:absolute;
    align-items:center;
    padding-left:20px;
    bottom:${Platform.OS === 'ios' ? hp('3%') : hp('1%')};
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
