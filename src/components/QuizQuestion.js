import {
  addChoice,
  deleteChoice,
  deleteQuestion,
  saveQuestion,
  updateChoice,
  updateChoices,
} from '../actions/quiz'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const QuizQuestion = ({ id }) => {
  const questions = useSelector((state) => state.quiz.questions)
  const [curIndex, setCurIndex] = useState(
    questions.findIndex((q) => q.id === id)
  )
  const [isSaved, setIsSaved] = useState(false)
  const currentQuestion = useSelector((state) => state.quiz.questions[curIndex])
  const choicesState = useSelector(
    (state) => state.quiz.questions[curIndex].choices
  )
  const dispatch = useDispatch()

  const deleteOption = (e, qID, cID) => {
    e.preventDefault()
    dispatch(deleteChoice(qID, cID))
  }

  // useEffect(() => {
  //   setCurIndex(questions.findIndex((q) => q.id === id))
  //   // setCurrentQuestion({ ...questions[curIndex] })
  //   // setContent(questions[curIndex].content)
  //   // setAnswer(questions[curIndex].answer)
  // }, [questions[curIndex]])

  const handleDeleteQuestion = (e, id) => {
    e.preventDefault()
    dispatch(deleteQuestion(id))
  }

  const addOption = (e, id) => {
    e.preventDefault()
    dispatch(addChoice(id))
  }

  const handleSaveQuestion = (e, question) => {
    e.preventDefault()

    setIsSaved(true)
    dispatch(saveQuestion(question))
  }

  const handleChangeChoice = (e, qID, choice) => {
    // e.preventDefault()
    setIsSaved(false)
    dispatch(updateChoice(qID, choice))
  }

  const renderQuestion = (currentQuestion) => {
    switch (currentQuestion.qType) {
      case 'multiple':
        return (
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <div className='flex flex-col w-full'>
                <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row w-full justify-between'>
                  <div className='flex flex-row'>
                    <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                      Question
                    </label>
                    <input
                      value={currentQuestion.content}
                      onChange={(e) => {
                        dispatch(
                          saveQuestion({
                            id: currentQuestion.id,
                            content: e.target.value,
                          })
                        )
                        setIsSaved(false)
                      }}
                      className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                      type='text'
                      placeholder='Enter your question'
                    />
                  </div>
                  <div>
                    <button
                      onClick={(e) =>
                        handleDeleteQuestion(e, currentQuestion.id)
                      }
                      className='w-5 h-5 border border-purple-400 text-purple-100 rounded focus:outline-none hover:bg-purple-400'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 92 92'
                        fill='#5B21B6'
                      >
                        <path d='M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3a4.47 4.47 0 010-6.4L39.6 46 21.3 27.7a4.47 4.47 0 010-6.4c1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z' />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='text-gray-700 ml-4 text-xs pb-2'>
                  Tick correct answers
                </div>
                {choicesState.map((choice, idx) => (
                  <div key={idx} className='flex flex-row'>
                    <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                      Option {idx + 1}
                    </label>
                    <input
                      value={choice.content}
                      onChange={(e) => {
                        handleChangeChoice(e, currentQuestion.id, {
                          id: choice.id,
                          content: e.target.value,
                        })
                      }}
                      className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                      type='text'
                      placeholder='Enter your option'
                    />
                    <input
                      type='checkbox'
                      checked={choice.correct}
                      className='mx-2 outline-none '
                      onChange={(e) => {
                        handleChangeChoice(e, currentQuestion.id, {
                          id: choice.id,
                          correct: e.target.checked,
                        })
                      }}
                    />
                    <button
                      type='button'
                      className='focus:outline-none w-3 h-3 my-2'
                      onClick={(e) => {
                        deleteOption(e, currentQuestion.id, choice.id)
                        setIsSaved(false)
                      }}
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
            </div>
            <div className='flex flex-row justify-end'>
              <div className=''>
                <button
                  onClick={(e) => {
                    addOption(e, currentQuestion.id)
                    setIsSaved(false)
                  }}
                  className='border mt-1 rounded border-purple-400 px-2 py-1 text-xs text-purple-900 focus:outline-none hover:bg-purple-400 mr-2'
                >
                  Add option
                </button>
              </div>
            </div>
          </div>
        )
      case 'single':
        return (
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <div className='flex flex-col w-full'>
                <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row justify-between w-full'>
                  <div className='flex flex-row'>
                    <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                      Question
                    </label>
                    <input
                      value={currentQuestion.content}
                      onChange={(e) => {
                        dispatch(
                          saveQuestion({
                            id: currentQuestion.id,
                            content: e.target.value,
                          })
                        )
                        setIsSaved(false)
                      }}
                      className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                      type='text'
                      placeholder='Enter your question'
                    />
                  </div>
                  <div>
                    <button
                      onClick={(e) =>
                        handleDeleteQuestion(e, currentQuestion.id)
                      }
                      className='w-5 h-5 border border-purple-400 text-purple-100 rounded focus:outline-none hover:bg-purple-400'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 92 92'
                        fill='#5B21B6'
                      >
                        <path d='M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3a4.47 4.47 0 010-6.4L39.6 46 21.3 27.7a4.47 4.47 0 010-6.4c1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z' />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='text-gray-700 ml-4 text-xs pb-2'>
                  Tick the correct answer
                </div>
                {choicesState.map((choice, idx) => (
                  <div key={idx} className='flex flex-row'>
                    <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                      Option {idx + 1}
                    </label>
                    <input
                      value={choice.content}
                      onChange={(e) => {
                        handleChangeChoice(e, currentQuestion.id, {
                          id: choice.id,
                          content: e.target.value,
                        })
                        setIsSaved(false)
                      }}
                      className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                      type='text'
                      placeholder='Enter your option'
                    />
                    <input
                      type='radio'
                      checked={choice.correct}
                      name='single'
                      className='outline-none mx-2'
                      onChange={(e) =>
                        dispatch(updateChoices(currentQuestion.id, choice.id))
                      }
                    ></input>
                    <button
                      className='focus:outline-none w-3 h-3 my-2 '
                      onClick={(e) => {
                        deleteOption(e, currentQuestion.id, choice.id)
                        setIsSaved(false)
                      }}
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
            </div>
            <div className='flex flex-row justify-end'>
              <div className=''>
                <button
                  onClick={(e) => {
                    addOption(e, currentQuestion.id)
                    setIsSaved(false)
                  }}
                  className='border mt-1 rounded border-purple-400 px-2 py-1 text-xs text-purple-900 focus:outline-none hover:bg-purple-400 mr-2'
                >
                  Add option
                </button>
              </div>
            </div>
          </div>
        )
      case 'open':
        return (
          <div className='flex flex-col w-full'>
            <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row justify-between'>
              <div className='flex flex-row'>
                <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                  Question
                </label>
                <input
                  value={currentQuestion.content}
                  onChange={(e) => {
                    dispatch(
                      saveQuestion({
                        id: currentQuestion.id,
                        content: e.target.value,
                      })
                    )
                    setIsSaved(false)
                  }}
                  className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Enter your question'
                />
              </div>
              <div>
                <button
                  onClick={(e) => handleDeleteQuestion(e, currentQuestion.id)}
                  className='w-5 h-5 border border-purple-400 text-purple-100 rounded focus:outline-none hover:bg-purple-400'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 92 92'
                    fill='#5B21B6'
                  >
                    <path d='M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3a4.47 4.47 0 010-6.4L39.6 46 21.3 27.7a4.47 4.47 0 010-6.4c1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='flex flex-row'>
              <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                Answer
              </label>
              <textarea
                value={currentQuestion.answer}
                onChange={(e) => {
                  dispatch(
                    saveQuestion({
                      id: currentQuestion.id,
                      answer: e.target.value,
                    })
                  )
                }}
                className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                placeholder='Enter your answer'
              />
            </div>
          </div>
        )
      case 'truefalse':
        return (
          <div className='flex flex-col w-full'>
            <div className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row justify-between'>
              <div className='flex flex-row'>
                <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                  Question
                </label>
                <input
                  value={currentQuestion.content}
                  onChange={(e) => {
                    dispatch(
                      saveQuestion({
                        id: currentQuestion.id,
                        content: e.target.value,
                      })
                    )
                  }}
                  className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Enter your question'
                />
              </div>
              <div>
                <button
                  onClick={(e) => handleDeleteQuestion(e, currentQuestion.id)}
                  className='w-5 h-5 border border-purple-400 text-purple-100 rounded focus:outline-none hover:bg-purple-400'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 92 92'
                    fill='#5B21B6'
                  >
                    <path d='M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3a4.47 4.47 0 010-6.4L39.6 46 21.3 27.7a4.47 4.47 0 010-6.4c1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='ml-4'>
              <input
                type='radio'
                name={`choice${currentQuestion.id}`}
                value='true'
                className='outline-none'
                defaultChecked={currentQuestion.answer === true}
                onChange={(e) => {
                  if (!currentQuestion.answer && e.target.checked) {
                    dispatch(
                      saveQuestion({
                        id: currentQuestion.id,
                        answer: true,
                      })
                    )
                  }
                }}
              />
              <label
                htmlFor='choice'
                className=' px-1 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'
              >
                true
              </label>
              <br></br>
              <input
                type='radio'
                name={`choice${currentQuestion.id}`}
                value='false'
                defaultChecked={currentQuestion.answer === false}
                className='outline-none'
                onChange={(e) => {
                  if (currentQuestion.answer && e.target.checked) {
                    dispatch(
                      saveQuestion({
                        id: currentQuestion.id,
                        answer: false,
                      })
                    )
                  }
                }}
              />
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

QuizQuestion.propTypes = {
  id: PropTypes.number,
}
export default QuizQuestion
