import React from 'react'
import {Header} from 'semantic-ui-react'

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

export default PageHeader
