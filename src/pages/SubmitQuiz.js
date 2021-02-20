import { Redirect, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'

const SubmitQuiz = () => {
  const { randomStr } = useParams()
  const history = useHistory()
  const message = useSelector((state) => state.message.message)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('')
  const [answer, setAnswer] = useState('')
  const [attachments, setAttachments] = useState([])
  const [submitDate, setSubmitDate] = useState(new Date())
  const [successful, setSuccessful] = useState(false)
  const [courseTitle, setCourseTitle] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const [closeDate, setCloseDate] = useState(new Date())
  const [grade, setGrade] = useState('')
  const [comments, setComments] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hwPageID, setHwPageID] = useState(-1)
  const [mode, setMode] = useState('all')

  const ckEditorRemoveTags = (data) => {
    const editedData = data.replace('<p>', '').replace('</p>', '')
    return editedData
  }
  const questions = useSelector((state) => state.quiz.questions)
  const handleSubmit = (e) => {
    e.preventDefault()

    return <Redirect to='/link_quiz' />
  }

  const isEmptyDesc = description.trim() === ''
  const data = ckEditorRemoveTags(description)
  const isEmptyFile = files.length === 0

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
                <span className='text-purple-900'>{courseTitle}</span>
              </h2>
              <h2 className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                <strong>Quiz Title:</strong>{' '}
                <span className='text-purple-900'>{title}</span>
              </h2>
              <div className='block px-4 pt-1 mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                Questions
              </div>
            </div>
            <div>
              {isLoggedIn ? null : (
                <div className='flex flex-row items'>
                  <label className='block px-4 pt-1 mb-4 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                    Full Name*:
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                <p className='ml-4 text-purple-900'>{data}</p>
              </div>
            )}
          </div>
        </div>
        <small className=''>* - Required field </small>
      </div>
      <Footer />
    </div>
  )
}

export default SubmitQuiz
