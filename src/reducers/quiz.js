import {
  ADD_CHOICE,
  ADD_NEW_QUESTION,
  DELETE_CHOICE,
  DELETE_QUESTION,
  SAVE_QUESTION,
  UPDATE_CHOICE,
} from '../actions/types'

const teacherLink = JSON.parse(localStorage.getItem('teacherLink'))
const studentLink = JSON.parse(localStorage.getItem('studentLink'))

const initialState = {
  links:
    teacherLink && studentLink
      ? { teacherLink, studentLink }
      : { teacherLink: null, studentLink: null },
  questions: [
    {
      id: 0,
      qType: 'multiple',
      content: 'Biology is dd',
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
    {
      id: 3,
      qType: 'single',
      content: 'Biology is single ',
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
                id: state.questions[state.questions.length - 1].id + 1,
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
                id: state.questions[state.questions.length - 1].id + 1,
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
                id: state.questions[state.questions.length - 1].id + 1,
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
                id: state.questions[state.questions.length - 1].id + 1,
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
                id: q.choices[q.choices.length - 1].id + 1,
                content: '',
                correct: false,
              },
            ],
          }
        }),
      }
    case UPDATE_CHOICE:
      return {
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
                id: payload.choice.id,
                content: payload.choice.content,
                correct: payload.choice.correct,
              },
              ...q.choices.slice(idx + 1),
            ],
          }
        }),
      }
    case DELETE_QUESTION:
      return {
        questions: state.questions.filter((q) => payload.id !== q.id),
      }
    case SAVE_QUESTION:
      return {
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
    default:
      return state
  }
}
