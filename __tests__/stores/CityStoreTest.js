'use strict'

import alt from './../../src/js/alt'
import CityStore, {unwrappedCityStore} from './../../src/js/stores/CityStore'
import NationActions from './../../src/js/actions/NationActions'
import CityActions from './../../src/js/actions/CityActions'
import NationStore, {wrappedStore} from './../../src/js/stores/NationStore'

describe('CityStore', () => {
  let action

  describe('onUpdateCityDetails', () => {
    beforeAll(() => {
      action = NationActions.UPDATE_NATION_DETAILS

      spyOn(alt.dispatcher, 'waitFor')
      spyOn(NationStore, 'getState')
      spyOn(CityStore, 'performGetCityDetails')
      alt.dispatcher.waitFor.and.stub()
    })

    it('should keep city ids clear if empty in nation store', () => {
      let data = {data: 1}
      let nationState = {cityids: []}

      NationStore.getState.and.returnValue(nationState)

      alt.dispatcher.dispatch({action, data})

      expect(CityStore.getState().citiesDetails).toEqual([])
      expect(CityStore.performGetCityDetails).not.toHaveBeenCalled()
    })

    it('should clear city ids if nation details has empty city ids', () => {
      let data = {data: 1}
      let nationState = {cityids: []}
      CityStore.state.citiesDetails = [2]

      NationStore.getState.and.returnValue(nationState)

      alt.dispatcher.dispatch({action, data})

      expect(CityStore.getState().citiesDetails).toEqual([])
      expect(CityStore.performGetCityDetails).not.toHaveBeenCalled()
    })

    it('should call perform search for each city id', () => {
      let data = {data: 1}
      let nationState = {cityids: [1, 2]}

      NationStore.getState.and.returnValue(nationState)

      alt.dispatcher.dispatch({action, data})

      expect(CityStore.performGetCityDetails).toHaveBeenCalled()
      expect(CityStore.performGetCityDetails.calls.count()).toEqual(2)
    })
  })

  describe('onUpdateCityDetails', () => {
    beforeAll(() => {
      action = CityActions.UPDATE_CITY_DETAILS
    })

    it('should set nation details from response data', () => {
      let data = {data: 1}

      alt.dispatcher.dispatch({action, data})

      expect(CityStore.getState().citiesDetails).toEqual([1])
    })
  })
})
