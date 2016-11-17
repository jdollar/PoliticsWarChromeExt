'use strict'

import alt from './../alt'
import NationActions from './../actions/NationActions'
import ProfileActions from './../actions/ProfileActions'
import NationSource from './../sources/NationSource'
import ProfileStore from './../stores/ProfileStore'

class NationStore {
  constructor() {
    this.state = {
      nationId: '',
      nationDetails: ''
    }

    this.registerAsync(NationSource)
    this.bindActions(NationActions)
    this.bindListeners({
      onSelectProfile: ProfileActions.SELECT_PROFILE
    })
  }

  onSelectProfile(nationId) {
    this.waitFor(ProfileStore)
    this.setState({
      nationId: ProfileStore.getState().currentProfile.nationId
    })
  }

  onGetNationDetails() {
    if (this.state.nationId !== '') {
      this.getInstance().performGetNationDetails()
    }
  }

  onUpdateNationDetails(response) {
    this.setState({
      nationDetails: response.data
    })
  }

  onErrorNationDetails(response) {
    console.log(response)
  }
}

export default alt.createStore(NationStore, 'NationStore')
