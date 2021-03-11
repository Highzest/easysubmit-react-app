import {
  ADD_CHOICE,
  ADD_NEW_QUESTION,
  CREATE_QUIZ,
  DELETE_CHOICE,
  DELETE_QUESTION,
  FETCH_QUIZ,
  SAVE_QUESTION,
  SUBMIT_QUIZ,
  UPDATE_CHOICE,
  UPDATE_CHOICES,
} from '../actions/types'

const teacherLink = JSON.parse(localStorage.getItem('teacherQuizLink'))
const studentLink = JSON.parse(localStorage.getItem('studentQuizLink'))

const initialState =
  teacherLink && studentLink
    ? { teacherLink, studentLink, questions: [], content: '' }
    : { teacherLink: null, studentLink: null, questions: [], content: '' }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SUBMIT_QUIZ:
      return {
        ...state,
      }
    case ADD_NEW_QUESTION:
      switch (payload.qType) {
        case 'single':
          return {
            ...state,
            ...payload,
            questions: [
              ...state.questions,
              {
                id:
                  state.questions.length > 0
                    ? state.questions[state.questions.length - 1].id + 1
                    : 0,
                qType: 'single',
                content: '',
                fixed: false,
                choices: [
                  {
                    id: 0,
                    content: '',
                    correct: false,
                  },
                ],
              },
            ],
          }
        case 'multiple':
          return {
            ...state,
            questions: [
              ...state.questions,
              {
                id:
                  state.questions.length > 0
                    ? state.questions[state.questions.length - 1].id + 1
                    : 0,
                qType: 'multiple',
                content: '',
                fixed: false,
                choices: [
                  {
                    id: 0,
                    content: '',
                    correct: false,
                  },
                ],
              },
            ],
          }
        case 'truefalse':
          return {
            ...state,
            questions: [
              ...state.questions,
              {
                id:
                  state.questions.length > 0
                    ? state.questions[state.questions.length - 1].id + 1
                    : 0,
                qType: 'truefalse',
                content: '',
                fixed: false,
                answer: false,
              },
            ],
          }
        case 'open':
          return {
            ...state,
            questions: [
              ...state.questions,
              {
                id:
                  state.questions.length > 0
                    ? state.questions[state.questions.length - 1].id + 1
                    : 0,
                qType: 'open',
                content: '',
                fixed: false,
                answer: '',
              },
            ],
          }
      }
    case ADD_CHOICE:
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== payload.id) {
            // This isn't the item we care about - keep it as-is
            return q
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...q,
            choices: [
              ...q.choices,
              {
                id:
                  q.choices.length > 0
                    ? q.choices[q.choices.length - 1].id + 1
                    : 0,
                content: '',
                correct: false,
              },
            ],
          }
        }),
      }
    case UPDATE_CHOICE:
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== payload.qID) {
            // This isn't the item we care about - keep it as-is
            return q
          }

          const idx = q.choices.findIndex((c) => c.id === payload.choice.id)

          // Otherwise, this is the one we want - return an updated value
          return {
            ...q,
            choices: [
              ...q.choices.slice(0, idx),
              {
                ...q.choices[idx],
                ...payload.choice,
              },
              ...q.choices.slice(idx + 1),
            ],
          }
        }),
      }
    case UPDATE_CHOICES:
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== payload.qID) {
            // This isn't the item we care about - keep it as-is
            return q
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...q,
            choices: q.choices.map((c) => {
              return {
                ...c,
                correct: c.id !== payload.cID ? false : true,
              }
            }),
          }
        }),
      }
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter((q) => payload.id !== q.id),
      }
    case SAVE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== payload.id) {
            // This isn't the item we care about - keep it as-is
            return q
          }
          return {
            ...q,
            ...payload,
          }
        }),
      }
    case DELETE_CHOICE:
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== payload.qID) {
            // This isn't the item we care about - keep it as-is
            return q
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...q,
            choices: q.choices.filter((c) => payload.cID !== c.id),
          }
        }),
      }
    case CREATE_QUIZ:
      return {
        ...state,
        ...payload,
      }
    case FETCH_QUIZ:
      return {
        ...state,
        quiz: payload,
      }
    default:
      return state
  }
}
