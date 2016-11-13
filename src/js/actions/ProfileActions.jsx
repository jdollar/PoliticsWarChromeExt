var alt = require('./../alt')

class ProfileActions {
  createNewProfile(profileData) {
    return profileData
  }

  updateProfile(profileIdInput, profileData) {
    return {profileId: profileIdInput, data: profileData}
  }

  fetchAllProfiles() {
    return true
  }

  fetchProfile(profileId) {
    return profileId
  }

  updateNationId(nationId) {
    return nationId
  }

  deleteAllProfiles() {
    return true
  }
}

module.exports = alt.createActions(ProfileActions)
