import { useDispatch, useSelector } from 'react-redux'

import CKEditor from 'ckeditor4-react'
import DateTimePicker from 'react-datetime-picker'
import { Redirect } from 'react-router-dom'
import { createHomeworkPage } from '../actions/homework'
import { useState } from 'react'

const HwForm = () => {
  const [fullName, setFullName] = useState('')
  const [courseTitle, setCourseTitle] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const [openDate, setOpenDate] = useState(new Date())
  const [closeDate, setCloseDate] = useState(new Date())
  const [successfull, setSuccessfull] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [mode, setMode] = useState('all')
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      createHomeworkPage(
        courseTitle,
        title,
        description,
        files,
        openDate,
        closeDate,
        fullName,
        mode
      )
    )
      .then(() => {
        setSuccessfull(true)
        setIsClicked(true)
      })
      .catch(() => {
        setSuccessfull(false)
        setIsClicked(false)
      })
  }

  if (isClicked) {
    return <Redirect to='/link' />
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-3/4 p-4 bg-purple-300 border border-purple-300 rounded'
    >
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
          Set who can submit homeworks*
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
          className='px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
          type='text'
          placeholder='Enter the homework title'
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
          Attach files
        </label>
        <input
          onChange={(e) => setFiles(e.target.value)}
          className='w-1/2 px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
          id='files'
          type='file'
          multiple
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
      <div className='flex justify-center'>
        <button
          type='submit'
          className='relative flex justify-center w-full px-2 py-1 mb-2 text-sm font-medium leading-4  hover:text-white text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none'
        >
          Generate Link
        </button>
      </div>
    </form>
  )
}

export default HwForm
