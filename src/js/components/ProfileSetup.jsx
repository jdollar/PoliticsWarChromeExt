'use strict'

import React from 'react'
import { Segment, Divider, Button, Input} from 'semantic-ui-react'

import ProfileStore from './../stores/ProfileStore'
import ProfileActions from './../actions/ProfileActions'

var ProfileSetup = React.createClass({
  getInitialState: function() {
    return ProfileStore.getState()
  },

  componentDidMount: function() {
    ProfileStore.listen(this.profileStoreListener)
    ProfileActions.fetchAllProfiles()
  },

  componentWillUnmount: function() {
    ProfileStore.unlisten(this.profileStoreListener)
  },

  profileStoreListener: function(state) {
    this.setState(state)
  },

  _onChange: function(event) {
    ProfileActions.updateNationId(event.target.value)
  },

  _onClick: function() {
    ProfileActions.createNewProfile({nationId: this.state.nationId})
  },

  _onDeleteClick: function() {
    ProfileActions.deleteAllProfiles()
  },

  _renderProfiles: function() {
    return this.state.profileList.map((profile, index) => {
      return <div className="row" key={index}>
        {JSON.stringify(profile)}
      </div>
    })
  },

  render: function() {
    return <Segment>
      <div>
        {this._renderProfiles()}
      </div>
      <Divider hidden />
      <Input fluid={true} placeholder="Nation ID" onChange={this._onChange}/>
      <Button fluid={true} onClick={this._onClick} >Save Nation ID</Button>
      <Button fluid={true} onClick={this._onDeleteClick} >Delete All Profiles</Button>
    </Segment>
  }
})

export default ProfileSetup
