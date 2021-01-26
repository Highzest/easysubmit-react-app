import {
  CLEAR_HOMEWORK,
  CREATE_HOMEWORK,
  FETCH_HOMEWORK,
  GRADE_HOMEWORK,
  SUBMIT_HOMEWORK,
} from '../actions/types'

const teacherLink = JSON.parse(localStorage.getItem('teacherLink'))
const studentLink = JSON.parse(localStorage.getItem('studentLink'))

const initialState =
  teacherLink && studentLink
    ? { teacherLink, studentLink }
    : { teacherLink: null, studentLink: null }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_HOMEWORK:
      return {
        ...payload,
      }
    case FETCH_HOMEWORK:
      return {
        ...state,
      }
    case SUBMIT_HOMEWORK:
      return {
        ...state,
      }
    case GRADE_HOMEWORK:
      return {
        ...state,
      }
    case CLEAR_HOMEWORK:
      return {
        ...state,
        studentLink: null,
        teacherLink: null,
      }
    default:
      return state
  }
}
