import React from 'react';
import { View, Text } from 'react-native';

// To display info like this:
// -name			value
// -anothername		another value
const InfoListItem = ({ name, value }) => {
	const infoStyle = {
		fontWeight: '500',
		marginTop: 10,
		marginBottom: 10,
		paddingRight: 10,
		paddingLeft: 20,
		color: 'white'
	};
	const textStyle = () => {
		let originalStyle = {
			flex: 3, 
			...infoStyle,
		};
		if (!value) {
			originalStyle = { ...originalStyle, color: 'rgba(255, 255, 255, 0.2)' };
		}
		return originalStyle;
	};
	return (
		<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
			<Text style={{ flex: 1.1, ...infoStyle, flexWrap: 'wrap' }} >
			-{name}
			</Text>
			{typeof value === 'string' || typeof value == 'number' ? (<Text style={textStyle()} >{value || 'null'}</Text>) : (<View style={{ flex: 3 }} >{value}</View>)}
		</View>
	);
};

export { InfoListItem };
