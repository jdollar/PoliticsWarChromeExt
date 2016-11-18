import alt from './../../src/js/alt'

import ActionsTestUtils from './../testUtils/ActionsTestUtils'
import CityActions from './../../src/js/actions/CityActions'

describe('CityActions', () => {
  beforeEach(() => {
    spyOn(alt.dispatcher, 'dispatch')
  })

  afterEach(() => {
    alt.dispatcher.dispatch.calls.reset()
  })

  describe('getCityDetails', () => {
    it('should display get nation details with no data', () => {
      let action = CityActions.GET_CITY_DETAILS
      ActionsTestUtils.testDispatcherCall(action, CityActions.getCityDetails, null, undefined)
    })
  })

  describe('updateCityDetails', () => {
    it('should dispatch update profile action with data and id', () => {
      let action = CityActions.UPDATE_CITY_DETAILS
      ActionsTestUtils.testDispatcherCall(action, CityActions.updateCityDetails, null, undefined)
    })
  })

  describe('errorCityDetails', () => {
    it('should dispatch create new profile action with data', () => {
      let action = CityActions.ERROR_CITY_DETAILS
      ActionsTestUtils.testDispatcherCall(action, CityActions.errorCityDetails, null, undefined)
    })
  })
})
