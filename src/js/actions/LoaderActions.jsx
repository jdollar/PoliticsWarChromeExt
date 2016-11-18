'use strict'

import alt from './../alt'

class LoaderActions {
  constructor() {
    this.generateActions(
      'showLoader',
      'hideLoader'
    )
  }
}

export default alt.createActions(LoaderActions)
