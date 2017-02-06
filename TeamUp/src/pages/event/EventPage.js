import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getEvent } from '../../actions';
import { CMDLine, CMDButton } from '../../components';
import { ActionListItem, LastFetchMsg, CommandMsg } from './components';

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
		console.log('Should render event details.');
		console.log(this.currentEvent);
		if (this.currentEvent) {
			const { title, desc, date, location, registeredUser } = this.currentEvent;
			const { currentUser } = firebase.auth();
			const registerText = (registeredUser && registeredUser[currentUser.uid]) ? 'Registered' : 'Not Registered';
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
					{this.eventActions(title)}
				</View>
			);
		}

		return (
			<CMDLine>
				Fetching myEventList data for you...
			</CMDLine>
		);
	}
	eventActions(title) {
		return (
			<View 
				style={{}}
			>
				<CommandMsg title={title} command="actions" >
				Actions:
				</CommandMsg>
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
		return (
			<ScrollView style={pageStyle} >
				<LastFetchMsg />
				<CommandMsg title={'fetch event ' + title} />
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
