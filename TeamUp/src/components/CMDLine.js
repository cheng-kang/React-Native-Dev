import React from 'react';
import { Text } from 'react-native';

const CMDLine = ({ children }) => {
	const CMDLineStyle = {
		color: '#fff',
		fontWeight: '500'
	};
	return (
		
			<Text 
				style={CMDLineStyle}
			>
			{'>'} {children}
			</Text>
	);
};

export { CMDLine };

