'use strict'

import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Segment, Divider, Button, Input, Dropdown, Header} from 'semantic-ui-react'

import ProfileStore from './../stores/ProfileStore'
import NationStore from './../stores/NationStore'
import ProfileActions from './../actions/ProfileActions'
import NationActions from './../actions/NationActions'

class ProfileSetup extends React.Component {
  constructor(props, context) {
    super(props, context)

    this._onChange = this._onChange.bind(this)
    this._onClick = this._onClick.bind(this)
    this._renderProfileOptions = this._renderProfileOptions.bind(this)
    this.render = this.render.bind(this)
  }

  static getStores(props) {
    return [ProfileStore, NationStore]
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
    return <div>
      <Header as='h2' attached='top' textAlign="center">
        Profile
      </Header>
      <Segment attached>
        <Dropdown fluid selection value={this.props.currentProfileSelection} onChange={this._onProfileSelect} options={this._renderProfileOptions()} />
        <Divider hidden />
        <Input fluid placeholder="Nation ID" value={this.props.nationId} onChange={this._onChange}/>
        <Divider hidden />
        <Button fluid positive onClick={this._onClick} >Save Nation ID</Button>
        <Button fluid negative color='red' onClick={this._onDeleteClick} >Delete All Profiles</Button>
      </Segment>
    </div>
  }
}
 ProfileSetup = connectToStores(ProfileSetup)

export default ProfileSetup
