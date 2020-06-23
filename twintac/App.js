import React, { Component } from 'react';
import { Text, View } from 'react-native';
import TabNavigator from './src/navigator/TabNavigator.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
  action: '',
  uid: '',
  fullName: 'Stranger',
  email: 'abc@xyz.com',
  phone: '',
  address: '',
  age: '',
  qualification: '',
  collegeName: '',
  fieldOfInterest: '',
  avatar: "http://user.marks222.com/uploads/editors/default-avatar.png",
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_PROFILE': return { ...state, action: 'openProfile' };
    case 'CLOSE_PROFILE': return { ...state, action: 'closeProfile' };
    case 'UPDATE_UID': return { ...state, uid: action.uid };
    case 'UPDATE_NAME': return { ...state, fullName: action.name };
    case 'UPDATE_EMAIL': return { ...state, email: action.email };
    case 'UPDATE_PHONE': return { ...state, phone: action.phone };
    case 'UPDATE_ADDRESS': return { ...state, address: action.address };
    case 'UPDATE_AGE': return { ...state, age: action.age };
    case 'UPDATE_QUALIFICATION': return { ...state, qualification: action.qualification };
    case 'UPDATE_COLLEGENAME': return { ...state, collegeName: action.collegeName };
    case 'UPDATE_FIELDOFINTEREST': return { ...state, fieldOfInterest: action.fieldOfInterest };
    default: return state;
  }
}
const store = createStore(reducer, applyMiddleware(loggerMiddleware));

const App = () => (
  <Provider store={store}>
    <TabNavigator />
  </Provider>
)
export default App;
