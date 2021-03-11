import {
  ADD_CHOICE,
  ADD_NEW_QUESTION,
  CREATE_QUIZ,
  DELETE_CHOICE,
  DELETE_QUESTION,
  SAVE_QUESTION,
  UPDATE_CHOICE,
  UPDATE_CHOICES,
} from './types'

import QuizService from '../services/quiz'

export const addChoice = (id) => ({
  type: ADD_CHOICE,
  payload: { id },
})

export const updateChoice = (qID, choice) => ({
  type: UPDATE_CHOICE,
  payload: { qID, choice },
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

export const saveQuestion = (question) => ({
  type: SAVE_QUESTION,
  payload: question,
})

export const gradeQuiz = (id, grade) => ({
  type: GRADE_QUIZ,
  payload: { id, grade },
})

export const createQuiz = (
  title,
  content,
  courseTitle,
  openDate,
  closeDate,
  fullName,
  mode,
  questions
) => (dispatch) => {
  return QuizService.createQuiz(
    title,
    content,
    courseTitle,
    openDate,
    closeDate,
    fullName,
    mode,
    questions
  ).then((data) => {
    dispatch({
      type: CREATE_QUIZ,
      payload: {
        studentLink: data.student_link,
        teacherLink: data.teacher_link,
      },
    })
    return Promise.resolve()
  })
}

export const updateChoices = (qID, cID) => ({
  type: UPDATE_CHOICES,
  payload: { qID, cID },
})

export const fetchQuiz = (randomStr) => (dispatch) => {
  return QuizService.fetchQuiz(randomStr).then((data) => {
    dispatch({
      type: FETCH_QUIZ,
      payload: data,
    })
    return Promise.resolve()
  })
}
