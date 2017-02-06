import React from 'react';
import { CMDLine } from '../../components';

const CommandMsg = ({ title, command, hideLine = false }) => {
	return (
		<CMDLine>
		$ {title} --{command}
		{((hl) => { 
			if (!hl) { 
				return ('\n\n---------------------------------------');
			}
		})(hideLine)}
		</CMDLine>
	);
};

export { CommandMsg };
