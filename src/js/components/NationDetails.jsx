'use strict'

import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Segment, Divider, Header, Button } from 'semantic-ui-react'

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

  render() {
    return <div>
      <Header as='h2' attached='top' textAlign='center'>
        Nation Details
      </Header>
      <Segment attached>
        <div>
          {JSON.stringify(this.props)}
        </div>
        <Divider hidden />
      </Segment>
    </div>
  }
}

export default connectToStores(NationDetails)
