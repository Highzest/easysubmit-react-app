import authHeader from './auth-header'
import axios from 'axios'

const createQuiz = (
  title,
  content,
  courseTitle,
  openDate,
  closeDate,
  fullName,
  mode,
  questions
) => {
  const openQuestions = questions.filter((q) => q.qType === 'open')
  const multipleChoiceQuestions = questions.filter(
    (q) => q.qType === 'multiple'
  )
  const singleQuestions = questions.filter((q) => q.qType === 'single')
  const trueFalseQuestions = questions.filter((q) => q.qType === 'truefalse')
  return axios
    .post(
      '/api/v1/quiz',
      {
        title: title,
        content: content,
        course_title: courseTitle,
        opened_at: openDate.toJSON(),
        closed_At: closeDate.toJSON(),
        teacher_fullname: fullName,
        mode: mode,
        open_questions: openQuestions,
        true_false_questions: trueFalseQuestions,
        multiple_choice_questions: [
          ...multipleChoiceQuestions,
          ...singleQuestions,
        ],
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data
    })
}

const fetchQuiz = (randomStr) => {
  return axios
    .get(`/api/v1/quiz/student/${randomStr}`, {
      headers: authHeader(),
    })
    .then((response) => {
      const normalized = {
        ...response.data,
        questions: [
          ...response.data.open_questions,
          ...response.data.true_false_questions,
          ...response.data.multiple_choice_questions,
        ],
        open_questions: undefined,
        true_false_questions: undefined,
        multiple_choice_questions: undefined,
      }

      return normalized
    })
}

const submitQuiz = (
  fullName,
  answer,
  submitDate,
  grade,
  comments,
  hwPageID
) => {
  return axios
    .post(
      '/api/v1/quiz/submit',
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

const gradeQuiz = (
  id,
  fullName,
  answer,
  submitDate,
  grade,
  comments,
  hwPageID
) => {
  return axios
    .put(
      '/api/v1/quiz/' + id.toString(),
      {
        student_fullname: fullName,
        content: answer,
        grade: grade,
        comments: comments,
        quiz_id: hwPageID,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data
    })
}

export default {
  createQuiz,
  fetchQuiz,
  submitQuiz,
  gradeQuiz,
}
