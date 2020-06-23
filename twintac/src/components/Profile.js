import React, { Component } from 'react'
import styled from 'styled-components';
import { Text, SafeAreaView, Animated, Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, ImageBackground, TextInput, View, Alert, ScrollView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import colors from '../assets/colors/Colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form, Item, Input, Textarea, Label } from 'native-base';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let ScreenWidth = Dimensions.get('window').width - 30;
let ScreenHeight = Dimensions.get('window').height;

function mapStateToProps(state) {
    return { action: state.action, uid: state.uid }
}
function mapDispatchToProps(dispatch) {
    return {
        closeProfile: () => dispatch({ type: 'CLOSE_PROFILE' }),
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
    }
}

class Profile extends Component {

    state = {
        top: new Animated.Value(ScreenHeight),
        fullName: '',
        email: '',
        phone: '',
        address: '',
        age: '',
        qualification: '',
        collegeName: '',
        fieldOfInterest: '',
    }
    componentDidMount() {
        this.retrieveData();
        this.retrieveUid();
    }
    componentDidUpdate() {
        this.toggleProfile();
        this.retrieveUid();
    }
    toggleProfile = () => {
        if (this.props.action == 'openProfile') {
            Animated.spring(this.state.top, { toValue: 0, duration: 500 }).start();
        }
        if (this.props.action == 'closeProfile') {
            Animated.spring(this.state.top, { toValue: ScreenHeight, duration: 0 }).start();
        }
    }
    retrieveUid = async () => {
        try {
            const uids = await AsyncStorage.getItem("uid")
            if (uids !== null) {
                console.log("UID IS:", uids)
                this.props.updateUid(uids)
            }
        } catch (error) {
            console.log(error);
        }
    }
    retrieveData = () => {
        let data = firebase.database().ref(`users/${this.props.uid}`).once('value', (snapshot) => {
            console.log('Hey Data please come from firebase:: ', snapshot.val());
            if (data !== null) {

                let bunchOfData = snapshot.val()
                let fullName = bunchOfData.fullName ? bunchOfData.fullName : '';
                let email = bunchOfData.email ? bunchOfData.email : '';
                let phone = bunchOfData.phone ? bunchOfData.phone : '';
                let address = bunchOfData.address ? bunchOfData.address : '';
                let age = bunchOfData.age ? bunchOfData.age : '';
                let qualification = bunchOfData.qualification ? bunchOfData.qualification : '';
                let collegeName = bunchOfData.collegeName ? bunchOfData.collegeName : '';
                let fieldOfInterest = bunchOfData.fieldOfInterest ? bunchOfData.fieldOfInterest : '';

                console.log('Hi Data ur welcomed:: ', snapshot.val().age);
                this.setState({
                    fullName: fullName, email: email, phone: phone, address: address, age: age, qualification: qualification, collegeName: collegeName, fieldOfInterest: fieldOfInterest
                })
            } else {
                console.log(console.error());
            }
        })
    }
    FirebaseAdd = () => {
        firebase.database().ref(`users/`).child(this.props.uid).update({ fullName: this.state.fullName, email: this.state.email, phone: this.state.phone, address: this.state.address, age: this.state.age, qualification: this.state.qualification, collegeName: this.state.collegeName, fieldOfInterest: this.state.fieldOfInterest });
        console.log("uidNum", this.props.uid);
        Alert.alert("Profile Updated...")
    }

    closeProfile = () => {
        this.props.closeProfile();
    }
    render() {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <ImageBackground style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 99 }} source={require('../assets/images/profile.png')} />

                <TouchableOpacity onPress={this.props.closeProfile} style={{ position: "absolute", top: Platform.OS === 'ios' ? 40 : 10, alignItems: 'center', alignSelf: 'center', zIndex: 100 }}>
                    <CloseButton>
                        <Ionicons name="ios-close" size={44} color="#546bfb" />
                    </CloseButton>
                </TouchableOpacity>

                <Wrapper >
                    <Logo source={require('../assets/images/pic.png')} />
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Keyboard.dismiss;
                        }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, height: 1000 }}>
                            <Form style={{ flex: 1 }}>
                                <Item stackedLabel>
                                    <Label>Full Name</Label>
                                    <Input
                                        autoCapitalize='none'
                                        placeholder='Full Name'
                                        keyboardType='default'
                                        placeholderTextColor='#3C4560'
                                        value={this.state.fullName}
                                        editable={false}
                                        numberOfLines={1}
                                        onChangeText={fullName => this.setState({ fullName })}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Email</Label>
                                    <Input
                                        autoCapitalize='none'
                                        placeholder='Email'
                                        keyboardType='default'
                                        placeholderTextColor='#3C4560'
                                        value={this.state.email}
                                        editable={false}
                                        numberOfLines={1}
                                        onChangeText={email => this.setState({ email })}
                                    />
                                </Item>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Item stackedLabel style={{ flex: 0.7 }}>
                                        <Label>Phone</Label>
                                        <Input
                                            autoCapitalize='none'
                                            placeholder='Phone'
                                            keyboardType='default'
                                            placeholderTextColor='#3C4560'
                                            value={this.state.phone}
                                            editable={false}
                                            numberOfLines={1}
                                            onChangeText={phone => this.setState({ phone })}
                                        />
                                    </Item>
                                    <Item stackedLabel style={{ flex: 0.3 }}>
                                        <Label>Age</Label>
                                        <Input
                                            autoCapitalize='none'
                                            placeholder='Age'
                                            keyboardType='default'
                                            maxLength={2}
                                            placeholderTextColor='#3C4560'
                                            value={this.state.age}
                                            numberOfLines={1}
                                            onChangeText={age => this.setState({ age })}
                                        />
                                    </Item>
                                </View>
                                <Item stackedLabel>
                                    <Label>Address</Label>
                                    <Input
                                        autoCapitalize='none'
                                        placeholder='Address'
                                        keyboardType='default'
                                        placeholderTextColor='#3C4560'
                                        value={this.state.address}
                                        numberOfLines={1}
                                        maxLength={35}
                                        onChangeText={address => this.setState({ address })}
                                    />
                                </Item>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Item stackedLabel style={{ flex: 1 }}>
                                        <Label>Qualification</Label>
                                        <Input
                                            autoCapitalize='none'
                                            placeholder='Qualification'
                                            keyboardType='default'
                                            placeholderTextColor='#3C4560'
                                            value={this.state.qualification}
                                            numberOfLines={1}
                                            maxLength={20}
                                            onChangeText={qualification => this.setState({ qualification })}
                                        />
                                    </Item>
                                    <Item stackedLabel style={{ flex: 1 }}>
                                        <Label>College</Label>
                                        <Input
                                            autoCapitalize='none'
                                            placeholder='College Name'
                                            keyboardType='default'
                                            placeholderTextColor='#3C4560'
                                            value={this.state.collegeName}
                                            numberOfLines={1}
                                            maxLength={18}
                                            onChangeText={collegeName => this.setState({ collegeName })}
                                        />
                                    </Item>
                                </View>
                                <Item stackedLabel>
                                    <Label>Field of Interest</Label>
                                    <Input
                                        autoCapitalize='none'
                                        placeholder='Field of Interest'
                                        keyboardType='default'
                                        placeholderTextColor='#3C4560'
                                        value={this.state.fieldOfInterest}
                                        numberOfLines={1}
                                        onChangeText={fieldOfInterest => this.setState({ fieldOfInterest })}
                                    />
                                </Item>
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.FirebaseAdd()}>
                                    <Cover>
                                        <Text style={{ color: '#fff' }}> SAVE </Text>
                                    </Cover>
                                </TouchableOpacity>
                                <TouchableWithoutFeedback onPress={() => { Linking.openURL('mailto:twintac@yahoo.com') }}>
                                    <View style={{ marginTop: hp('2%'), alignSelf: 'center', flexDirection: 'row', borderColor: colors.secondary, borderWidth: hp('0.3%'), borderRadius: 25, height: 50, width: 180, }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Ionicons name='ios-mail' size={35} color={colors.primary} style={{ paddingLeft: hp('3%') }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', paddingLeft: hp('1.6%'), alignItems: 'center' }}>
                                            <Text style={{ fontSize: hp('1.6%'), fontWeight: 'bold', color: colors.primary }}>Contact Us</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ height: 800 }} />
                            </Form>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </Wrapper>
            </AnimatedContainer>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);


const Container = styled.View`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:100;
    background: #f0f3f5; 
    `;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const CloseButton = styled.View`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.View`
    margin-top:16px;
    align-self:center;
    width:${ScreenWidth};
    z-index:100;
    position:absolute;
    top:${Platform.OS === 'ios' ? hp('10%') : hp('10%')};
`;
const Logo = styled.Image`
    width:100px;
    height:100px;
    align-self:center;
    justify-content:center;
`;
const Cover = styled.View`
    margin-top: 20px;
    width:100px;
    height:40px;
    align-items:center;
    justify-content:center;
    background:${colors.primary};
    font-size:50px;
    font-weight:700;
    border-radius:20px;
    shadow-color: ${colors.primary};
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.8;
    shadow-radius: 2;
    elevation: 1;
    border-color:${colors.primary};
`;