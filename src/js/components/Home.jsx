var React = require('react')
var PageHeader = require('./PageHeader')
var ProfileSetup = require('./ProfileSetup')

class Home extends React.Component {

  render() {
    return (
      <div>
        <PageHeader />
        <ProfileSetup />
      </div>
    )
  }
}

module.exports = Home
