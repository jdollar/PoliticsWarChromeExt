'use strict'

import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Segment, Divider, Button, Input, Dropdown} from 'semantic-ui-react'

import ProfileStore from './../stores/ProfileStore'
import ProfileActions from './../actions/ProfileActions'

class ProfileSetup extends React.Component {
  constructor(props, context) {
    super(props, context)

    this._onChange = this._onChange.bind(this)
    this._onClick = this._onClick.bind(this)
    this._renderProfileOptions = this._renderProfileOptions.bind(this)
    this.render = this.render.bind(this)
  }

  static getStores(props) {
    return [ProfileStore]
  }

  static getPropsFromStores(props) {
    return ProfileStore.getState()
  }

  static componentDidConnect() {
    ProfileActions.fetchAllProfilesAndAssign()
  }

  _onChange(event) {
    ProfileActions.updateNationId(event.target.value)
  }

  _onProfileSelect(proxy, object) {
    ProfileActions.selectProfile(object.value)
  }

  _onClick() {
    ProfileActions.createNewProfile({nationId: this.props.nationId})
  }

  _onDeleteClick() {
    ProfileActions.deleteAllProfiles()
  }

  _renderProfileOptions() {
    return this.props.profileList.map((profile, index) => {
      return {text: profile.nationId, value: profile.id}
    })
  }

  render() {
    return <Segment>
      <Dropdown fluid selection value={this.props.currentProfileSelection} onChange={this._onProfileSelect} options={this._renderProfileOptions()} />
      <Divider hidden />
      <Input fluid placeholder="Nation ID" value={this.props.nationId} onChange={this._onChange}/>
      <Button fluid onClick={this._onClick} >Save Nation ID</Button>
      <Button fluid onClick={this._onDeleteClick} >Delete All Profiles</Button>
    </Segment>
  }
}
 ProfileSetup = connectToStores(ProfileSetup)

export default ProfileSetup
