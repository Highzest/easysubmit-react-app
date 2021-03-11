import {
  CREATE_SUBMISSION,
  UPDATE_ANSWER,
  UPDATE_SUBMISSION,
} from '../actions/types'

const initialState = {
  fullName: '',
  studentAnswers: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_SUBMISSION:
      return {
        ...state,
        ...payload,
      }
    case UPDATE_SUBMISSION:
      return {
        ...state,
        ...payload,
      }

    case UPDATE_ANSWER:
      return {
        ...state,
        studentAnswers: state.studentAnswers.map((a, idx) => {
          if (idx !== payload.idx) {
            return a
          }

          switch (a.type) {
            case 'open':
              return {
                ...a,
                open_answer: payload.answer,
              }
            case 'single':
              return {
                ...a,
                single_answer: [payload.answer],
              }
            case 'truefalse':
              return {
                ...a,
                true_false_answer: payload.answer,
              }
            case 'multiple':
              if (a.multiple_choice_answer.includes(payload.answer)) {
                return {
                  ...a,
                  multiple_choice_answer: a.multiple_choice_answer.filter(
                    (choice) => choice !== payload.answer
                  ),
                }
              } else {
                return {
                  ...a,
                  multiple_choice_answer: [
                    ...a.multiple_choice_answer,
                    payload.answer,
                  ],
                }
              }
          }
        }),
      }
    default:
      return state
  }
}
