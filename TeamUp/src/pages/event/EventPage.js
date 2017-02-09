import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { 
	getEvent, 
	registerEvent, 
	unregisterEvent, 
	resetActionMsg, 
	setProfile, 
	resetProfile,
	resetCurrentEvent
} from '../../actions';
import { CMDLine } from '../../components';
import { ActionListItem, LastFetchMsg, CommandMsg, InfoListItem } from './components';

class EventPage extends Component {
	componentWillMount() {
		this.props.resetCurrentEvent();
		this.currentEvent = null;

		this.props.resetActionMsg();
		this.actionMsg = null;

		this.props.resetProfile();
		
		this.props.getEvent(this.props.event.id);
	}
	componentWillReceiveProps(nextProps) {
		this.currentEvent = nextProps.currentEvent;

		if (this.currentEvent != null && nextProps.profile == null) {
			const { registeredUser } = this.currentEvent;
			const { currentUser } = firebase.auth();
			const isRegistered = registeredUser && registeredUser[currentUser.uid];
			if (isRegistered) {
				this.props.setProfile(registeredUser[currentUser.uid]);
			}
		}

		const msg = nextProps.actionMsg;
		if (msg != null) {
			this.actionMsg = msg;
		}
	}
	renderDetail() {
		if (this.currentEvent) {
			const { id, title, desc, date, location, registeredUser } = this.currentEvent;
			const { name } = this.props; // user's name
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
					<InfoListItem name="title" value={title} />
					<InfoListItem name="date" value={date} />
					<InfoListItem name="location" value={location} />
					<InfoListItem name="desc" value={desc} />
					<CommandMsg title={title} command="status" >
					Status:
					</CommandMsg>
					<InfoListItem name="event" value="Ended" />
					<InfoListItem name="attnds" value={registeredCount} />
					<InfoListItem name="you" value={registerText} />
					{this.renderActions(id, title, name, isRegistered)}
				</View>
			);
		}

		return (
			<CMDLine>
				Fetching myEventList data for you...
			</CMDLine>
		);
	}
	renderActionMessage() {
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
	renderActions(id, title, name, isRegistered) {
		const actions = [];

		// common actions first
		actions.push(
			<ActionListItem 
				key="attnds"
				title="attnds"
				desc="View all attendant's profile."
				onPress={() => { Actions.attendants(); }}
			/>
		);

		if (isRegistered) {
			actions.push(
				<ActionListItem 
					key="prfl"
					title="prfl"
					desc="View your profile."
					onPress={() => { Actions.profile(); }}
				/>
			);
			actions.push(
				<ActionListItem 
					key="unreg"
					title="unreg"
					desc="Cancel this event for you."
					onPress={() => { this.props.unregisterEvent(id, title); }}
				/>
			);
		} else {
			actions.push(
				<ActionListItem 
					key="reg"
					title="reg"
					desc="You can register for this event and start to find team members!"
					onPress={() => { this.props.registerEvent(id, title, name); }}
				/>
			);
		}

		return (
			<View>
				<CommandMsg title={title} command="actions" >
				Actions:
				</CommandMsg>
				{actions}
			</View>
		);
	}
	render() {
		const { title } = this.props.event;
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1
		};
		return (
			<ScrollView style={pageStyle} >
				<LastFetchMsg />
				<CommandMsg title={`fetch event ${title}`} />
				{this.renderDetail()}
				{this.renderActionMessage()}
				<View style={{ height: 50 }} />
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { currentEvent, actionMsg, name, profile } = event;
	return { currentEvent, actionMsg, name, profile };
};

export default connect(mapStateToProps, {
	getEvent, 
	registerEvent, 
	unregisterEvent, 
	resetActionMsg, 
	setProfile, 
	resetProfile, 
	resetCurrentEvent
})(EventPage);
