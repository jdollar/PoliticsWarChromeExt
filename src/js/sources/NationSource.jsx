'use strict'
import axios from 'axios'
import NationActions from './../actions/NationActions'
const constants = require('./../../../src/js/constants.json')

const NationSource = {
  performGetNationDetails: {
    remote(state) {
      let url = String.raw`${constants.pwBaseApiUrl}${constants.endpoints.nation}id=${state.nationId}`
      return axios.get(url)
    },

    success: NationActions.updateNationDetails,
    error: NationActions.errorNationDetails
  }
}

export default NationSource
