'use strict'

import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Segment, Divider, Button} from 'semantic-ui-react'

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
    return <Segment>
      <div>
        {JSON.stringify(this.props.nationDetails)}
      </div>
      <Divider hidden />
      <Button fluid onClick={this._onClick} >Get Nation Details</Button>
    </Segment>
  }
}

export default connectToStores(NationDetails)
