'use strict'

var alt = require('./../alt')
var ProfileActions = require('./../actions/ProfileActions')
var PROFILE_KEY_COUNT = 'profileKeyCount'
var PROFILE_KEY_PREFIX = 'profile'

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
    let keyCount = this._getProfileKeyCount()
    keyCount = parseInt(keyCount) + 1
    localStorage.setItem(PROFILE_KEY_COUNT, keyCount)
    localStorage.setItem(PROFILE_KEY_PREFIX + keyCount, JSON.stringify(profileData))
    this.profileList.push(profileData)
  }

  //TODO: update state for this guy
  handleUpdateProfile(profileData) {
    let profileId = profileData.profileId
    let profileInfo = profileData.data

    let profile = this._getProfileFromStorage(profileId)

    for (var key in profileInfo) {
      if (profileInfo.hasOwnProperty(key)) {
        profile[key] = profileInfo[key]
      }
    }
    localStorage.setItem(PROFILE_KEY_PREFIX + profileId, JSON.stringify(profile))
  }

  handleFetchAllProfiles() {
    let keyCount = this._getProfileKeyCount()
    console.log(keyCount)
    for (var i = 1; i <= keyCount; i++) {
      this.profileList.push(this._getProfileFromStorage(i))
    }
  }

  handleFetchProfile(profileId) {
    currentProfile = this._getProfileFromStorage(profileId)
  }

  handleUpdateNationId(nationIdInput) {
    this.nationId = nationIdInput
  }

  handleDeleteAllProfiles() {
    for (var i = 1; i <= this._getProfileKeyCount(); i++) {
      localStorage.removeItem(PROFILE_KEY_PREFIX + i)
    }
    localStorage.removeItem(PROFILE_KEY_COUNT)
    this.profileList = []
  }

  _getProfileKeyCount() {
    let keyCount = localStorage.getItem(PROFILE_KEY_COUNT)
    if (typeof(keyCount) === 'undefined') {
      keyCount = 0
    }

    return parseInt(keyCount)
  }

  _getProfileFromStorage(id) {
    if (id <= this._getProfileKeyCount()) {
      return JSON.parse(localStorage.getItem(PROFILE_KEY_PREFIX + id))
    } else {
      return {}
    }
  }
}

module.exports = alt.createStore(ProfileStore, 'ProfileStore')
