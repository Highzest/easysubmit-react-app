import { useDispatch, useSelector } from 'react-redux'

import CKEditor from 'ckeditor4-react'
import DateTimePicker from 'react-datetime-picker'
import QuizQuestion from './QuizQuestion'
import { addNewQuestion } from '../actions/quiz'
import { useState } from 'react'

const QuizForm = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const [fullName, setFullName] = useState('')
  const [courseTitle, setCourseTitle] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mode, setMode] = useState('all')
  const [openDate, setOpenDate] = useState(new Date())
  const [closeDate, setCloseDate] = useState(new Date())
  const [qType, setQType] = useState('single')
  const [isAdded, setIsAdded] = useState(false)
  const questions = useSelector((state) => state.quiz.questions)
  const dispatch = useDispatch()

  const handleAdd = (e) => {
    e.preventDefault()

    dispatch(addNewQuestion(qType))
  }
  return (
    <form className='w-3/4 p-4 bg-purple-300 border border-purple-300 rounded'>
      {isLoggedIn ? null : (
        <div className='flex flex-row items-center pb-2 items'>
          <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
            Full name*
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
            type='text'
            placeholder='Enter your full name'
          />
        </div>
      )}
      <div className='flex flex-row items-center pb-2 items'>
        <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
          Set who can submit quizzes*
        </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className='text-xs bg-purple-100 border border-purple-300'
        >
          <option value='all'>Everyone</option>
          <option value='registered'>Registered accounts</option>
        </select>
      </div>
      <div className='flex flex-row items-center pb-2 items'>
        <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
          Course title*
        </label>
        <input
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className='px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
          type='text'
          placeholder='Enter course title'
        />
      </div>
      <div className='flex flex-row items-center pb-2 items'>
        <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
          Title*
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
          type='text'
          placeholder='Enter the title'
        />
      </div>
      <div className='flex flex-row pb-2'>
        <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
          Description
        </label>
        <CKEditor
          data={description}
          onChange={(e) => setDescription(e.editor.getData())}
        />
      </div>
      <div className='flex flex-row items-center pb-2 items'>
        <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
          Open date and time*
        </label>
        <DateTimePicker
          value={openDate}
          onChange={(date) => setOpenDate(date)}
        />
      </div>
      <div className='flex flex-row items-center pb-3 items'>
        <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
          Close date and time*
        </label>
        <DateTimePicker
          value={closeDate}
          onChange={(date) => setCloseDate(date)}
        />
      </div>
      {questions.map((question, index) => {
        return <QuizQuestion key={index} id={question.id} />
      })}
      <div className='flex justify-center'>
        <div
          onClick={(e) => handleAdd(e)}
          className=' w-3/4 border flex-col border-purple-800 border-dashed rounded px-4 py-5 mb-3 flex justify-center items items-center text-xl text-purple-700 hover:bg-purple-800 hover:text-purple-100'
        >
          + Add Question
          <h3 className='mt-4'>
            Choose type of the question
            <select
              className='bg-purple-100 border border-purple-300 text-gray-800 ml-4'
              name='question'
              id='question'
              onChange={(e) => setQType(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              value={qType}
            >
              <option value='single'>One answer</option>
              <option value='multiple'>Multiple answers</option>
              <option value='truefalse'>True/False</option>
              <option value='open'>Open</option>
            </select>
          </h3>
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          type='submit'
          className='relative flex justify-center w-full px-2 py-1 mb-2 text-sm font-medium leading-4 text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500  hover:text-white focus:outline-none'
        >
          Generate Link
        </button>
      </div>
    </form>
  )
}

export default QuizForm
