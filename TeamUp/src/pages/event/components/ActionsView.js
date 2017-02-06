import React, { Component } from 'react';
import { View } from 'react-native';
import { CMDLine } from '../../../components';

class ActionsView extends Component {
	render() {
		const { title, actionList } = this.props;
		return (
			<View 
				style={{}}
			>
				<CMDLine>
				$ {title} --actions {'\n\n'}
				Actions:
				</CMDLine>
				{actionList}
			</View>
		);
	}
}

export { ActionsView };
