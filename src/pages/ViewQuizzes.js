import { Redirect, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { CREATE_QUIZ } from '../actions/types'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Parser from 'html-react-parser'
import authHeader from '../services/auth-header'
import axios from 'axios'

const ViewQuizzes = () => {
  const { randomStr } = useParams()
  let score = 0
  const role = useSelector((state) => state.auth.role)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [closeDate, setCloseDate] = useState(new Date())
  const [submissions, setSubmissions] = useState([])
  const [quizPageID, setQuizPageID] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setLoading] = useState(true)
  console.log(submissions)
  useEffect(() => {
    axios
      .get(
        `https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/teacher/${randomStr}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        if (response.data) {
          setQuizPageID(response.data.id)
          setSubmissions(response.data.quiz_submissions)
          setTitle(response.data.title)
          setCloseDate(response.data.closed_at)
          setDescription(response.data.content)
          setLoading(false)
        }
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
        dispatch({
          type: CREATE_QUIZ,
          payload: {
            quiz_submissions: response.data.quiz_submissions,
            questions: responseQuestions,
          },
        })
      })
      .catch((er) => {
        // history.push('/signin')
        console.log(er.message)
      })
  }, [])

  const ckEditorRemoveTags = (data) => {
    const editedData = data.replace('<p>', '').replace('</p>', '')
    return editedData
  }

  if (isLoggedIn && role === 'student') {
    return <Redirect to='/' />
  }

  const countScore = (sub) => {
    score = 0
    sub.student_answers.map((s) => {
      if (s.is_correct == true) {
        score++
      }
    })
    return score
  }
  const data = ckEditorRemoveTags(description)
  const isEmptyDesc = description.trim() === ''
  const submittedQuizzes = submissions.length

  return (
    <div>
      <Header />
      <div className='flex flex-col items-center min-h-screen px-4 py-2 bg-purple-100 justify-top sm:px-6 lg:px-8 '>
        <div className='flex flex-col items-center justify-center pb-4'></div>
        <div className='pt-4 text-xl font-bold text-purple-900'>
          Quiz Submissions
        </div>

        <div className='w-3/4 p-4 bg-purple-300 border border-purple-300 rounded'>
          <div className='flex flex-row'>
            <div className='flex flex-col w-3/4'>
              <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                <strong>Quiz Title:</strong>{' '}
                <span className='text-purple-900'>{title}</span>
              </h2>
              {isEmptyDesc ? null : (
                <h2 className='block px-4 pt-1 mb-2 text-xs tracking-wide text-gray-700 '>
                  <strong>Description:</strong>
                  <br></br>{' '}
                  <span className='text-purple-900'>{Parser(data)}</span>
                </h2>
              )}
              <div className='flex flex-col ml-2 items '>
                <div className='flex flex-col mb-2 '>
                  {submissions.map((sub, index) => (
                    <div
                      key={index}
                      className='flex flex-col mb-2 border border-purple-700 rounded'
                    >
                      <div className='flex flex-col pb-2 items'>
                        <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                          <strong>Student Name:</strong>{' '}
                          <span className='text-purple-900'>
                            {sub.student_fullname}
                          </span>
                        </p>
                        <p className='block px-4 pt-1 mb-2 text-xs tracking-wide text-gray-700'>
                          <strong>Submitted at:</strong>{' '}
                          <span className='text-purple-900'>
                            {sub.submitted_at}
                          </span>
                        </p>
                        <p className='block px-4 pt-1 mb-2 text-xs tracking-wide text-gray-700'>
                          <strong>Score:</strong>{' '}
                          <span className='text-purple-900'>
                            {countScore(sub)}
                          </span>
                        </p>
                        <div className='flex flex-row justify-end'>
                          <Link to={`/view-submission/${randomStr}/${sub.id}`}>
                            <button className='py-1 text-sm hover:bg-purple-500 mr-2  px-1 bg-purple-700 rounded text-purple-200 focus:outline-none hover:text-white '>
                              View Submission
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col '>
              <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                <strong>
                  <span className='font-bold text-purple-800'>
                    {submittedQuizzes}
                  </span>{' '}
                  Quizzes Submitted
                </strong>{' '}
              </p>
              <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                <strong></strong>{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ViewQuizzes
