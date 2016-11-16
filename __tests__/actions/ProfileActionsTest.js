import alt from './../../src/js/alt'

import ProfileActions from './../../src/js/actions/ProfileActions'

describe('ProfileActions', () => {
  beforeEach(() => {
    spyOn(alt.dispatcher, 'dispatch')
  })

  afterEach(() => {
    alt.dispatcher.dispatch.calls.reset()
  })

  describe('createNewProfile', () => {
    it('should dispatch create new profile action with data', () => {
      let action = ProfileActions.CREATE_NEW_PROFILE
      let profileData = {nationId: 'test'}
      testDispatcherCall(action, ProfileActions.createNewProfile, profileData, [profileData])
    })
  })

  describe('updateProfile', () => {
    it('should dispatch update profile action with data and id', () => {
      let action = ProfileActions.UPDATE_PROFILE
      let profileData = {nationId: 'test'}
      let expectedData = {profileId: 1, data: profileData}
      testDispatcherCall(action, ProfileActions.updateProfile, expectedData, [1, profileData])
    })
  })

  describe('fetchAllProfilesAndAssign', () => {
    it('should dispatch all profiles action without value', () => {
      let action = ProfileActions.FETCH_ALL_PROFILES_AND_ASSIGN
      testDispatcherCall(action, ProfileActions.fetchAllProfilesAndAssign, null, undefined)
    })

    it('should dispatch all profiles action with value', () => {
      let action = ProfileActions.FETCH_ALL_PROFILES_AND_ASSIGN
      testDispatcherCall(action, ProfileActions.fetchAllProfilesAndAssign, 1, [1])
    })
  })

  describe('createNewProfile', () => {
    it('should dispatch fetch all profiles action', () => {
      let action = ProfileActions.FETCH_ALL_PROFILES
      testDispatcherCall(action, ProfileActions.fetchAllProfiles, true, undefined)
    })
  })

  describe('selectProfile', () => {
    it('should dispatch a select profile request', () => {
      let action = ProfileActions.SELECT_PROFILE
      testDispatcherCall(action, ProfileActions.selectProfile, 'profile1', ['profile1'])
    })
  })

  describe('fetchProfile', () => {
    it('should return the profile id and dispatch it', () => {
      let action = ProfileActions.FETCH_PROFILE
      testDispatcherCall(action, ProfileActions.fetchProfile, 1, [1])
    })
  })

  describe('updateNationId', () => {
    it('should return the nation id and dispatch it', () => {
      let action = ProfileActions.UPDATE_NATION_ID
      testDispatcherCall(action, ProfileActions.updateNationId, 1, [1])
    })
  })

  describe('deleteAllProfiles', () => {
    it('should dispatch a delete all profiles', () => {
      let action = ProfileActions.DELETE_ALL_PROFILES
      testDispatcherCall(action, ProfileActions.deleteAllProfiles, true, undefined)
    })
  })

  describe('clearNationId', () => {
    it('should dispatch a clear nation Id', () => {
      let action = ProfileActions.CLEAR_NATION_ID
      testDispatcherCall(action, ProfileActions.clearNationId, true, undefined)
    })
  })

  function testDispatcherCall(action, actionMethod, payload, args) {
    if (typeof(args) !== "undefined") {
      expect(actionMethod(...args)).toEqual(payload)
    } else {
      expect(actionMethod()).toEqual(payload)
    }


    expect(alt.dispatcher.dispatch.calls.count()).toEqual(1)

    let dispatcherCall = alt.dispatcher.dispatch.calls.mostRecent()
    expect(dispatcherCall.args[0].action).toEqual(action)
    expect(dispatcherCall.args[0].payload).toEqual(payload)
  }
})
