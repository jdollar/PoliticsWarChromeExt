'use strict'
import alt from './../alt'

class ProfileActions {
  constructor() {
    this.generateActions(
      'createNewProfile',
      'fetchProfile',
      'updateNationId',
      'selectProfile',
      'fetchAllProfilesAndAssign',
      'fetchAllProfiles',
      'deleteAllProfiles',
      'clearNationId'
    )
  }

  updateProfile(profileIdInput, profileData) {
    return {profileId: profileIdInput, data: profileData}
  }
}

export default alt.createActions(ProfileActions)
