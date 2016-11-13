'use strict'

import alt from './../alt'

import ProfileActions from './../actions/ProfileActions'
import StorageUtils from './../utils/StorageUtil'

const PROFILE_KEY_COUNT = 'profileKeyCount'
const PROFILE_KEY_PREFIX = 'profile'

class ProfileStore {
  constructor() {
    this.profileList = []
    this.currentProfile = {}
    this.nationId = ''
    this.bindListeners({
      handleCreateProfile: ProfileActions.CREATE_NEW_PROFILE,
      handleUpdateProfile: ProfileActions.UPDATE_PROFILE,
      handleFetchAllProfiles: ProfileActions.FETCH_ALL_PROFILES,
      handleFetchProfile: ProfileActions.FETCH_PROFILE,
      handleUpdateNationId: ProfileActions.UPDATE_NATION_ID,
      handleDeleteAllProfiles: ProfileActions.DELETE_ALL_PROFILES
    })
  }

  handleCreateProfile(profileData) {
    if (!StorageUtils.isKeyValueExisting(PROFILE_KEY_PREFIX, 'nationId', profileData.nationId)) {
      let profileIdentifier = StorageUtils.increment(PROFILE_KEY_COUNT)
      profileData = StorageUtils.setObject(PROFILE_KEY_PREFIX + profileIdentifier, profileData)
      this.profileList.push(profileData)
    }
  }

  handleUpdateProfile(profileData) {
    let profileId = profileData.profileId
    let profileInfo = profileData.data
    let profile = StorageUtils.updateObject(profileId, profileInfo)
    this.profileList[profileId.replace(PROFILE_KEY_PREFIX, '')] = profile
  }

  handleFetchAllProfiles() {
    this.profileList = StorageUtils.getAllObjectItems(PROFILE_KEY_PREFIX)
  }

  handleFetchProfile(profileId) {
    currentProfile = StorageUtils.getObjectValue(PROFILE_KEY_PREFIX + profileId)
  }

  handleUpdateNationId(nationIdInput) {
    this.nationId = nationIdInput
  }

  handleDeleteAllProfiles() {
    StorageUtils.removeAllItems(PROFILE_KEY_PREFIX, PROFILE_KEY_COUNT)
    this.profileList = []
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore')
