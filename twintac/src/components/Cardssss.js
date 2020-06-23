import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Cardssss = ({ post, company, rating, exp, location, desc, pushTo }) => {
    return (
        <TouchableOpacity onPress={pushTo}>
            <Card style={{ width: '95%', borderRadius: 5, alignSelf: 'center', paddingBottom: hp('2%'), paddingTop: hp('1.5%') }}>
                <View style={{ marginLeft: hp('2%'), }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>{post}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: hp('2%'), }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: hp('1.6%'), fontWeight: '600' }}>{company}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ paddingRight: hp('1%') }}>{rating}</Text>
                        <Ionicons name='ios-star' size={22} color='#FFD700' style={{ paddingRight: hp('2%') }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 25, height: 25, justifyContent: 'center', marginLeft: hp('2%'), alignItems: 'center' }}>
                        <Ionicons name='ios-briefcase' size={22} color='#3C4560' />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('2%') }}>
                        <Text>{exp} Yrs</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 25, height: 25, justifyContent: 'center', marginLeft: hp('2%'), alignItems: 'center' }}>
                        <Ionicons name='ios-pin' size={22} color='#3C4560' />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('2%') }}>
                        <Text>{location}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 25, height: 25, justifyContent: 'center', marginLeft: hp('2%'), alignItems: 'center' }}>
                        <Ionicons name='ios-paper' size={22} color='#3C4560' />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('2%'), paddingRight: hp('1%') }}>
                        <Text style={{ width: 300 }}>Role and Responsibilities:{'\t'} {desc}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}
export default Cardssss;