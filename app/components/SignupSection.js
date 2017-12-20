import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

export default class SignupSection extends Component {
	changeForm(){
		this.props.changeForm();
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text} onPress={this.changeForm.bind(this)}>{this.props.condition ? 'Create Account' : 'Login ? '}</Text>
				<Text style={styles.text}>{this.props.condition ? 'Forgot Password?' : ''}</Text>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
		padding:20,
	},
});
