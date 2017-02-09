import React from 'react';
import { TextInput, View, Text } from 'react-native';

const CMDTextarea = ({ label, value, height = 100, onChangeText, placeholder, keyboardType = 'default', showLabel = true }) => {
	const textInputStyle = {
		height: 40,
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 10,
		marginBottom: 10,
		textAlignVertical: 'bottom',
		color: 'white',
		fontWeight: 'bold',
		flexGrow: 1,
	};
	return (
		<View 
			style={{ 
				margin: 10,
				// backgroundColor: 'rgba(0, 0, 0, 0.2)' 
			}}
		>
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
				style={{ ...textInputStyle, height }} 
				placeholder={placeholder}
				keyboardType={keyboardType}
				autoCorrect={false}
				autoCapitalize="none"
				selectionColor="white"
				placeholderTextColor="gray"
				returnKeyType="done"
				multiline
				blurOnSubmit
			/>
			<View 
				style={{ 
					backgroundColor: 'rgba(255, 255, 255, 0.2)',
					height: 1,
					marginRight: 20,
					marginLeft: 20
				}} 
			/>
		</View>
	);
};

export { CMDTextarea };
