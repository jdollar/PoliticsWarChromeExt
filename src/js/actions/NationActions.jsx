'use strict'

import alt from './../alt'

class NationActions {
  constructor() {
    this.generateActions(
      'getNationDetails',
      'updateNationDetails',
      'errorNationDetails'
    )
  }
}

export default alt.createActions(NationActions)
