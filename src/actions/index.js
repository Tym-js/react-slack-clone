import * as actionsTypes from "./types";

export const setUser = user => ({
  type: actionsTypes.SET_USER,
  payload: {
    currentUser: user
  }
});

export const clearUser = () => ({
  type: actionsTypes.CLEAR_USER
});
