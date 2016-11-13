var React = require('react')
var Input = require('semantic-ui-react').Input
var Button = require('semantic-ui-react').Button

var ProfileStore = require('./../stores/ProfileStore')
var ProfileActions = require('./../actions/ProfileActions')

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
      return <div key={index}>
        {JSON.stringify(profile)}
      </div>
    })
  },

  render: function() {
    return <div className="ui grid">
      <div className="ui container">
        {this._renderProfiles()}
      </div>
      <div className="ui hidden divider"></div>
      <Input className="ui container" placeholder="nation ID" onChange={this._onChange}/>
      <Button className="ui container" onClick={this._onClick} >Save Nation ID</Button>
      <Button className="ui container" onClick={this._onDeleteClick} >Delete All Profiles</Button>
    </div>
  }
})

module.exports = ProfileSetup
