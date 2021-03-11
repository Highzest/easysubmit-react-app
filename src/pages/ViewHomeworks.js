import { CREATE_HOMEWORK, UPDATE_HOMEWORK } from '../actions/types'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { gradeHomework, updateHomework } from '../actions/homework'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import authHeader from '../services/auth-header'
import axios from 'axios'

const ViewHomeworks = () => {
  const { randomStr } = useParams()
  const history = useHistory()
  const role = useSelector((state) => state.auth.role)
  const homeworkPage = useSelector((state) => state.homework)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(
        `https://radiant-inlet-12251.herokuapp.com/api/v1/homework-page/teacher/${randomStr}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch({
          type: CREATE_HOMEWORK,
          payload: response.data,
        })
        setLoading(false)
      })
      .catch((response) => {
        //history.push('/signin')
      })
  }, [])

  const ckEditorRemoveTags = (data) => {
    const editedData = data.replace('<p>', '').replace('</p>', '')
    return editedData
  }

  const handleGrade = (hwID, e) => {
    e.preventDefault()

    let hw = homeworkPage.homeworks.find((h) => h.id === hwID)

    dispatch(
      gradeHomework(
        hw.id,
        hw.content,
        hw.student_fullname,
        hw.submitted_at,
        hw.grade,
        hw.comments,
        hw.homework_page_id
      )
    )
      .then(() => {
        //window.location.reload()
      })
      .catch(() => {
        console.log('CANNOT GRADE HOMEWORK AND SEND GRADE TO SERVER!')
      })
  }

  if (isLoggedIn && role === 'student') {
    return <Redirect to='/' />
  }

  const data = ckEditorRemoveTags(homeworkPage.content)
  const isEmptyDesc = homeworkPage.content.trim() === ''
  const isEmptyFile = homeworkPage.files ? true : files.length === 0
  const submittedHWs = homeworkPage.homeworks.length
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center min-h-screen px-4 py-2 bg-purple-100 justify-top sm:px-6 lg:px-8 '>
        <div className='flex flex-col items-center justify-center pb-4'></div>
        <div className='pt-4 text-xl font-bold text-purple-900'>
          Homework Submissions
        </div>

        <div className='w-3/4 p-4 bg-purple-300 border border-purple-300 rounded'>
          <div className='flex flex-row'>
            <div className='flex flex-col w-3/4'>
              <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                <strong>Homework Title:</strong>{' '}
                <span className='text-purple-900'>{homeworkPage.title}</span>
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
                  <br></br>
                  <span className='text-purple-900'>{homeworkPage.files}</span>
                </h2>
              )}
              <div className='flex flex-col ml-2 items '>
                {isLoading
                  ? null
                  : homeworkPage.homeworks.map((homework, index) => (
                      <div
                        key={index}
                        className='flex flex-col mb-2 border border-purple-700 rounded'
                      >
                        <div className='flex flex-col pb-2 items'>
                          <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                            <strong>Student Name:</strong>{' '}
                            <span className='text-purple-900'>
                              {homework.student_fullname}
                            </span>
                          </p>
                          <p className='block px-4 pt-1 mb-2 text-xs tracking-wide text-gray-700'>
                            <strong>Submitted at:</strong>{' '}
                            <span className='text-purple-900'>
                              {homework.submitted_at}
                            </span>
                          </p>
                          {homework.content.trim() === '' ? null : (
                            <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                              <strong>Content:</strong>
                              <br />
                              <span className='text-purple-900'>
                                {ckEditorRemoveTags(homework.content)}
                              </span>
                            </p>
                          )}
                          {!homework.isGraded ? (
                            <form
                              onSubmit={handleGrade.bind(this, homework.id)}
                              className='flex flex-col'
                            >
                              <div className='flex flex-row mb-2'>
                                <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                                  <strong>Grade: </strong>
                                </p>
                                <input
                                  value={homework.grade}
                                  onChange={(e) =>
                                    dispatch({
                                      type: UPDATE_HOMEWORK,
                                      payload: {
                                        id: homework.id,
                                        grade: e.target.value,
                                      },
                                    })
                                  }
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
                                  value={homework.comments}
                                  onChange={(e) =>
                                    dispatch({
                                      type: UPDATE_HOMEWORK,
                                      payload: {
                                        id: homework.id,
                                        comments: e.target.value,
                                      },
                                    })
                                  }
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
                                  Grade Homework
                                </button>
                              </div>
                            </form>
                          ) : (
                            <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700'>
                              <strong>Grade:</strong>
                              <span className='text-purple-900'>
                                {homework.grade}
                              </span>
                              <br />
                              <strong>Comments:</strong>
                              <span className='text-purple-900'>
                                {homework.comments}
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
                  Homeworks Submitted
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

export default ViewHomeworks
