'use strict'

import alt from './../alt'
import LoaderActions from './../actions/LoaderActions'
import ProfileActions from './../actions/ProfileActions'
import NationActions from './../actions/NationActions'
import CityActions from './../actions/CityActions'

class LoaderStore {
  constructor() {
    this.state = {
      loaderShown: false,
      loaderMsg: '',
      loadersActive: []
    }
    this.bindActions(LoaderActions)
    this.bindListeners({
      onShowLoader: [
        ProfileActions.SELECT_PROFILE,
        NationActions.GET_NATION_DETAILS,
        CityActions.GET_CITY_DETAILS
      ],
      onHideLoader: [
        //NationActions.UPDATE_NATION_DETAILS, //Flow continues to city
        NationActions.ERROR_NATION_DETAILS,
        CityActions.UPDATE_CITY_DETAILS,
        CityActions.ERROR_CITY_DETAILS
      ]
    })
  }

  onShowLoader() {
    this._updateLoader(true)
  }

  onHideLoader() {
    this._updateLoader(false)
  }

  _updateLoader(show, msg) {
    msg = typeof(msg) === 'undefined' ? 'Loading...' : msg

    this.setState({
      loaderShown: show,
      loaderMsg: msg
    })
  }
}

export default alt.createStore(LoaderStore, 'LoaderStore')
