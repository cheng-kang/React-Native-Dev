import React from 'react';
import { CMDLine } from '../../../components';

const PrintListMsg = ({ title }) => {
	return (
		<CMDLine>
		$ {title} --print
		{'\n\n'}
		---------------------------------------
		</CMDLine>
	);
};

export { PrintListMsg };
