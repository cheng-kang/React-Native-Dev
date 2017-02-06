import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CMDButton = ({ onPress, titleStyle, buttonStyle, children }) => {
	const _buttonStyle = {
		alignSelf: 'center'
	};

	const _borderStyle = {
		height: 1,
		borderWidth: 0.5,
		borderColor: 'white',
		borderStyle: 'dashed'
	};
	const _textStyle = {
		color: 'white',
		alignSelf: 'center',
		// fontWeight: 'bold',
	};
	return (
		<TouchableOpacity onPress={onPress} style={{ ..._buttonStyle, ...buttonStyle }}>
			<Text style={{ ..._textStyle, ...titleStyle }}>
				{children}
			</Text>
			<View style={_borderStyle} />
		</TouchableOpacity>
	);
};

export { CMDButton };
