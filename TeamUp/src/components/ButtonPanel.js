import React from 'react';
import { View } from 'react-native';

const ButtonPanel = (props) => {
	return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
			{props.children}
		</View>
	);
};

export default ButtonPanel;
