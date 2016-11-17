import alt from './../../src/js/alt'

import ActionsTestUtils from './../testUtils/ActionsTestUtils'
import NationActions from './../../src/js/actions/NationActions'

describe('NationActions', () => {
  beforeEach(() => {
    spyOn(alt.dispatcher, 'dispatch')
  })

  afterEach(() => {
    alt.dispatcher.dispatch.calls.reset()
  })

  describe('getNationDetails', () => {
    it('should display get nation details with no data', () => {
      let action = NationActions.GET_NATION_DETAILS
      ActionsTestUtils.testDispatcherCall(action, NationActions.getNationDetails, null, undefined)
    })
  })

  describe('updateNationDetails', () => {
    it('should dispatch update profile action with data and id', () => {
      let action = NationActions.UPDATE_NATION_DETAILS
      ActionsTestUtils.testDispatcherCall(action, NationActions.updateNationDetails, null, undefined)
    })
  })

  describe('errorNationDetails', () => {
    it('should dispatch create new profile action with data', () => {
      let action = NationActions.ERROR_NATION_DETAILS
      ActionsTestUtils.testDispatcherCall(action, NationActions.errorNationDetails, null, undefined)
    })
  })
})
