import {
  CLEAR_HOMEWORK,
  CREATE_HOMEWORK,
  FETCH_HOMEWORK,
  GRADE_HOMEWORK,
  SUBMIT_HOMEWORK,
  UPDATE_HOMEWORK,
} from './types'

import HomeworkService from '../services/homework'

export const createHomeworkPage = (
  courseTitle,
  title,
  description,
  files,
  openDate,
  closeDate,
  fullName,
  mode
) => (dispatch) => {
  return HomeworkService.createHomeworkPage(
    courseTitle,
    title,
    description,
    files,
    openDate,
    closeDate,
    fullName,
    mode
  ).then((data) => {
    dispatch({
      type: CREATE_HOMEWORK,
      payload: {
        studentLink: data.student_link,
        teacherLink: data.teacher_link,
      },
    }).then
    return Promise.resolve()
  })
}

export const fetchHomeworkPage = (randomStr) => (dispatch) => {
  return HomeworkService.fetchHomeworkPage(randomStr).then((data) => {
    dispatch({
      type: FETCH_HOMEWORK,
    })
    return Promise.resolve()
  })
}

export const submitHomework = (
  fullName,
  answer,
  submitDate,
  grade,
  comments,
  hwPageID
) => (dispatch) => {
  return HomeworkService.submitHomework(
    fullName,
    answer,
    submitDate,
    grade,
    comments,
    hwPageID
  ).then((data) => {
    dispatch({
      type: SUBMIT_HOMEWORK,
    })
    return Promise.resolve()
  })
}
export const gradeHomework = (
  id,
  answer,
  fullName,
  submitDate,
  grade,
  comments,
  hwPageID
) => (dispatch) => {
  return HomeworkService.gradeHomework(
    id,
    answer,
    fullName,
    submitDate,
    grade,
    comments,
    hwPageID
  ).then((data) => {
    dispatch({
      type: UPDATE_HOMEWORK,
      payload: {
        id,
        isGraded: true,
      },
    })
    return Promise.resolve()
  })
}

export const updateHomework = (id, content, grade, comments, hwPageID) => (
  dispatch
) => {
  return HomeworkService.updateHomework(
    id,
    content,
    grade,
    comments,
    hwPageID
  ).then((data) => {
    dispatch({
      type: UPDATE_HOMEWORK,
      payload: {
        id,
        grade,
        content,
        comments,
        homework_page_id: hwPageID,
      },
    })
    return Promise.resolve()
  })
}

export const clearHomework = () => ({
  type: CLEAR_HOMEWORK,
})
