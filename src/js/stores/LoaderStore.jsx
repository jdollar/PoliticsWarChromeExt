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
    console.log('test')
    this._updateLoader(true)
    //this._updateLoader(true, msg, loadRequester)
  }

  onHideLoader(hideRequester) {
    this._updateLoader(false)
    //this._updateLoader(false, '', hideRequester)
  }

  _updateLoader(show, msg, requester) {
    // if (show) {
    //   this._addToLoadersActive(requester)
    // } else {
    //   this._removeFromLoadersActive(requester)
    // }

    // let showLoader = show || this.state.loadersActive.length > 0
    let showLoader = show
    msg = typeof(msg) === 'undefined' ? 'Loading...' : msg

    this.setState({
      loaderShown: showLoader,
      loaderMsg: msg
    })
  }

  _removeFromLoadersActive(requester) {
    let index = this.state.loadersActive.indexOf(requester)
    if (index > -1) {
      let newLoadersActive = this.state.loadersActive.slice(index, index+1)
      this.setState({
        loadersActive: newLoadersActive
      })
    }
  }

  _addToLoadersActive(requester) {
    let index = this.state.loadersActive.indexOf(requester)
    if (index < 0){
      let loadersActive = this.state.loadersActive
      this.setState({
        loadersActive: loadersActive.push(requester)
      })
    }
  }
}

export default alt.createStore(LoaderStore, 'LoaderStore')
