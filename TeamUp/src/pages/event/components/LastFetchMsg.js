import React from 'react';
import { CMDLine } from '../../../components';

const LastFetchMsg = () => {
	const textStyle = {
		color: 'rgba(255, 255, 255, 0.7)' // Dim the command text to outstand other contents 
	};
	const dateString = (new Date()).toUTCString();
	const date = dateString.substring(0, dateString.length - 4);
	return (
		<CMDLine style={textStyle} >
		Last fetch: {date}
		</CMDLine>
	);
};

export { LastFetchMsg };
