import React from 'react';
import { Text } from 'react-native';
import { CMDLine } from '../../../components';

const CommandMsg = ({ title, children = null, command = null, hideLine = true }) => {
	return (
		<CMDLine>
		$ {title} {command ? ('--' + command) : ''}
		{hideLine ? '' : '\n\n---------------------------------------'}
		<Text style={{ fontWeight: 'bold', color: '#e4e40e' }} >{children ? '\n\n' + children : ''}</Text>
		</CMDLine>
	);
};

export { CommandMsg };
