import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CMDButton = ({ onPress, children }) => {
	const buttonStyle = {
		alignSelf: 'center'
	};

	const viewStyle = {
		height: 1,
		borderWidth: 0.5,
		borderColor: 'white',
		borderStyle: 'dashed'
	};
	const textStyle = {
		color: 'white',
		alignSelf: 'center',
		// fontWeight: 'bold',
	};
	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>
				{children}
			</Text>
			<View style={viewStyle} />
		</TouchableOpacity>
	);
};

export default CMDButton;
