import {
  ADD_CHOICE,
  ADD_NEW_QUESTION,
  DELETE_CHOICE,
  DELETE_QUESTION,
  SAVE_QUESTION,
} from '../actions/types'

const initialState = {
  questions: [
    {
      id: 0,
      qType: 'single',
      content: 'Biology is',
      fixed: false,
      choices: [
        {
          id: 0,
          content: 'biology',
          correct: false,
        },
        {
          id: 1,
          content: 'life',
          correct: true,
        },
        {
          id: 2,
          content: 'animals',
          correct: false,
        },
      ],
    },
    {
      id: 1,
      qType: 'truefalse',
      content: 'guli guli',
      fixed: false,
      answer: 'woooow',
    },
    {
      id: 2,
      qType: 'open',
      content: 'guli guli guli guli',
      fixed: false,
      correct: true,
    },
  ],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_NEW_QUESTION:
      switch (payload.qType) {
        case 'single':
          return {
            questions: [
              ...state.questions,
              {
                id: state.questions.length,
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
            questions: [
              ...state.questions,
              {
                id: state.questions.length,
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
            questions: [
              ...state.questions,
              {
                id: state.questions.length,
                qType: 'truefalse',
                content: '',
                fixed: false,
                correct: null,
              },
            ],
          }
        case 'open':
          return {
            questions: [
              ...state.questions,
              {
                id: state.questions.length,
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
        questions: state.questions.map((q) => {
          if (q.id !== action.payload.id) {
            // This isn't the item we care about - keep it as-is
            return q
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...q,
            choices: [
              ...q.choices,
              {
                id: q.choices.length,
                content: '',
                correct: false,
              },
            ],
          }
        }),
      }
    case DELETE_QUESTION:
      return {
        questions: state.questions.filter((q) => action.payload.id !== q.id),
      }
    case SAVE_QUESTION:
      return {
        questions: [
          ...state.questions.filter((q) => action.payload.id !== q.id),
          action.payload,
        ],
      }
    case DELETE_CHOICE:
      return {
        questions: state.questions.map((q) => {
          if (q.id !== action.payload.qID) {
            // This isn't the item we care about - keep it as-is
            return q
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...q,
            choices: q.choices.filter((c) => action.payload.cID !== c.ID),
          }
        }),
      }
    default:
      return state
  }
}
