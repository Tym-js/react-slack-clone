import * as actionTypes from "../actions/types"
import { combineReducers } from "redux"

const initialState = {
  currentUser: null,
  isLoading: true
}

const user_reducder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: user_reducder
})

export default rootReducer
