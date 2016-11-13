var React = require('react')
var PageHeader = require('./PageHeader')

class Home extends React.Component {

  render() {
    return (
      <div>
        <PageHeader />
        <div>Home</div>
      </div>
    )
  }
}

module.exports = Home
