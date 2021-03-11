import { Redirect, useHistory, useParams } from 'react-router-dom'
import { createSubmission, updateSubmission } from '../actions/quizSubmission'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { CREATE_QUIZ } from '../actions/types'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Parser from 'html-react-parser'
import StudentAnswer from '../components/StudentAnswer'
import authHeader from '../services/auth-header'
import axios from 'axios'
import { submitQuiz } from '../actions/quizSubmission'

const SubmitQuiz = () => {
  const { randomStr } = useParams()
  const history = useHistory()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const quiz = useSelector((state) => state.quiz)
  const questions = useSelector((state) => state.quiz.questions)
  const submission = useSelector((state) => state.submission)
  const dispatch = useDispatch()
  const [isSubmitted, setSubmitted] = useState(false)

  const ckEditorRemoveTags = (data) => {
    const editedData = data.replace('<p>', '').replace('</p>', '')
    return editedData
  }

  useEffect(() => {
    axios
      .get(
        `https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/student/${randomStr}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        let responseQuestions = [
          ...response.data.open_questions.map((q) => ({
            ...q,
            qType: 'open',
          })),
          ...response.data.true_false_questions.map((q) => ({
            ...q,
            qType: 'truefalse',
          })),
          ...response.data.multiple_choice_questions.map((q) => ({
            ...q,
            qType:
              q.answer_choices.filter((q) => q.correct_answer === true).length >
              1
                ? 'multiple'
                : 'single',
            answer_choices: q.answer_choices.map((c) => {
              const { correct_answer, ...newC } = c
              return {
                ...newC,
              }
            }),
          })),
        ]
        dispatch(
          createSubmission({
            quiz_id: response.data.id,
            studentAnswers: responseQuestions.map((q) => {
              switch (q.qType) {
                case 'open':
                  return {
                    type: 'open',
                    open_question_id: q.id,
                    open_answer: '',
                  }
                case 'single':
                  return {
                    type: 'single',
                    single_question_id: q.id,
                    single_answer: [],
                  }
                case 'multiple':
                  return {
                    type: 'multiple',
                    multiple_choice_question_id: q.id,
                    multiple_choice_answer: [],
                  }
                case 'truefalse':
                  return {
                    type: 'truefalse',
                    true_false_question_id: q.id,
                    true_false_answer: false,
                  }
              }
            }),
          })
        )
        dispatch({
          type: CREATE_QUIZ,
          payload: {
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            courseTitle: response.data.course_title,
            mode: response.data.mode,
            openedAt: response.data.opened_at,
            closedAt: response.data.closed_at,
            teacherFullName: response.data.teacher_fullname,
            questions: responseQuestions,
          },
        })
      })
      .catch((err) => {
        console.log(err.message)
        //history.push('/signin')
      })
  }, [])

  if (quiz.mode === 'registered' && !isLoggedIn) {
    dispatch(setMessage('Only registered students can submit this homework!'))
    return <Redirect to='/signin' />
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      submitQuiz(
        submission.fullName,
        submission.studentAnswers,
        submission.quiz_id
      )
    )
      .then(() => {
        setSubmitted(true)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  const isEmptyDesc = quiz.content.trim() === ''
  const data = ckEditorRemoveTags(quiz.content)

  return (
    <div>
      <Header />
      <div className='flex flex-col items-center min-h-screen px-4 py-2 bg-purple-100 justify-top sm:px-6 lg:px-8 '>
        <div className='flex flex-col items-center justify-center w-3/4 pb-4'>
          <div className='pt-2 text-xl font-bold text-purple-900'>Quiz</div>
          <div className='flex flex-row items-center w-full border border-purple-300 rounded-t items '>
            <div className='w-full p-4 bg-purple-300 border border-purple-300 rounded-tl'>
              <h2 className='block px-4 pt-1 mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                <strong>Course Title:</strong>{' '}
                <span className='text-purple-900'>{quiz.courseTitle}</span>
              </h2>
              <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                <strong>Quiz Title:</strong>{' '}
                <span className='text-purple-900'>{quiz.title}</span>
              </h2>
            </div>
            <div>
              {isLoggedIn ? null : (
                <div className='flex flex-row items'>
                  <label className='block px-4 pt-1 mb-4 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                    Full Name*:
                  </label>
                  <input
                    value={submission.fullName}
                    onChange={(e) => {
                      dispatch(
                        updateSubmission({
                          fullName: e.target.value,
                        })
                      )
                    }}
                    className='px-1 mb-3 mr-4 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                    type='text'
                    placeholder='Enter your full name'
                  />
                </div>
              )}
              <div className='flex flex-row items-center items'>
                <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                  <strong>Time Remaining:</strong>{' '}
                  <span className='text-purple-900'>15min</span>
                </h2>
              </div>
            </div>
          </div>
          <div className='w-full p-4 bg-purple-300 border border-purple-300 rounded-b'>
            {isEmptyDesc ? null : (
              <div>
                <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                  <strong>Description:</strong>
                  <br></br>{' '}
                </h2>
                <div className='ml-4 text-purple-900'>{Parser(data)}</div>
              </div>
            )}
            {isSubmitted ? (
              <div className='form-group'>
                <div className='w-full pt-2 text-xl font-bold text-center text-purple-900 border border-purple-300 rounded'>
                  Submitted
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className='block px-4 pt-1 mt-4 mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                  Questions
                </div>

                {questions.map((q, idx) => {
                  return <StudentAnswer key={idx} indx={idx} id={q.id} />
                })}
                <div className='flex justify-center'>
                  <button
                    type='submit'
                    className='relative flex justify-center w-full px-2 py-1 mb-2 text-sm font-medium leading-4 text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none'
                  >
                    Submit Quiz
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SubmitQuiz
