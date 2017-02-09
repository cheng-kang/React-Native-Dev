import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CMDLine } from '../../../components';

const HashTag = ({ children, onPress }) => {
	const viewStyle = {
		flexDirection: 'row', 
		padding: 5,
		height: 30
	};
	const hashTagStyle = {
		color: '#549eff', 
		fontWeight: 'bold', 
		fontStyle: 'italic'
	};
	const textStyle = {
		color: '#549eff', 
		fontWeight: '500', 
		fontStyle: 'italic'
	};
	return (
		<TouchableHighlight 
			underlayColor="black"
			onPress={onPress}
		>
			<View style={viewStyle} >
				<Text style={hashTagStyle} >#</Text>
				<Text style={textStyle} >
				{children}
				</Text>
			</View>
		</TouchableHighlight>
	);
};

export { HashTag };
