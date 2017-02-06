import React, { Component } from 'react';
import { View } from 'react-native';
import { CMDLine } from '../../../components';
import { CommandMsg } from './CommandMsg.js';

class ActionsView extends Component {
	render() {
		const { title, actionList } = this.props;
		return (
			<View 
				style={{}}
			>
				<CommandMsg title={title} command="actions" >
				Actions:
				</CommandMsg>
				{actionList}
			</View>
		);
	}
}

export { ActionsView };
