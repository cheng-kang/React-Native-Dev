import React from 'react';
import { TextInput, View, Text } from 'react-native';

const CMDInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
	const textInputStyle = {
		height: 40,
		paddingLeft: 20,
		paddingRight: 20,
		textAlignVertical: 'bottom',
		color: 'white',
		fontWeight: 'bold',
		flex: 1
	};

	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ color: '#01DD06', fontWeight: 'bold' }}># </Text>
				<Text style={{ color: '#fff01c', fontWeight: 'bold' }}>{label}</Text>
			</View>
			<TextInput 
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				style={textInputStyle} 
				placeholder={placeholder}
				autoCorrect={false}
				autoCapitalize={'none'}
				selectionColor={'white'}
				placeholderTextColor={'gray'}
			/>
		</View>
	);
};

export default CMDInput;
