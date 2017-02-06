import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getEvent } from '../../actions';
import { CMDLine, CMDButton } from '../../components';
import { ActionListItem } from './components';

class EventPage extends Component {
	componentWillMount() {
		this.props.getEvent(this.props.event.id);
		this.currentEvent = this.props.currentEvent;
	}
	componentWillReceiveProps(nextProps) {
		this.currentEvent = nextProps.currentEvent;
	}
	detailsViewItem(key, value) {
		const infoStyle = {
			fontWeight: '500',
			marginTop: 10,
			marginBottom: 10,
			paddingRight: 10,
			paddingLeft: 20,
			color: 'white'
		};
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
				<Text style={{ flex: 1, ...infoStyle }} >
				-{key}
				</Text>
				<Text style={{ flex: 3, ...infoStyle }} >
				{value}
				</Text>
			</View>
		);
	}
	actionsViewItem(name, desc, onPress) {
		const infoStyle = {
			fontWeight: '500',
			marginBottom: 10,
			paddingRight: 10,
			paddingLeft: 20,
			color: 'white'
		};
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
				<View style={{ flex: 1 }} >
					<CMDButton onPress={onPress} >
					{name}
					</CMDButton>
				</View>
				<Text style={{ flex: 3, ...infoStyle }} >
				{desc}
				</Text>
			</View>
		);
	}
	eventDetail() {
		const lineStyle = {
			fontWeight: '500',
			marginTop: 10,
			marginBottom: 10,
			paddingLeft: 10,
			paddingRight: 10
		};
		console.log('Should render event details.');
		console.log(this.currentEvent);
		if (this.currentEvent) {
			const { title, desc, date, location } = this.currentEvent;
			// const detailsView = _.map(this.currentEvent, (value, key) => {
			// 	if (key !== 'id') {
			// 		return (
			// 			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
			// 				<Text style={{ flex: 1, ...infoStyle }} >
			// 				-{key}
			// 				</Text>
			// 				<Text style={{ flex: 3, ...infoStyle }} >
			// 				{value}
			// 				</Text>
			// 			</View>
			// 		);
			// 	}
			// });
			return (
				<View
					style={{ flex: 1 }}
				>
					<CMDLine>
					=========================== {'\n\n'}
					$ {title} --details {'\n\n'}
					Info:
					</CMDLine>
					{this.detailsViewItem('title', title)}
					{this.detailsViewItem('date', date)}
					{this.detailsViewItem('location', location)}
					{this.detailsViewItem('desc', desc)}
					<CMDLine>
					$ {title} --status {'\n\n'}
					Status:
					</CMDLine>
					{this.detailsViewItem('event', 'Ended')}
					{this.detailsViewItem('you', 'Joined in')}
					{this.eventActions(title)}
				</View>
			);
		} else {
			return (
				<Text>...</Text>
			);
		}
	}
	eventActions(title) {
		return (
			<View 
				style={{}}
			>
				<CMDLine>
				$ {title} --actions {'\n\n'}
				Actions:
				</CMDLine>
				<ActionListItem 
					title="join"
					desc="You can join this event and start to find team members!"
					onPress={() => {}}
				/>
				<ActionListItem 
					title="people"
					desc="View all participants\'s profile."
					onPress={() => {}}
				/>
				<ActionListItem 
					title="profile"
					desc="View your profile."
					onPress={() => {}}
				/>
				<ActionListItem 
					title="exit"
					desc="Cancel this event for you."
					onPress={() => {}}
				/>
			</View>
		);
	}
	render() {
		const { title } = this.props.event;
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1,
			paddingBottom: 30
		};
		const welcomMsgStyle = {
			color: '#fff',
			fontWeight: '500',
			marginTop: 10,
			marginBottom: 10,
			paddingLeft: 10

		};
		const dateString = (new Date()).toUTCString();
		const date = dateString.substring(0, dateString.length - 4);
		return (
			<ScrollView style={pageStyle} >
				<CMDLine>
				Last fetch: {date}
				</CMDLine>
				<CMDLine>
				$ fetch event {title} {'\n\n'}
				loading...
				</CMDLine>
				{this.eventDetail()}
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { currentEvent } = event;
	return { currentEvent };
};

export default connect(mapStateToProps, {
	getEvent
})(EventPage);
