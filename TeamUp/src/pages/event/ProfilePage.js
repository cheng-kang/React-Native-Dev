import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { LastFetchMsg, CommandMsg, HashTag, ActionListItem, InfoListItem } from './components';
import { CMDInput, CMDTextarea } from '../../components';
import { saveProfile, editProfile, resetIsEditingProfile, exitProfilePage } from '../../actions';

class ProfilePage extends Component {
	state = {
		profile: null,
		editCount: 0,
		newSelfTag: '',
		newTargetTag: '',
		selfDesc: '',
		targetDesc: ''
	};
	componentWillMount() {
		this.props.resetIsEditingProfile();
		this.setState({ profile: { ...this.props.profile } });
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ profile: { ...nextProps.profile } });
	}
	componentWillUnmount() {
		this.props.exitProfilePage();
	}
	tagInputOnPress(isSelf = true) {
		const whichInput = isSelf ? 'newSelfTag' : 'newTargetTag';
		const tags = this.state[whichInput].split(' ');
		let hasNewTag = false;
		const whichType = isSelf ? 'selfTags' : 'targetTags';
		const { profile } = this.state;
		if (!profile[whichType]) {
			profile[whichType] = [];
		}
		for (let i = 0; i < tags.length; i++) {
			if (tags[i] !== '') {
				hasNewTag = true;
				profile[whichType].push(tags[i]);
			}
		}
		this.state[whichInput] = '';
		if (hasNewTag) { this.setState({ editCount: this.state.editCount + 1 }); }
	}
	renderTags(tags, isSelf = true) {
		const { profile } = this.state;
		if (!tags) {
			return this.props.isEditingProfile ? (<Text />) : '';
		}

		let hashTag;
		if (this.props.isEditingProfile) {
			hashTag = (tag) => {
				return (
					<HashTag 
						key={tag} 
						onPress={() => {
							if (isSelf) {
								const pos = profile.selfTags.indexOf(tag);
								console.log(profile.selfTags.splice(pos, 1));
								this.setState({ editCount: this.state.editCount + 1 });
							} else {
								const pos = profile.targetTags.indexOf(tag);
								console.log(profile.targetTags.splice(pos, 1));
								this.setState({ editCount: this.state.editCount + 1 });
							}
						}}
					>
					{tag}
					</HashTag>
				);
			};
		} else {
			hashTag = (tag) => {
				return (
					<HashTag key={tag} >{tag}</HashTag>
				);
			};
		}
		const tagsView = [];
		for (let i = 0; i < tags.length; i++) {
			tagsView.push(hashTag(tags[i]));
		}
		return this.props.isEditingProfile ? tagsView : (<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }} >{tagsView}</View>);
	}
	renderDetail() {
		const { selfTags, targetTags, selfDesc, targetDesc } = this.state.profile;
		const tagsStyle = {
			flexDirection: 'row',
			flexWrap: 'wrap',
			alignItems: 'flex-start',
			paddingLeft: 10,
			paddingRight: 10
		};
		if (this.props.isEditingProfile) {
			return (
				<View>
					<CMDInput 
						label="self tags"
						placeholder="Add tags for yourself to represent your skills."
						value={this.state.newSelfTag}
						onChangeText={(text) => { this.setState({ newSelfTag: text }); }}
						inputStyle={{ fontWeight: '400', fontSize: 14 }}
						buttonText="+"
						showButton
						onPress={() => { this.tagInputOnPress(); }}
					/>
					<View style={tagsStyle} >
					{this.renderTags(selfTags)}
					</View>
					<CMDInput 
						label="target tags"
						placeholder="Add tags for your target teammates."
						value={this.state.newTargetTag}
						onChangeText={(text) => { this.setState({ newTargetTag: text }); }}
						inputStyle={{ fontWeight: '400', fontSize: 14 }}
						buttonText="+"
						showButton
						onPress={() => { this.tagInputOnPress(false); }}
					/>
					<View style={tagsStyle} >
					{this.renderTags(targetTags, false)}
					</View>
					<CMDTextarea
						label="self desc"
						value={this.state.profile.selfDesc || ''}
						onChangeText={(text) => { this.state.profile.selfDesc = text; this.setState({ profile: this.state.profile }); }}
						placeholder="Please enter your self description here."
					/>
					<CMDTextarea 
						label="target desc"
						value={this.state.profile.targetDesc || ''}
						onChangeText={(text) => { this.state.profile.targetDesc = text; this.setState({ profile: this.state.profile }); }}
						placeholder="Please enter your description for your target teammates here."
					/>
				</View>
			);
		}
		return (
			<View>
				<CommandMsg title="profile" command="detials">
					Details
				</CommandMsg>
				<InfoListItem name="selfTags" value={this.renderTags(selfTags)} />
				<InfoListItem name="targetTags" value={this.renderTags(targetTags)} />
				<InfoListItem name="selfDesc" value={selfDesc || ''} />
				<InfoListItem name="targetDesc" value={targetDesc || ''} />
			</View>
		);
	}
	renderActions() {
		const actions = [];

		if (this.props.isEditingProfile) {
			actions.push(
				<ActionListItem 
					key="save"
					title="save"
					desc="Save your changes."
					onPress={() => { this.props.saveProfile(this.props.currentEvent.id, this.state.profile); }}
				/>
			);
		} else {
			actions.push(
				<ActionListItem 
					key="edit"
					title="edit"
					desc="Edit your profile and ready to roll!"
					onPress={() => { this.props.editProfile(); }}
				/>
			);
		}

		return (
			<View>
				<CommandMsg title="profile" command="actions" >
				Actions:
				</CommandMsg>
				{actions}
			</View>
		);
	}
	renderActionMessage() {

	}
	render() {
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1
		};
		return (
			<ScrollView style={pageStyle} >
				<LastFetchMsg />
				<CommandMsg title={`fetch profile ${this.props.name}`} />
				{this.renderActions()}
				{this.renderActionMessage()}
				{this.renderDetail()}
				<View style={{ height: 50 }} />
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { name, isEditingProfile, profile, currentEvent } = event;
	return { name, isEditingProfile, profile, currentEvent };
};

export default connect(mapStateToProps, {
	saveProfile, editProfile, resetIsEditingProfile, exitProfilePage
})(ProfilePage);
