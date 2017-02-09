import React from 'react';
import { TextInput, View, Text, TouchableHighlight } from 'react-native';

const CMDInput = ({ label, value, inputStyle, onChangeText, placeholder, secureTextEntry, onPress = () => {}, showButton = false, showLabel = true }) => {
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
		<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
			{(() => {
				if (showLabel) {
					return (
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: '#01DD06', fontWeight: 'bold' }}># </Text>
							<Text style={{ color: '#fff01c', fontWeight: 'bold' }}>{label}</Text>
						</View>
					);
				}
			})()}
			<TextInput 
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				style={{ ...textInputStyle, ...inputStyle }} 
				placeholder={placeholder}
				autoCorrect={false}
				autoCapitalize="none"
				selectionColor="white"
				placeholderTextColor="gray"
				returnKeyType="done"
			/>
			{(() => {
				if (showButton) {
					return (
						<TouchableHighlight
							style={{ width: 45, alignItems: 'center' }}
							onPress={onPress}
						>
							<Text style={{ color: 'white', fontWeight: '500', fontSize: 20 }} >
							+
							</Text>
						</TouchableHighlight>
					);
				}
			})()}
		</View>
	);
};

export { CMDInput };
