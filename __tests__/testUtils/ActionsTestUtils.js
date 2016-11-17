'use strict'

import alt from './../../src/js/alt'

class ActionsTestUtils {
  constructor() {

  }
  static testDispatcherCall(action, actionMethod, payload, args) {
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
}

export default ActionsTestUtils
