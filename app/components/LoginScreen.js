import React, { Component, PropTypes } from 'react';
import { View, Image, StyleSheet, Text ,Dimensions ,KeyboardAvoidingView,ScrollView,ToastAndroid,AsyncStorage} from 'react-native';
import Form from './Form';
import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import bgSrc from '../images/wallpaper.png';
import logoImg from '../images/logo.png';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import Meteor from 'react-native-meteor';

export default class LoginScreen extends Component {
	static navigationOptions = {
	 header:null,
 }
 constructor(props) {
	 super(props);
	 this.state = {
		 showPass: true,
		 press: false,
		 condition: true,
		 name:'',
		 email:'',
		 number:'',
		 password:'',
		 cpassword:'',
	 };
 }
 changeForm(){
	 this.setState({condition:!this.state.condition})
 }
 showPass() {
 this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
 }
	onChangeText(field,text){
		let object = {};
  object[field] = text;
  this.setState(object);
	}
	loginSubmit(){
			const email =this.state.email.trim();
			const password = this.state.password.trim();

			if (email === '') {
				ToastAndroid.show('Email field is empty', ToastAndroid.SHORT);
				return false;
			}
			if (password === '') {
				ToastAndroid.show('Password field is empty', ToastAndroid.SHORT);
				return false;
			}

					Meteor.call('user.check',email,password,(err,res)=>{
						if (res) {
						 AsyncStorage.setItem('user_id',res._id);
						 this.props.navigation.navigate('Home')
						}else {
							ToastAndroid.show('Wrong Email and Password', ToastAndroid.SHORT);
							this.setState({
							 password:'',
							});
						}
					}
					)
	}

	signupSubmit(){
		const name = this.state.name.trim();
		const email =this.state.email.trim();
		const number = this.state.number.trim();
		const password = this.state.password.trim();
		const cpassword = this.state.cpassword.trim();

		if (name === '') {
			ToastAndroid.show('Name field is empty', ToastAndroid.SHORT);
			return false;
		}
		if (email === '') {
				ToastAndroid.show('Email field is empty', ToastAndroid.SHORT);
			return false;
		}
		if (number === '') {
				ToastAndroid.show('Number field is empty', ToastAndroid.SHORT);
			return false;
		}

		if (password === cpassword && password != '' && cpassword != '') {
			Meteor.call('user.check',email,password,(err,res)=>{
				if (res) {
					ToastAndroid.show('User Already Exists', ToastAndroid.SHORT);
				}else {
					const user={
						name,email,number,password,image:'',lat:'',long:'',addr:'',country:'',states:'',city:'',pc:'',
					}
						Meteor.call('user.insert',user,(error1,result1)=>{
							if (error1) {

							}
							if (result1) {
								ToastAndroid.show('Registeration Successfull Now Login', ToastAndroid.SHORT);
								this.setState({
									password:'',
									cpassword:'',
									name:'',
									number:'',
									condition:true,
								})
							}
						})
				}
			})
		}else {
				ToastAndroid.show(`password doesn't match`, ToastAndroid.SHORT);
		}

	}
	render() {
		const { navigate } = this.props.navigation;
		return (
				<View style={{display:'flex',flex:1,flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
				<Image style={styles.picture} source={bgSrc}/>
				<ScrollView>

				<View style={styles.logocontainer}>
					<Image source={logoImg} style={styles.logoimage} />
					<Text style={styles.logotext}>KAAM</Text>
				</View>


					{this.state.condition ?
						<View >
					<UserInput source={usernameImg}
						placeholder='Username'
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false}
						value={this.state.email}
						onChangeText={this.onChangeText.bind(this,'email')} />

					<UserInput source={passwordImg}
						secureTextEntry={this.state.showPass}
						placeholder='Password'
						returnKeyType={'done'}
						autoCapitalize={'none'}
						autoCorrect={false}
						value={this.state.password}
						onChangeText={this.onChangeText.bind(this,'password')}  />
						</View>
						:
						<View>

						<UserInput source={usernameImg}
							placeholder='Name'
							autoCapitalize={'none'}
							returnKeyType={'done'}
							autoCorrect={false}
							value={this.state.name}
							onChangeText={this.onChangeText.bind(this,'name')} />


						<UserInput source={usernameImg}
							placeholder='Email'
							autoCapitalize={'none'}
							returnKeyType={'done'}
							autoCorrect={false}
							value={this.state.email}
							onChangeText={this.onChangeText.bind(this,'email')}  />


						<UserInput source={usernameImg}
							placeholder='Number'
							autoCapitalize={'none'}
							returnKeyType={'done'}
							autoCorrect={false}
							value={this.state.number}
							onChangeText={this.onChangeText.bind(this,'number')}  />

							<UserInput source={passwordImg}
								secureTextEntry={this.state.showPass}
								placeholder='Password'
								returnKeyType={'done'}
								autoCapitalize={'none'}
								autoCorrect={false}
								value={this.state.password}
								onChangeText={this.onChangeText.bind(this,'password')}  />


							<UserInput source={passwordImg}
								secureTextEntry={this.state.showPass}
								placeholder='Confirm Password'
								returnKeyType={'done'}
								autoCapitalize={'none'}
								autoCorrect={false}
								value={this.state.cpassword}
								onChangeText={this.onChangeText.bind(this,'cpassword')}  />

						</View>
					}


				<ButtonSubmit onPress={this.state.condition ? this.loginSubmit.bind(this) : this.signupSubmit.bind(this)} condition={this.state.condition	}/>
				<SignupSection changeForm={this.changeForm.bind(this)} condition={this.state.condition	}/>
				</ScrollView>

			</View>
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	picture: {
		position:'absolute',
		top:0,
		bottom:0,
		width:'100%',
		height:'100%',
	},
	logocontainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	logoimage: {
		width: 80,
		height: 80,
	},
	logotext: {
		color: 'black',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 20,
	},
	formcontainer: {
		alignItems: 'center',
	},
	formbtnEye: {
		position: 'absolute',
		top: 55,
		right: 28,
	},
	formiconEye: {
		width: 25,
		height: 25,
		tintColor: 'rgba(0,0,0,0.2)',
	},

});
