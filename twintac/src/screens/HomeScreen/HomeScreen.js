import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native'
import styled from 'styled-components'
import colors from '../../assets/colors/Colors';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileButton from '../../components/ProfileButton.js';
import Profile from '../../components/Profile.js';
// import { Card, CardItem, Content, Body } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Cardssss from '../../components/Cardssss.js';


function mapStateToProps(state) {
    return { uid: state.uid, fullName: state.name }
}
function mapDispatchToProps(dispatch) {
    return {
        openProfile: () => dispatch({ type: 'OPEN_PROFILE' }),
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateName: (name) => dispatch({ type: 'UPDATE_NAME', name }),
        updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),
        updatePhone: (phone) => dispatch({ type: 'UPDATE_PHONE', phone })
    }
}
class HomeScreen extends Component {
    state = {
        name: '',
        companyList: []
    }
    componentDidMount() {
        this.retrieveUid();
        this.retrieveData();
        this.companyListCominigFromFirebase();
    }
    componentDidUpdate() {
        this.retrieveUid()
    }
    signOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('WelcomeScreen')
        // firebase.database().ref(`users/`).child(uidNum).update({ age: '20', collegeName: 'REVA University' });
        AsyncStorage.clear();
        console.log("uidNum", this.props.uid);
    }
    retrieveUid = async () => {
        try {
            const uids = await AsyncStorage.getItem("uid")
            if (uids !== null) {
                console.log("UID IS:", uids)
                this.props.updateUid(uids)
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    retrieveData = async () => {
        let data = firebase.database().ref(`users/${this.props.uid}`).once('value', (snapshot) => {
            console.log('Hey Data please come from firebase:: ', snapshot.val());
            if (data !== null) {
                let bunchOfData = snapshot.val()
                let fullName = bunchOfData.fullName ? bunchOfData.fullName : '';
                console.log('Hi Data ur welcomed:: ', snapshot.val().age);
                this.setState({ name: fullName })
            } else {
                console.log(console.error());
            }
        })
    }
    // FirebaseAdd = () => {
    //     firebase.database().ref(`users/`).child(this.props.uid).update({ age: '20', collegeName: 'REVA University' });
    //     console.log("uidNum", this.props.uid);
    // }
    companyList = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.companyList}
                renderItem={this.renderItem}
                ListEmptyComponent={this.listEmptyView}
                keyExtractor={(item, index) => item.company.toString()}
            />
        )
    }
    renderItem = ({ item, index }) => {
        return (
            <Cardssss
                post={item.post.length < 25 ? item.post : `${item.post.substring(0, 24)}...`}
                company={item.company.length < 25 ? item.company : `${item.company.substring(0, 24)}...`}
                rating={item.rating}
                exp={item.exp}
                location={item.location}
                desc={item.desc.length < 60 ? item.desc : `${item.desc.substring(0, 60)}...`}
                pushTo={() => this.props.navigation.push('DetailScreen', { content: item })}
            />
        )
    }
    listEmptyView = () => {
        return (
            <View style={{ alignItems: "center", justifyContent: 'center' }}>
                <Text>Twintac</Text>
            </View>
        )
    }

    companyListCominigFromFirebase = async () => {
        var self = this;
        var companyList = await firebase.database().ref('company/').on('value', dataSnapshot => {
            let val = dataSnapshot.val();
            if (val !== null) {
                let companyList = Object.values(val);
                this.setState({ companyList })
                self.updateList(companyList.reverse())
            } else {
                self.updateList('')
            }
            console.log('company list data please come from firebase:: ', this.state.companyList);
        })
    }
    updateList = (companyList) => {
        this.setState({ companyList: companyList })
    }

    render() {
        console.log("UIDSSSS", this.props.uid);
        return (
            <View style={{ flex: 1 }}>
                <Profile />
                <Container>
                    <SafeAreaView>
                        <TitleBar>
                            <Title> Welcome Back, </Title>
                            <Name> {this.state.name}</Name>
                            <TouchableOpacity onPress={() => this.props.openProfile()} style={{ position: "absolute", right: 20, top: 5 }}>
                                <ProfileButton />
                            </TouchableOpacity>
                        </TitleBar>
                        <TouchableOpacity onPress={() => this.signOut()}>
                            <Cover>
                                <Text style={{ color: '#fff' }}> SignOut </Text>
                            </Cover>
                        </TouchableOpacity>
                        <SubTitle>Companies</SubTitle>
                        <View style={{ height: '100%' }}>
                            {this.companyList()}
                        </View>
                    </SafeAreaView>
                </Container>
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

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
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const TitleBar = styled.View`
    width: 100%;
    margin-top: 50px;
    padding-left: 10px;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const SubTitle = styled.Text`
    color: #b8bece;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 15px;
    margin-left: 20px;
    margin-top: 10%;
    margin-bottom: ${hp('3%')};
`;