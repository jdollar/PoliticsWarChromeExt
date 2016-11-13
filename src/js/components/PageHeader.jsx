var React = require('react')
var Header = require('semantic-ui-react').Header

class PageHeader extends React.Component {

  render() {
    return (
      <Header as='h1' size='huge' block={true}>
        <div className="ui grid centered">
          <div className="row">
            Politics and War Enhanced
          </div>
        </div>
      </Header>
    )
  }
}

module.exports = PageHeader
