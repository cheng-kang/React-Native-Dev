import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-redux';
import { CMDButton, CMDLine } from '../../../components';

class ActionListItem extends Component {

	actionsViewItem() {
	}
	render() {
		const { title, desc, onPress } = this.props;
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
				<View style={{ flex: 1 }} >
					<CMDButton onPress={onPress} >
					{title}
					</CMDButton>
				</View>
				<CMDLine style={{ flex: 3, marginTop: 0 }} >
				{desc}
				</CMDLine>
			</View>
		);
	}
}

export { ActionListItem };
