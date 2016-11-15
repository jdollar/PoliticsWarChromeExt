'use strict'

import React from 'react'
import { Segment, Divider, Button, Input, Dropdown} from 'semantic-ui-react'

import ProfileStore from './../stores/ProfileStore'
import ProfileActions from './../actions/ProfileActions'

class ProfileSetup extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = ProfileStore.getState()

    this._onChange = this._onChange.bind(this)
    this._onClick = this._onClick.bind(this)
    this.profileStoreListener = this.profileStoreListener.bind(this)
    this._renderProfileOptions = this._renderProfileOptions.bind(this)
  }

  componentDidMount() {
    ProfileStore.listen(this.profileStoreListener)
    ProfileActions.fetchAllProfiles()
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.profileStoreListener)
  }

  profileStoreListener(state) {
    this.setState(state)
  }

  _onChange(event) {
    ProfileActions.updateNationId(event.target.value)
  }

  _onClick() {
    ProfileActions.createNewProfile({nationId: this.state.nationId})
  }

  _onDeleteClick() {
    ProfileActions.deleteAllProfiles()
  }

  _renderProfileOptions() {
    return this.state.profileList.map((profile, index) => {
      return {text: profile.nationId, value: profile.id}
    })
  }

  render() {
    return <Segment>
      <Dropdown fluid selection defaultValue={'profile1'} options={this._renderProfileOptions()} />
      <Divider hidden />
      <Input fluid placeholder="Nation ID" onChange={this._onChange}/>
      <Button fluid onClick={this._onClick} >Save Nation ID</Button>
      <Button fluid onClick={this._onDeleteClick} >Delete All Profiles</Button>
    </Segment>
  }
}

export default ProfileSetup
