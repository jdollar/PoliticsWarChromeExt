'use strict'

import alt from './../alt'

import ProfileActions from './../actions/ProfileActions'
import StorageUtils from './../utils/StorageUtil'

const PROFILE_KEY_COUNT = 'profileKeyCount'
const PROFILE_KEY_PREFIX = 'profile'

const INVALID_NATION_ID = 'Invalid Nation ID'
const NATION_ID_NOT_NUMBERIC = "Nation ID must be numeric"

class ProfileStore {
  constructor() {
    this.state = {
      profileList: [],
      currentProfile: {},
      currentProfileSelection: '',
      nationId: '',
      nationIdError: ''
    }

    this.bindListeners({
      handleCreateProfile: ProfileActions.CREATE_NEW_PROFILE,
      handleUpdateProfile: ProfileActions.UPDATE_PROFILE,
      handleFetchAllProfilesAndAssign: ProfileActions.FETCH_ALL_PROFILES_AND_ASSIGN,
      handleFetchAllProfiles: ProfileActions.FETCH_ALL_PROFILES,
      handleSelectProfile: ProfileActions.SELECT_PROFILE,
      handleFetchProfile: ProfileActions.FETCH_PROFILE,
      handleUpdateNationId: ProfileActions.UPDATE_NATION_ID,
      handleDeleteAllProfiles: ProfileActions.DELETE_ALL_PROFILES,
      handleClearNationId: ProfileActions.CLEAR_NATION_ID
    })
  }

  handleCreateProfile(profileData) {
    if (typeof(profileData.nationId) === "undefined" || profileData.nationId === '') {
      this.setState({
        nationIdError: INVALID_NATION_ID
      })
      return
    }

    if (!StorageUtils.isKeyValueExisting(PROFILE_KEY_PREFIX, 'nationId', profileData.nationId)) {
      let profileIdentifier = StorageUtils.increment(PROFILE_KEY_COUNT)
      profileData = StorageUtils.setObject(PROFILE_KEY_PREFIX + profileIdentifier, profileData)

      let currentProfileList = this.state.profileList
      currentProfileList.push(profileData)
      this.setState({
        profileList: currentProfileList
      })

      this.handleClearNationId()
    }
  }

  handleUpdateProfile(profileData) {
    let profileId = profileData.profileId
    let profileInfo = profileData.data
    let profile = StorageUtils.updateObject(profileId, profileInfo)
    let profileListIndex = parseInt(profileId.replace(PROFILE_KEY_PREFIX, '')) - 1
    let currentProfileList = this.state.profileList

    currentProfileList[profileListIndex] = profile
    this.setState({
      profileList: currentProfileList
    })
  }

  handleFetchAllProfilesAndAssign(assignValue) {
    let allProfiles = StorageUtils.getAllObjectItems(PROFILE_KEY_PREFIX)
    let profilesReturned = typeof(allProfiles) !== "undefined" && allProfiles.length > 0
    if (!profilesReturned) {
      return
    }

    let isAssignValuePassed = assignValue !== null && typeof(assignValue) !== "undefined"
    let assignIndex = 0

    if (isAssignValuePassed) {
      for (let i = 0; i < allProfiles.length; i++) {
        if (allProfiles[i].id === assignValue) {
          assignIndex = i
          break
        }
      }
    }

    this.setState({
      profileList: allProfiles,
      currentProfile: allProfiles[assignIndex],
      currentProfileSelection: allProfiles[assignIndex].id
    })
  }

  handleFetchAllProfiles() {
    let allProfiles = StorageUtils.getAllObjectItems(PROFILE_KEY_PREFIX)
    this.setState({
      profileList: allProfiles
    })
  }

  handleFetchProfile(profileId) {
    let profileIdPrefixed = PROFILE_KEY_PREFIX + profileId
    this.setState({
      currentProfile: StorageUtils.getObjectValue(profileIdPrefixed)
    })
  }

  handleSelectProfile(prefixedProfileId) {
    this.setState({
      currentProfileSelection: prefixedProfileId,
      currentProfile: this._getObjectByValue(this.state.profileList, 'id', prefixedProfileId)
    })
  }

  handleUpdateNationId(nationIdInput) {
    if (nationIdInput === '' || nationIdInput.match(/^\d+$/)) {
      this.setState({
        nationId: nationIdInput,
        nationIdError: ''
      })
    }
  }

  handleDeleteAllProfiles() {
    StorageUtils.removeAllItems(PROFILE_KEY_PREFIX, PROFILE_KEY_COUNT)
    this.handleClearNationId()
    this.setState({
      profileList: []
    })
  }

  handleClearNationId() {
    this.setState({
      nationId: '',
      nationIdError: ''
    })
  }

  _getObjectByValue(objectList, key, value) {
    for (let i = 0; i < objectList.length; i++) {
      if (objectList[i][key] === value) {
        return objectList[i]
      }
    }
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore')
