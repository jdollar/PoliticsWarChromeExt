'use strict'
import alt from './../alt'

class ProfileActions {
  constructor() {
    this.generateActions('createNewProfile', 'fetchProfile', 'updateNationId', 'selectProfile')
  }

  updateProfile(profileIdInput, profileData) {
    return {profileId: profileIdInput, data: profileData}
  }

  fetchAllProfiles() {
    return true
  }

  deleteAllProfiles() {
    return true
  }

  clearNationId() {
    return true
  }
}

export default alt.createActions(ProfileActions)
