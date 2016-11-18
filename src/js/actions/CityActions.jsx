'use strict'

import alt from './../alt'

class CityActions {
  constructor() {
    this.generateActions(
      'getCityDetails',
      'updateCityDetails',
      'errorCityDetails'
    )
  }
}

export default alt.createActions(CityActions)
