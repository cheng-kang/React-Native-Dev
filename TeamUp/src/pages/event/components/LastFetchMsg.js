import React from 'react';
import { CMDLine } from '../../../components';

const LastFetchMsg = () => {
	const dateString = (new Date()).toUTCString();
	const date = dateString.substring(0, dateString.length - 4);
	return (
		<CMDLine>
		Last fetch: {date}
		</CMDLine>
	);
};

export { LastFetchMsg };
