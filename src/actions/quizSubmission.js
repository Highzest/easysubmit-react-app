import {
  CREATE_SUBMISSION,
  SUBMIT_QUIZ,
  UPDATE_ANSWER,
  UPDATE_SUBMISSION,
} from './types'

import QuizService from '../services/quiz'

export const createSubmission = (submission) => ({
  type: CREATE_SUBMISSION,
  payload: submission,
})

export const updateSubmission = (submission) => ({
  type: UPDATE_SUBMISSION,
  payload: submission,
})

export const updateAnswer = ({ idx, answer }) => ({
  type: UPDATE_ANSWER,
  payload: { idx, answer },
})

export const submitQuiz = (fullName, studentAnswers, quiz_id) => (dispatch) => {
  return QuizService.submitQuiz(fullName, studentAnswers, quiz_id).then(
    (data) => {
      dispatch({
        type: SUBMIT_QUIZ,
      })
      return Promise.resolve()
    }
  )
}
