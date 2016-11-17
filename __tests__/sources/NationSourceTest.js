'use strict'

import axios from 'axios'
import NationSource from './../../src/js/sources/NationSource'
const constants = require('./../../src/js/constants.json')

describe('NationSource', () => {
  beforeAll(() => {
    spyOn(axios, 'get')
  })

  describe('performGetNationDetails', () => {
    describe('remote', () => {
      it('should make a call to the nation endpoint', () => {
        let expectedUrl = constants.pwBaseApiUrl + constants.endpoints.nation
                            + 'id=test'
        NationSource.performGetNationDetails.remote({nationId: 'test'})
        expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      })
    })
  })
})
