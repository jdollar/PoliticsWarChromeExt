'use strict'
import axios from 'axios'
import CityActions from './../actions/CityActions'
const constants = require('./../../../src/js/constants.json')
const cityApiUrl = String.raw`${constants.pwBaseApiUrl}${constants.endpoints.city}`

const CitySource = {
  performGetCityDetails: {
    remote(state, cityId) {
      let url = String.raw`${cityApiUrl}id=${cityId}`
      return axios.get(url)
    },

    success: CityActions.updateCityDetails,
    error: CityActions.errorCityDetails
  }
}

export default CitySource
