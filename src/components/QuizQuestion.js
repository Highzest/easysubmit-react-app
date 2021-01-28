import { useSelector } from 'react-redux'
import { useState } from 'react'
const QuizQuestion = ({ id }) => {
  const questions = useSelector((state) => state.quiz.questions)
  const currentQuestion = questions.find((q) => q.id === id)
  const [content, setContent] = useState(currentQuestion.content)
  const [choices, setChoices] = useState(currentQuestion.choices)
  const [answer, setAnswer] = useState(currentQuestion.answer)
  const deleteOption = (e, idx) => {
    e.preventDefault()
    console.log('deleted')
  }

  const renderQuestion = (currentQuestion) => {
    switch (currentQuestion.qType) {
      case 'multiple':
        return (
          <div className='flex flex-col'>
            <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row'>
              <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                Question
              </label>
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                type='text'
                placeholder='Enter your question'
              />
            </div>
            {choices.map((choice, idx) => (
              <div key={idx} className='flex flex-row'>
                <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                  Option {idx + 1}
                </label>
                <input
                  value={choice.content}
                  onChange={(e) =>
                    setChoices([
                      ...choices.slice(0, idx),
                      {
                        id: choice.id,
                        content: e.target.value,
                        correct: choice.correct,
                      },
                      ...choices.slice(idx + 1),
                    ])
                  }
                  className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Enter your option'
                />
                <button
                  className='focus:outline-none w-3 h-3  mx-2 my-2 '
                  onClick={(e) => deleteOption(e, choice.id)}
                >
                  <svg viewBox='-40 0 427 427.001' fill='fillCurrent'>
                    <path d='M232.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0M114.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0' />
                    <path d='M28.398 127.121V373.5c0 14.563 5.34 28.238 14.668 38.05A49.246 49.246 0 0078.796 427H268a49.233 49.233 0 0035.73-15.45c9.329-9.812 14.668-23.487 14.668-38.05V127.121c18.543-4.922 30.559-22.836 28.079-41.863-2.485-19.024-18.692-33.254-37.88-33.258h-51.199V39.5a39.289 39.289 0 00-11.539-28.031A39.288 39.288 0 00217.797 0H129a39.288 39.288 0 00-28.063 11.469A39.289 39.289 0 0089.398 39.5V52H38.2C19.012 52.004 2.805 66.234.32 85.258c-2.48 19.027 9.535 36.941 28.078 41.863zM268 407H78.797c-17.098 0-30.399-14.688-30.399-33.5V128h250v245.5c0 18.813-13.3 33.5-30.398 33.5zM109.398 39.5a19.25 19.25 0 015.676-13.895A19.26 19.26 0 01129 20h88.797a19.26 19.26 0 0113.926 5.605 19.244 19.244 0 015.675 13.895V52h-128zM38.2 72h270.399c9.941 0 18 8.059 18 18s-8.059 18-18 18H38.199c-9.941 0-18-8.059-18-18s8.059-18 18-18zm0 0' />
                    <path d='M173.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0' />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )
      case 'single':
        return (
          <div className='flex flex-col'>
            <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row'>
              <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                Question
              </label>
              <input
                value={currentQuestion.content}
                onChange={(e) => console.log('hi')}
                className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                type='text'
                placeholder='Enter your question'
              />
            </div>
            {choices.map((choice, idx) => (
              <div key={idx} className='flex flex-row'>
                <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                  Option {idx + 1}
                </label>
                <input
                  value={choice.content}
                  onChange={(e) =>
                    setChoices([
                      ...choices.slice(0, idx),
                      {
                        id: choice.id,
                        content: e.target.value,
                        correct: choice.correct,
                      },
                      ...choices.slice(idx + 1),
                    ])
                  }
                  className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Enter your option'
                />
                <button
                  className='focus:outline-none w-3 h-3  mx-2 my-2 '
                  onClick={(e) => deleteOption(e, choice.id)}
                >
                  <svg viewBox='-40 0 427 427.001' fill='fillCurrent'>
                    <path d='M232.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0M114.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0' />
                    <path d='M28.398 127.121V373.5c0 14.563 5.34 28.238 14.668 38.05A49.246 49.246 0 0078.796 427H268a49.233 49.233 0 0035.73-15.45c9.329-9.812 14.668-23.487 14.668-38.05V127.121c18.543-4.922 30.559-22.836 28.079-41.863-2.485-19.024-18.692-33.254-37.88-33.258h-51.199V39.5a39.289 39.289 0 00-11.539-28.031A39.288 39.288 0 00217.797 0H129a39.288 39.288 0 00-28.063 11.469A39.289 39.289 0 0089.398 39.5V52H38.2C19.012 52.004 2.805 66.234.32 85.258c-2.48 19.027 9.535 36.941 28.078 41.863zM268 407H78.797c-17.098 0-30.399-14.688-30.399-33.5V128h250v245.5c0 18.813-13.3 33.5-30.398 33.5zM109.398 39.5a19.25 19.25 0 015.676-13.895A19.26 19.26 0 01129 20h88.797a19.26 19.26 0 0113.926 5.605 19.244 19.244 0 015.675 13.895V52h-128zM38.2 72h270.399c9.941 0 18 8.059 18 18s-8.059 18-18 18H38.199c-9.941 0-18-8.059-18-18s8.059-18 18-18zm0 0' />
                    <path d='M173.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0' />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )
      case 'open':
        return (
          <div className='flex flex-col'>
            <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row'>
              <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                Question
              </label>
              <input
                value={currentQuestion.content}
                onChange={(e) => console.log('hi')}
                className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                type='text'
                placeholder='Enter your question'
              />
            </div>
            <div className='flex flex-row'>
              <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                Answer
              </label>
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                type='text'
                placeholder='Enter your option'
              />
            </div>
          </div>
        )
      case 'truefalse':
        return (
          <div className='flex flex-col'>
            <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row'>
              <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                Question
              </label>
              <input
                value={currentQuestion.content}
                onChange={(e) => console.log('hi')}
                className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                type='text'
                placeholder='Enter your question'
              />
            </div>
            <div className='ml-4'>
              <input type='radio' name='choice' value='true' />
              <label
                htmlFor='choice'
                className=' px-1 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'
              >
                true
              </label>
              <br></br>
              <input type='radio' name='choice' value='false' />
              <label
                htmlFor='choice'
                className=' px-1 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'
              >
                false
              </label>
              <br></br>
            </div>
          </div>
        )
      case 'default':
        return null
    }
  }

  return (
    <div>
      <div className='flex flex-col px-2 py-2 my-4 text-xs  text-black border border-purple-500 justify'>
        {renderQuestion(currentQuestion)}
      </div>
    </div>
  )
}

export default QuizQuestion
