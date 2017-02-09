import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { LastFetchMsg, CommandMsg, HashTag, InfoListItem } from './components';
import { CMDLine } from '../../components';
import { selectUser, deselectUser } from '../../actions';

class AttendantsPage extends Component {
	componentWillMount() {
		this.currentEvent = this.props.currentEvent;
		this.actionMsg = null;

		this.createDataSource(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.currentEvent = nextProps.currentEvent;
		const msg = nextProps.actionMsg;
		if (msg != null) {
			this.actionMsg = msg;
		}

		this.createDataSource(nextProps);
	}
	createDataSource({ currentEvent }) {
		const { registeredUser } = currentEvent;
		const users = _.map(registeredUser, (value, uid) => {
			return { ...value, uid };
		});
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(users);
	}
	renderTags(tags) {
		if (!tags) {
			return '';
		}

		const hashTag = (tag) => {
			return (
				<HashTag key={tag} >{tag}</HashTag>
			);
		};
		const tagsView = [];
		for (let i = 0; i < tags.length; i++) {
			tagsView.push(hashTag(tags[i]));
		}
		return (<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }} >{tagsView}</View>);
	}
	renderRow(user) {
		const { id, name, regDate, selfTags, targetTags, selfDesc, targetDesc } = user;
		console.log(this.props);
		const selectedUserId = this.props.selectedUserId;
		if (selectedUserId === id) {
			return (
				<TouchableHighlight
					key={id}
					onPress={() => { this.props.deselectUser(id); }}
				>
					<View style={{ backgroundColor: 'black' }} >
						<CMDLine style={{ fontWeight: 'bold' }} >
						@ {name}
						</CMDLine>
						<View style={{ height: 1, marginLeft: 10, marginRight: 10, backgroundColor: '#121619' }} />
						<CommandMsg title={name} command="details" >
						Details:
						</CommandMsg>
						<InfoListItem name="selfTags" value={this.renderTags(selfTags)} />
						<InfoListItem name="targetTags" value={this.renderTags(targetTags)} />
						<InfoListItem name="selfDesc" value={selfDesc || ''} />
						<InfoListItem name="targetDesc" value={targetDesc || ''} />
					</View>
				</TouchableHighlight>
			);
		}
		return (
			<TouchableHighlight 
				key={id}
				onPress={() => { 
					this.props.selectUser(id);
				}}
			>
				<View>
					<CMDLine>
					@ {name}
					</CMDLine>
				</View>
			</TouchableHighlight>
		);
	}
	render() {
		const { title } = this.props.currentEvent;
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1
		};
		return (
			<View style={pageStyle} >
				<LastFetchMsg />
				<CommandMsg title={title} command="attendants" hideLine={false} />
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow.bind(this)}
				/>
				<View style={{ height: 20 }} />
			</View>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { currentEvent, selectedUserId } = event;
	return { currentEvent, selectedUserId };
};

export default connect(mapStateToProps, {
	selectUser, deselectUser
})(AttendantsPage);
