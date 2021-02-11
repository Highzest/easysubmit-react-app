import { Redirect, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import authHeader from '../services/auth-header'
import axios from 'axios'

const ViewQuizzes = () => {
  const { randomStr } = useParams()
  const history = useHistory()
  const role = useSelector((state) => state.auth.role)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const [id, setId] = useState(null)
  const [graded, setGraded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const [closeDate, setCloseDate] = useState(new Date())
  const [grade, setGrade] = useState('')
  const [comments, setComments] = useState('')
  const [hwPageID, setHwPageID] = useState(-1)
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    axios
      .get(`/api/v1/quiz-page/teacher/${randomStr}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data) {
          setHwPageID(response.data.id)
          setQuizzes(response.data.quizzes)
          setTitle(response.data.title)
          setDescription(response.data.content)
          setCloseDate(response.data.closed_at)
        }
      })
      .catch((response) => {
        history.push('/signin')
      })
  }, [])

  const ckEditorRemoveTags = (data) => {
    const editedData = data.replace('<p>', '').replace('</p>', '')
    return editedData
  }

  const handleGrade = (idx, e) => {
    e.preventDefault()

    dispatch(
      gradeQuiz(
        this.state.quizzes[idx].id,
        this.state.quizzes[idx].student_fullname,
        this.state.quizzes[idx].content,
        this.state.quizzes[idx].submitted_at,
        this.state.grade,
        this.state.comments,
        this.state.hwPageID
      )
    )
      .then(() => {
        this.setState({
          isGraded: true,
          successful: true,
        })
        window.location.reload()
      })
      .catch(() => {
        this.setState({
          isGraded: false,
          successful: false,
        })
      })
  }

  if (isLoggedIn && role === 'student') {
    return <Redirect to='/' />
  }

  const data = ckEditorRemoveTags(description)
  const isEmptyDesc = description.trim() === ''
  const isEmptyFile = files.length === 0
  const submittedHWs = quizzes.length

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
                <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                  <strong>Description:</strong>
                  <br></br> <span className='text-purple-900'>{data}</span>
                </h2>
              )}
              {isEmptyFile ? null : (
                <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                  <strong>Attachments:</strong>
                  <br></br> <span className='text-purple-900'>{files}</span>
                </h2>
              )}
              <div className='flex flex-col ml-2 items '>
                {quizzes.map((quiz, index) => (
                  <div
                    key={index}
                    className='flex flex-col mb-2 border border-purple-700 rounded'
                  >
                    <div className='flex flex-col pb-2 items'>
                      <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                        <strong>Student Name:</strong>{' '}
                        <span className='text-purple-900'>
                          {quiz.student_fullname}
                        </span>
                      </p>
                      <p className='block px-4 pt-1 mb-2 text-xs tracking-wide text-gray-700'>
                        <strong>Submitted at:</strong>{' '}
                        <span className='text-purple-900'>
                          {quiz.submitted_at}
                        </span>
                      </p>
                      {quiz.content.trim() === '' ? null : (
                        <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                          <strong>Content:</strong>
                          <br />{' '}
                          <span className='text-purple-900'>
                            {this.ckEditorRemoveTags(quiz.content)}
                          </span>
                        </p>
                      )}
                      {quiz.grade.trim() === '' ? (
                        <form
                          onSubmit={handleGrade.bind(this, index)}
                          className='flex flex-col'
                        >
                          <div className='flex flex-row mb-2'>
                            <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                              <strong>Grade: </strong>
                            </p>
                            <input
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              className='w-10 px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                              type='text'
                              placeholder=''
                            />
                          </div>
                          <div className='flex flex-row'>
                            <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                              <strong>Comments: </strong>
                            </p>
                            <textarea
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                              className='px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                              type='text'
                              placeholder=''
                            />
                            <br />
                          </div>
                          <div>
                            <button
                              type='submit'
                              className='relative flex justify-center px-2 py-1 mt-2 mb-2 ml-4 text-sm font-medium leading-4 text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none'
                            >
                              Grade Quiz
                            </button>
                          </div>
                        </form>
                      ) : (
                        <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                          <strong>Grade:</strong>
                          <span className='text-purple-900'>{quiz.grade}</span>
                          <strong>Comments:</strong>
                          <span className='text-purple-900'>
                            {quiz.comments}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col '>
              <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                <strong>
                  <span className='font-bold text-purple-800'>
                    {submittedHWs}
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
