'use strict'

import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Segment, Divider, Header, Button, Table } from 'semantic-ui-react'

import NationActions from './../actions/NationActions'
import NationStore from './../stores/NationStore'

class NationDetails extends React.Component {
  constructor(props, context) {
    super(props, context)

    this._onClick = this._onClick.bind(this)
    this.render = this.render.bind(this)
  }

  static getStores(props) {
    return [NationStore]
  }

  static getPropsFromStores(props) {
    return NationStore.getState()
  }

  _onClick() {
    NationActions.getNationDetails()
  }

  _renderDetails() {
    let details = []
    let index = 0
    for (let key in this.props) {
      if (this.props.hasOwnProperty(key)) {
        details.push(
          <Table.Row divided>
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>{this.props[key]}</Table.Cell>
          </Table.Row>
        )
      }
    }
    return <Table definition>
      <Table.Body>
        {details}
      </Table.Body>
    </Table>
  }

  render() {
    return <div>
      <Header as='h2' attached='top' textAlign='center'>
        Nation Details
      </Header>
      <Segment attached>
        {this._renderDetails()}
        <Divider hidden />
      </Segment>
    </div>
  }
}

export default connectToStores(NationDetails)
