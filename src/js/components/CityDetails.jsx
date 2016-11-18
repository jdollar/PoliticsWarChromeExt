'use strict'

import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores';
import { Segment, Divider, Header, Button } from 'semantic-ui-react'

import CityActions from './../actions/CityActions'
import CityStore from './../stores/CityStore'

class CityDetails extends React.Component {
  constructor(props, context) {
    super(props, context)

    this._onClick = this._onClick.bind(this)
    this.render = this.render.bind(this)
  }

  static getStores(props) {
    return [CityStore]
  }

  static getPropsFromStores(props) {
    return CityStore.getState()
  }

  _onClick() {
    CityActions.getCityDetails()
  }

  render() {
    return <div>
      <Header as='h2' attached='top' textAlign='center'>
        City Details
      </Header>
      <Segment attached>
        <div>
          {JSON.stringify(this.props.citiesDetails)}
        </div>
        <Divider hidden />
      </Segment>
    </div>
  }
}

export default connectToStores(CityDetails)
