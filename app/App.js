/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main from './components/Main';
import settings from './settings';
import Meteor from 'react-native-meteor';
Meteor.connect(settings.METEOR_URL);

export default class App extends Component<{}> {
  render() {
    return (
      <Main />
    );
  }
}
