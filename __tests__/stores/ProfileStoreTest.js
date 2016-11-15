'use strict'

import alt from './../../src/js/alt'
import wrappedProfileStore, {unwrappedProfileStore} from './../../src/js/stores/ProfileStore'
import ProfileActions from './../../src/js/actions/ProfileActions'
import StorageUtils from './../../src/js/utils/StorageUtil'

describe('ProfileStore', () => {
  let action

  beforeEach(() => {
    let storageMethods = Object.getOwnPropertyNames(StorageUtils).filter((property) => {
      return typeof(StorageUtils[property]) === "function"
    })

    for (let i = 0; i < storageMethods.length; i++) {
      spyOn(StorageUtils, storageMethods[i])
    }

  })

  describe('handleCreateProfile', () => {
    beforeEach(() => {
      action = ProfileActions.CREATE_NEW_PROFILE
      wrappedProfileStore.state.profileList = []
      wrappedProfileStore.state.profileListError = []
    })

    afterEach(() => {
      StorageUtils.isKeyValueExisting.calls.reset()
      StorageUtils.increment.calls.reset()
      StorageUtils.setObject.calls.reset()
    })

    it('should not add to profile list if key exists', () => {
      let data = {nationId: 'test'}

      StorageUtils.isKeyValueExisting.and.returnValue(true)

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.isKeyValueExisting.calls.count()).toEqual(1)

      let keyValueCall = StorageUtils.isKeyValueExisting.calls.mostRecent()
      expect(keyValueCall.args[0]).toEqual('profile')
      expect(keyValueCall.args[1]).toEqual('nationId')
      expect(keyValueCall.args[2]).toEqual(data.nationId)

      expect(wrappedProfileStore.getState().profileList).toEqual([])
    })

    it('should add to profile list if key not found', () => {
      let data = {nationId: 'test'}

      StorageUtils.isKeyValueExisting.and.returnValue(false)
      StorageUtils.increment.and.returnValue(1)
      StorageUtils.setObject.and.returnValue(data)

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.isKeyValueExisting.calls.count()).toEqual(1)
      expect(StorageUtils.increment.calls.count()).toEqual(1)
      expect(StorageUtils.setObject.calls.count()).toEqual(1)

      let keyValueCall = StorageUtils.isKeyValueExisting.calls.mostRecent()
      expect(keyValueCall.args[0]).toEqual('profile')
      expect(keyValueCall.args[1]).toEqual('nationId')
      expect(keyValueCall.args[2]).toEqual(data.nationId)

      let setObjectCall = StorageUtils.setObject.calls.mostRecent()
      expect(setObjectCall.args[0]).toEqual('profile1')
      expect(setObjectCall.args[1]).toEqual(data)

      expect(wrappedProfileStore.getState().profileList).toEqual([data])
    })

    it('should not add to profile list if there is a empty nationId', () => {
      let data = {nationId: ''}

      StorageUtils.isKeyValueExisting.and.returnValue(false)

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.isKeyValueExisting.calls.count()).toEqual(0)

      expect(wrappedProfileStore.getState().profileList).toEqual([])
      expect(wrappedProfileStore.getState().profileListError).toEqual('Invalid Nation ID')
    })

    it('should not add to profile list if there is no nationId in object', () => {
      let data = {test: ''}

      StorageUtils.isKeyValueExisting.and.returnValue(false)

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.isKeyValueExisting.calls.count()).toEqual(0)

      expect(wrappedProfileStore.getState().profileList).toEqual([])
      expect(wrappedProfileStore.getState().profileListError).toEqual('Invalid Nation ID')
    })
  })

  describe('handleUpdateProfile', () => {
    beforeEach(() => {
      action = ProfileActions.UPDATE_PROFILE
    })

    afterEach(() => {
      StorageUtils.updateObject.calls.reset()
    })

    it('should update profile list first item', () => {
      let data = {profileId: 'profile1', data: {nationId: 'test2'}}
      wrappedProfileStore.state.profileList = [{nationId: 'test'}]

      StorageUtils.updateObject.and.returnValue(data.data)

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.updateObject.calls.count()).toEqual(1)

      let updateObjectCall = StorageUtils.updateObject.calls.mostRecent()
      expect(updateObjectCall.args[0]).toEqual(data.profileId)
      expect(updateObjectCall.args[1]).toEqual(data.data)

      expect(wrappedProfileStore.getState().profileList).toEqual([data.data])
    })

    it('should update profile list at other index', () => {
      let data = {profileId: 'profile2', data: {nationId: 'test3'}}

      wrappedProfileStore.state.profileList = [
        {nationId: 'test'},
        {nationId: 'test2'},
        {nationId: 'test4'}
      ]

      let expectedArray = [
        {nationId: 'test'},
        {nationId: 'test3'},
        {nationId: 'test4'}
      ]

      StorageUtils.updateObject.and.returnValue(data.data)

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.updateObject.calls.count()).toEqual(1)

      let updateObjectCall = StorageUtils.updateObject.calls.mostRecent()
      expect(updateObjectCall.args[0]).toEqual(data.profileId)
      expect(updateObjectCall.args[1]).toEqual(data.data)

      expect(wrappedProfileStore.getState().profileList).toEqual(expectedArray)
    })
  })

  describe('handleFetchAllProfiles', () => {
    beforeEach(() => {
      action = ProfileActions.FETCH_ALL_PROFILES
    })

    afterEach(() => {
      StorageUtils.getAllObjectItems.calls.reset()
    })

    it ('should update profile list from storage utils', () => {
      let data = undefined
      let expectedArray = [1]

      StorageUtils.getAllObjectItems.and.returnValue([1])

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.getAllObjectItems.calls.count()).toEqual(1)

      let getAllObjectItemsCall = StorageUtils.getAllObjectItems.calls.mostRecent()
      expect(getAllObjectItemsCall.args[0]).toEqual('profile')

      expect(wrappedProfileStore.getState().profileList).toEqual(expectedArray)
    })
  })

  describe('handleFetchProfile', () => {
    beforeEach(() => {
      action = ProfileActions.FETCH_PROFILE
    })

    afterEach(() => {
      StorageUtils.getObjectValue.calls.reset()
    })

    it ('should setup current profile from storage utils', () => {
      let data = 1
      let expectedObject = {nationId: 1}

      StorageUtils.getObjectValue.and.returnValue(expectedObject)

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.getObjectValue.calls.count()).toEqual(1)

      let getObjectValueCall = StorageUtils.getObjectValue.calls.mostRecent()
      expect(getObjectValueCall.args[0]).toEqual('profile1')

      expect(wrappedProfileStore.getState().currentProfile).toEqual(expectedObject)
    })
  })

  describe('handleUpdateNationId', () => {
    beforeEach(() => {
      action = ProfileActions.UPDATE_NATION_ID
    })

    it ('should update nation id', () => {
      let data = 1

      alt.dispatcher.dispatch({action, data})

      expect(wrappedProfileStore.getState().nationId).toEqual(1)
    })
  })

  describe('handleDeleteAllProfiles', () => {
    beforeEach(() => {
      action = ProfileActions.DELETE_ALL_PROFILES
    })

    afterEach(() => {
      StorageUtils.removeAllItems.calls.reset()
    })

    it('should set profile list as empty array', () => {
      let data = undefined
      wrappedProfileStore.state.profileList = [{nationId: 'test'}]

      alt.dispatcher.dispatch({action, data})

      expect(StorageUtils.removeAllItems.calls.count()).toEqual(1)

      let removeAllItemsCall = StorageUtils.removeAllItems.calls.mostRecent()
      expect(removeAllItemsCall.args[0]).toEqual('profile')
      expect(removeAllItemsCall.args[1]).toEqual('profileKeyCount')

      expect(wrappedProfileStore.getState().profileList).toEqual([])
    })
  })
})
