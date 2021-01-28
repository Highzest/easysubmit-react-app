import auth from './auth'
import { combineReducers } from 'redux'
import homework from './homework'
import message from './message'
import quiz from './quiz'

export default combineReducers({
  auth,
  message,
  homework,
  quiz,
})
