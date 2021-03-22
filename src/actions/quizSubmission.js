import {
  CREATE_SUBMISSION,
  GRADE_SUBMISSION,
  MARK_IS_CORRECT,
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

export const markIsCorrect = ({ idx, isCorrect }) => ({
  type: MARK_IS_CORRECT,
  payload: { idx, isCorrect },
})

export const gradeSubmission = (
  id,
  grade,
  comments,
  submitted_at,
  updated_at,
  student_fullname,
  student_id,
  quiz_id,
  student_answers
) => (dispatch) => {
  return QuizService.gradeSubmission(
    id,
    grade,
    comments,
    submitted_at,
    updated_at,
    student_fullname,
    student_id,
    quiz_id,
    student_answers
  ).then((data) => {
    dispatch({
      type: GRADE_SUBMISSION,
    })
    return Promise.resolve()
  })
}
