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
  const multipleChoiceQuestions = questions.reduce((filtered, q) => {
    if (q.qType === 'multiple') {
      const { choices, qType, id, ...newQ } = q
      return filtered.concat({
        ...newQ,
        answer_choices: q.choices.map((c) => {
          const { id, ...newC } = c
          return {
            ...newC,
            correct_answer: c.correct,
          }
        }),
      })
    }
    return filtered
  }, [])
  const singleQuestions = questions.reduce((filtered, q) => {
    if (q.qType === 'single') {
      const { choices, qType, id, ...newQ } = q
      return filtered.concat({
        ...newQ,
        answer_choices: q.choices.map((c) => {
          const { id, ...newC } = c
          return {
            ...newC,
            correct_answer: c.correct,
          }
        }),
      })
    }
    return filtered
  }, [])
  const trueFalseQuestions = questions.filter((q) => q.qType === 'truefalse')
  console.log(multipleChoiceQuestions, singleQuestions)
  return axios
    .post(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/quiz',
      {
        title: title,
        content: content,
        course_title: courseTitle,
        opened_at: openDate.toJSON(),
        closed_at: closeDate.toJSON(),
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
      localStorage.removeItem('teacherQuizLink')
      localStorage.removeItem('studentQuizLink')

      if (response.data) {
        localStorage.setItem(
          'teacherQuizLink',
          JSON.stringify(response.data.teacher_link)
        )
        localStorage.setItem(
          'studentQuizLink',
          JSON.stringify(response.data.student_link)
        )
      }
      return response.data
    })
}
const gradeQuiz = (id, fullName, submitDate, grade, comments, quizPageID) => {
  return axios
    .put(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/' + id.toString(),
      {
        student_fullname: fullName,
        grade: grade,
        comments: comments,
        quiz_page_id: quizPageID,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data
    })
}

const fetchQuiz = (randomStr) => {
  return axios
    .get(
      `https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/student/${randomStr}`,
      {
        headers: authHeader(),
      }
    )
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

const submitQuiz = (fullName, studentAnswers, quiz_id) => {
  let student_answers = studentAnswers.map((a) => {
    if (a.type != 'single') {
      return a
    }

    return {
      type: 'multiple',
      multiple_choice_question_id: a.single_question_id,
      multiple_choice_answer: a.single_answer,
    }
  })
  return axios
    .post(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/submission',
      {
        student_fullname: fullName,
        student_answers: student_answers,
        quiz_id: quiz_id,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data
    })
}

const gradeSubmission = (
  id,
  grade,
  comments,
  submitted_at,
  updated_at,
  student_fullname,
  student_id,
  quiz_id,
  student_answers
) => {
  return axios
    .put(
      'https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/submission/' +
        id.toString(),
      {
        id: id,
        grade: grade,
        comments: comments,
        submitted_at: submitted_at,
        updated_at: updated_at,
        student_fullname: student_fullname,
        student_id: student_id,
        quiz_id: quiz_id,
        student_answers: student_answers,
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
  gradeSubmission,
}
