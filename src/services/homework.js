import authHeader from './auth-header'
import axios from 'axios'

const createHomeworkPage = (
  courseTitle,
  title,
  description,
  files,
  openDate,
  closeDate,
  fullName,
  mode
) => {
  return axios
    .post(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/homework-page',
      {
        course_title: courseTitle,
        title: title,
        content: description,
        opened_at: openDate.toJSON(),
        closed_At: closeDate.toJSON(),
        teacher_fullname: fullName,
        mode: mode,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      localStorage.removeItem('teacherLink')
      localStorage.removeItem('studentLink')

      if (response.data) {
        localStorage.setItem(
          'teacherLink',
          JSON.stringify(response.data.teacher_link)
        )
        localStorage.setItem(
          'studentLink',
          JSON.stringify(response.data.student_link)
        )
      }
      return response.data
    })
}

const fetchHomeworkPage = (randomStr) => {
  return axios
    .get(
      `https://radiant-inlet-12251.herokuapp.com/api/v1/homework-page/student/${randomStr}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data
    })
}

const submitHomework = (
  fullName,
  answer,
  submitDate,
  grade,
  comments,
  hwPageID
) => {
  return axios
    .post(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/homework',
      {
        student_fullname: fullName,
        content: answer,
        submitted_at: submitDate,
        grade: grade,
        comments: comments,
        homework_page_id: hwPageID,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data
    })
}

const gradeHomework = (
  id,
  answer,
  fullName,
  submitDate,
  grade,
  comments,
  hwPageID
) => {
  return axios
    .put(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/homework/' +
        id.toString(),
      {
        student_fullname: fullName,
        content: answer,
        grade: grade,
        comments: comments,
        homework_page_id: hwPageID,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data
    })
}

const updateHomework = (id, content, grade, comments, hwPageID) => {
  return axios
    .put(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/homework/' +
        id.toString(),
      {
        content: content,
        grade: grade,
        comments: comments,
        homework_page_id: hwPageID,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data
    })
}

export default {
  createHomeworkPage,
  fetchHomeworkPage,
  submitHomework,
  gradeHomework,
  updateHomework,
}
