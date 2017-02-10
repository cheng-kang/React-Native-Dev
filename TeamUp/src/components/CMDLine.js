import React from 'react';
import { Text } from 'react-native';

const CMDLine = ({ children, style }) => {
	const CMDLineStyle = {
		color: '#fff',
		fontWeight: '500',
		marginTop: 10,
		marginBottom: 10,
		paddingLeft: 10,
		paddingRight: 10

	};
	return (
		<Text style={{ ...CMDLineStyle, ...style }} >
		{children}
		</Text>
	);
};

export { CMDLine };

