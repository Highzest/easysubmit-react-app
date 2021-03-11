import {
  CLEAR_HOMEWORK,
  CREATE_HOMEWORK,
  FETCH_HOMEWORK,
  SUBMIT_HOMEWORK,
  UPDATE_HOMEWORK,
} from '../actions/types'

const teacherLink = JSON.parse(localStorage.getItem('teacherLink'))
const studentLink = JSON.parse(localStorage.getItem('studentLink'))

const initialState =
  teacherLink && studentLink
    ? { teacherLink, studentLink, homeworks: [], content: '', files: [] }
    : {
        teacherLink: null,
        studentLink: null,
        homeworks: [],
        content: '',
        files: [],
      }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_HOMEWORK:
      return {
        ...state,
        ...payload,
        homeworks:
          payload.homeworks != null
            ? payload.homeworks.map((h) => {
                return {
                  ...h,
                  isGraded: h.grade.trim() !== '',
                }
              })
            : [],
      }
    case UPDATE_HOMEWORK:
      return {
        ...state,
        homeworks: state.homeworks.map((h) => {
          if (h.id !== payload.id) {
            return h
          }

          return {
            ...h,
            ...payload,
          }
        }),
      }
    case FETCH_HOMEWORK:
      return {
        ...state,
      }
    case SUBMIT_HOMEWORK:
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
