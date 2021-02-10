import {
  ADD_CHOICE,
  ADD_NEW_QUESTION,
  DELETE_CHOICE,
  DELETE_QUESTION,
  SAVE_QUESTION,
} from './types'

export const addChoice = (id) => ({
  type: ADD_CHOICE,
  payload: { id },
})

export const addNewQuestion = (qType) => ({
  type: ADD_NEW_QUESTION,
  payload: { qType },
})

export const deleteChoice = (qID, cID) => ({
  type: DELETE_CHOICE,
  payload: { qID, cID },
})

export const deleteQuestion = (id) => ({
  type: DELETE_QUESTION,
  payload: { id },
})

export const saveQuestion = (id) => ({
  type: SAVE_QUESTION,
  payload: { id },
})
