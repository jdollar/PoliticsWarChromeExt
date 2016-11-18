'use strict'

import axios from 'axios'
import CitySource from './../../src/js/sources/CitySource'
const constants = require('./../../src/js/constants.json')

describe('CitySource', () => {
  beforeAll(() => {
    spyOn(axios, 'get')
  })

  describe('performGetCityDetails', () => {
    describe('remote', () => {
      it('should make a call to the City endpoint', () => {
        let expectedUrl = constants.pwBaseApiUrl + constants.endpoints.city
                            + 'id=test'
        CitySource.performGetCityDetails.remote(undefined, 'test')
        expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      })
    })
  })
})
