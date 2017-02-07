import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getEvent, registerEvent, unregisterEvent } from '../../actions';
import { CMDLine, CMDButton } from '../../components';
import { ActionListItem, LastFetchMsg, CommandMsg } from './components';

class EventPage extends Component {
	componentWillMount() {
		this.props.getEvent(this.props.event.id);
		this.currentEvent = this.props.currentEvent;

		this.actionMsg = null;
	}
	componentWillReceiveProps(nextProps) {
		this.currentEvent = nextProps.currentEvent;
		const msg = nextProps.actionMsg;
		if (msg != null) {
			this.actionMsg = msg;
		}
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
		if (this.currentEvent) {
			const { id, title, desc, date, location, registeredUser } = this.currentEvent;
			const { currentUser } = firebase.auth();
			const isRegistered = registeredUser && registeredUser[currentUser.uid];
			const registerText = isRegistered ? 'Registered' : 'Not Registered';
			const registeredCount = registeredUser ? Object.keys(registeredUser).length : 0;
			return (
				<View
					style={{ flex: 1 }}
				>
					<CommandMsg title={title} command="details" >
					Info:
					</CommandMsg>
					{this.detailsViewItem('title', title)}
					{this.detailsViewItem('date', date)}
					{this.detailsViewItem('location', location)}
					{this.detailsViewItem('desc', desc)}
					<CommandMsg title={title} command="status" >
					Status:
					</CommandMsg>
					{this.detailsViewItem('event', 'Ended')}
					{this.detailsViewItem('registered', registeredCount)}
					{this.detailsViewItem('you', registerText)}
					{this.eventActions(id, title, isRegistered)}
				</View>
			);
		}

		return (
			<CMDLine>
				Fetching myEventList data for you...
			</CMDLine>
		);
	}
	eventActions(id, title, isRegistered) {
		const actions = [];

		if (isRegistered) {
			actions.push(
				<ActionListItem 
					title="unreg"
					desc="Cancel this event for you."
					onPress={() => { this.props.unregisterEvent(id, title); }}
				/>
			);
		} else {
			actions.push(
				<ActionListItem 
					title="reg"
					desc="You can register for this event and start to find team members!"
					onPress={() => { this.props.registerEvent(id, title); }}
				/>
			);
		}

		actions.push(
			<ActionListItem 
				title="people"
				desc="View all participants\'s profile."
				onPress={() => {}}
			/>
		);
		actions.push(
			<ActionListItem 
				title="profile"
				desc="View your profile."
				onPress={() => {}}
			/>
		);

		return (
			<View>
				<CommandMsg title={title} command="actions" >
				Actions:
				</CommandMsg>
				{actions}
			</View>
		);
	}
	actionMessage() {
		if (this.actionMsg) {
			const { title, command, children } = this.actionMsg;
			return (
				<CommandMsg 
					title={title} 
					command={command}
				>
				{children}
				</CommandMsg>
			);
		}
	}
	render() {
		const { title } = this.props.event;
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1,
			paddingBottom: 30
		};
		return (
			<ScrollView style={pageStyle} >
				<LastFetchMsg />
				<CommandMsg title={`fetch event ${title}`} />
				{this.eventDetail()}
				{this.actionMessage()}
				<View style={{ height: 50 }} />
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { currentEvent, actionMsg } = event;
	return { currentEvent, actionMsg };
};

export default connect(mapStateToProps, {
	getEvent, registerEvent, unregisterEvent
})(EventPage);
