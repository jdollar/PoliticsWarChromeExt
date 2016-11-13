'use strict'

import React from 'react'
import {Grid} from 'semantic-ui-react'

import PageHeader from './PageHeader'
import ProfileSetup from './ProfileSetup'

class Home extends React.Component {

  render() {
    return (
      <Grid>
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

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home
