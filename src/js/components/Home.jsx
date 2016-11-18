'use strict'

import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import {Grid, Divider, Dimmer, Loader} from 'semantic-ui-react'

import PageHeader from './PageHeader'
import ProfileSetup from './ProfileSetup'
import NationDetails from './NationDetails'
import CityDetails from './CityDetails'
import LoaderStore from './../stores/LoaderStore'

class Home extends React.Component {
  static getStores(props) {
    return [LoaderStore]
  }

  static getPropsFromStores(props) {
    return LoaderStore.getState()
  }

  render() {
    let loader = ''
    if (this.props.loaderShown) {
      loader = <Dimmer active>
        <Loader>{this.props.loaderMsg}</Loader>
      </Dimmer>
    }

    return (
      <div>
        {loader}
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={16}>
              <PageHeader />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <ProfileSetup />
            </Grid.Column>
            <Grid.Column width={12}>
              <NationDetails />
              <Divider hidden/>
              <CityDetails />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connectToStores(Home)
