import React from 'react';
import { Text } from 'react-native';
import { CMDLine } from '../../../components';

const CommandMsg = ({ title, children = null, command = null, hideLine = true, childrenStyle }) => {
	const commandLineStyle = {
		color: 'rgba(255, 255, 255, 0.7)' // Dim the command text to outstand other contents 
	};
	return (
		<CMDLine>
			<Text style={commandLineStyle} >
			$ {title} {command ? `--${command}` : ''}
			{hideLine ? '' : '\n\n---------------------------------------'}
			</Text>
			<Text 
				style={{ 
				fontWeight: 'bold', 
				color: '#e4e40e', 
				...childrenStyle 
				}} 
			>
			{children ? `\n\n${children}` : ''}
			</Text>
		</CMDLine>
	);
};

export { CommandMsg };
