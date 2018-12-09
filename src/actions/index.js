import * as actionsTypes from "./types"

export const setUser = user => ({
  type: actionsTypes.SET_USER,
  payload: {
    currentUser: user
  }
})
