import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native'
import styled from 'styled-components'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../assets/colors/Colors';

export default class DetailScreen extends Component {
    render() {
        const { navigation } = this.props;
        const detail = navigation.state.params.content;
        return (
            <Container>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: Platform.OS === 'ios' ? hp('5%') : hp('8%'), padding: hp('2%'), alignSelf: 'center', width: '100%', height: '100%', }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>{detail.post}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ zIndex: 100 }}>
                            <CloseButton>
                                <Ionicons name="ios-close" size={44} color="#546bfb" />
                            </CloseButton>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('2%'), }}>
                        <Text style={{ color: '#A4B0BD', fontSize: hp('2.4%'), fontWeight: 'bold' }}>{detail.company}</Text>
                    </View>
                    <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                        <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-briefcase' size={22} color='#0A79DF' />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('2%') }}>
                            <Text>{detail.exp} Yrs</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                        <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' size={22} color='#EA425C' />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('2%') }}>
                            <Text>{detail.location}</Text>
                        </View>
                    </View>
                    <SubTitle>Job Details</SubTitle>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-paper' size={22} color='#45CE30' />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('2%'), paddingRight: hp('1%') }}>
                            <Text style={{ fontSize: hp('2.4%'), textAlign: "justify", width: 300 }}>Role and Responsibilities:{'\t'} {detail.desc}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ alignSelf: 'center', margin: hp('3%'), marginTop: hp('5%') }} onPress={() => Alert.alert('Applied')}>
                        <Cover>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', textTransform: 'uppercase', color: '#fff' }}> Apply Now </Text>
                        </Cover>
                    </TouchableOpacity>
                    <View style={{ height: 150 }} />
                </ScrollView>
            </Container>
        )
    }
}

const Container = styled.View`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:100;
    background: #f0f3f5; 
`;

const CloseButton = styled.View`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`;
const SubTitle = styled.Text`
    color: #b8bece;
    text-transform: uppercase;
    font-weight: 600;
    font-size: ${hp('2%')};
    margin-left: 20px;
    margin-top: 10%;
    margin-bottom: ${hp('3%')};
`;
const Cover = styled.View`
    margin-top: 20px;
    width:${hp('40%')};
    height:50px;
    align-items:center;
    justify-content:center;
    background:${colors.primary};
    font-size:50px;
    font-weight:700;
    border-radius:30px;
    shadow-color: ${colors.primary};
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.8;
    shadow-radius: 2;
    elevation: 1;
    border-color:${colors.primary};
`;