'use strict'

import alt from './../../src/js/alt'
import NationStore, {unwrappedNationStore} from './../../src/js/stores/NationStore'
import ProfileActions from './../../src/js/actions/ProfileActions'
import NationActions from './../../src/js/actions/NationActions'
import ProfileStore from './../../src/js/stores/ProfileStore'

describe('NationStore', () => {
  let action

  describe('onSelectProfile', () => {
    beforeAll(() => {
      action = ProfileActions.SELECT_PROFILE
      NationStore.state.nationId = ''

      spyOn(alt.dispatcher, 'waitFor')
      spyOn(ProfileStore, 'getState')
      alt.dispatcher.waitFor.and.stub()
    })

    it('should set nation id from profile store', () => {
      let data = 1
      let profileState = {currentProfile: {nationId: 'test'}}

      ProfileStore.getState.and.returnValue(profileState)

      alt.dispatcher.dispatch({action, data})

      expect(NationStore.getState().nationId).toEqual('test')
    })
  })

  describe('onUpdateNationDetails', () => {
    beforeAll(() => {
      action = NationActions.UPDATE_NATION_DETAILS
    })

    it('should set nation details from response data', () => {
      let data = {data: 1}

      alt.dispatcher.dispatch({action, data})

      expect(NationStore.getState()).toEqual(1)
    })
  })
})
