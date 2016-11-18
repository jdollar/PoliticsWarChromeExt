'use strict'

import alt from './../alt'
import CityActions from './../actions/CityActions'
import NationActions from './../actions/NationActions'
import CitySource from './../sources/CitySource'
import NationStore, {wrappedStore} from './../stores/NationStore'

class CityStore {
  constructor() {
    this.state = {
      cityIdSelection: '',
      citiesDetails: []
    }

    this.registerAsync(CitySource)
    this.bindActions(CityActions)
    this.bindListeners({
      onUpdateNationDetails: NationActions.UPDATE_NATION_DETAILS
    })
  }

  onUpdateNationDetails(response) {
    this.waitFor(NationStore)
    let cityIds = NationStore.getState().cityids
    this.setState({
      citiesDetails: []
    })
    for (let i = 0; i < cityIds.length; i++) {
      this.getInstance().performGetCityDetails(cityIds[i])
    }
  }

  onGetCityDetails(cityId) {
    this.getInstance().performGetCityDetails(cityId)
  }

  onUpdateCityDetails(response) {
    let cityDetails = this.state.citiesDetails
    cityDetails.push(response.data)
    this.setState({
      citiesDetails: cityDetails
    })
  }

  onErrorCityDetails(response) {
    console.log(response)
  }
}

export default alt.createStore(CityStore, 'CityStore')
