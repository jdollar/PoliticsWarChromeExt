'use strict'

import React from 'react'
import {Grid, Divider} from 'semantic-ui-react'

import PageHeader from './PageHeader'
import ProfileSetup from './ProfileSetup'
import NationDetails from './NationDetails'
import CityDetails from './CityDetails'

class Home extends React.Component {

  render() {
    return (
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
    )
  }
}

export default Home
