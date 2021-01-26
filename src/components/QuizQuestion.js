import { useState } from 'react'

const QuizQuestion = () => {
  const [isAdded, setIsAdded] = useState(false)
  const [qType, setQType] = useState('one answer')
  const [question, setQuestion] = useState('')

  return (
    <div>
      <div className='flex flex-col px-2 py-2 my-4 text-xs text-purple-800 border border-purple-500 justify'>
        <div clssname='flex flex-row'>
          <label htmlFor='question'>Choose type of the question</label>
          <select
            name='question'
            id='question'
            onChange={(e) => setQType(e.target.value)}
            value={qType}
          >
            <option value='one answer'>One answer</option>
            <option value='multiple answers'>Multiple answers</option>
            <option value='true/false'>True/False</option>
            <option value='open'>Open</option>
          </select>
        </div>

        <div className='flex flex-row items-center pb-2 items'>
          <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
            Question
          </label>
          <input
            className='h-6 px-2 py-1 leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
            id='question'
            type='text'
          />
        </div>
      </div>
    </div>
  )
}

export default QuizQuestion
