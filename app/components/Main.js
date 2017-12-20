import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {StackNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';

const MyNavigator = (signedIn) => {
    return StackNavigator({
      Login: { screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
          header:null,
        }),
      },
      Home: { screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
              title:'Jobs',
              headerLeft:null,
            }),
          }
    },{
      mode: "modal",
    initialRouteName: signedIn ? "Home" : "Login"
    }
  );
}

export default class Main extends Component {
  constructor(props){
  super(props);
  this.state={
    user_id:null,
  }
}

  componentWillMount(){
  AsyncStorage.getItem('user_id', (err, result) => {
    if (result) {
      this.setState({user_id:true})
    }else {
      this.setState({user_id:false})
    }
  })
}

  render() {
    if (this.state.user_id == null) {
        return null ;
      }
    const Layout = MyNavigator(this.state.user_id);
	  return (
      <Layout />
	  );
	}
}
