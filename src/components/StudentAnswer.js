import { saveQuestion, updateChoices } from '../actions/quiz'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { updateAnswer } from '../actions/quizSubmission'
import { useState } from 'react'

const StudentAnswer = ({ indx, id }) => {
  const questions = useSelector((state) => state.quiz.questions)
  const [curIndex, setCurIndex] = useState(
    questions.findIndex((q) => q.id === id)
  )
  const currentQuestion = useSelector((state) => state.quiz.questions[curIndex])
  const currentStudentAnswer = useSelector(
    (state) => state.submission.studentAnswers[indx]
  )
  const choicesState = useSelector(
    (state) => state.quiz.questions[curIndex].answer_choices
  )
  const dispatch = useDispatch()

  const renderQuestion = (currentQuestion, currentStudentAnswer) => {
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
                    <div className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'>
                      {currentQuestion.content}
                    </div>
                  </div>
                </div>
                <div className='text-gray-700 ml-4 text-xs pb-2'>
                  Tick correct answers
                </div>
                {choicesState.map((choice, idx) => (
                  <div key={idx} className='flex flex-row'>
                    <input
                      type='checkbox'
                      checked={choice.correct}
                      className='mx-2 outline-none '
                      onChange={(e) => {
                        dispatch(
                          updateAnswer({
                            idx: indx,
                            answer: choice.id,
                          })
                        )
                      }}
                    />
                    <div className='px-2 py-1  text-xs leading-tight text-gray-700 focus:outline-none focus:bg-white'>
                      {choice.content}
                    </div>
                  </div>
                ))}
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
                    <div className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'>
                      {currentQuestion.content}
                    </div>
                  </div>
                </div>
                <div className='text-gray-700 ml-4 text-xs pb-2'>
                  Tick the correct answer
                </div>
                {choicesState.map((choice, idx) => (
                  <div key={idx} className='flex flex-row'>
                    <input
                      type='radio'
                      checked={choice.correct}
                      name='single'
                      className='outline-none mx-2'
                      onChange={(e) =>
                        dispatch(
                          updateAnswer({
                            idx: indx,
                            answer: choice.id,
                          })
                        )
                      }
                    ></input>
                    <div className='px-2 py-1  text-xs leading-tight text-gray-700 focus:outline-none focus:bg-white'>
                      {choice.content}
                    </div>
                  </div>
                ))}
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
                <div className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'>
                  {currentQuestion.content}
                </div>
              </div>
            </div>
            <div className='flex flex-row'>
              <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                Answer
              </label>
              <textarea
                onChange={(e) => {
                  dispatch(
                    updateAnswer({
                      idx: indx,
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
                <div className='w-80 px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'>
                  {currentQuestion.content}
                </div>
              </div>
            </div>
            <div className='ml-4'>
              <input
                type='radio'
                name={`choice${currentQuestion.id}`}
                value='true'
                className='outline-none'
                defaultChecked={currentStudentAnswer.true_false_answer === true}
                onChange={(e) => {
                  if (
                    !currentStudentAnswer.true_false_answer &&
                    e.target.checked
                  ) {
                    dispatch(
                      updateAnswer({
                        idx: indx,
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
                defaultChecked={
                  currentStudentAnswer.true_false_answer === false
                }
                className='outline-none'
                onChange={(e) => {
                  if (
                    currentStudentAnswer.true_false_answer &&
                    e.target.checked
                  ) {
                    dispatch(
                      updateAnswer({
                        idx: indx,
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
        {renderQuestion(currentQuestion, currentStudentAnswer)}
      </div>
    </div>
  )
}

StudentAnswer.propTypes = {
  indx: PropTypes.number,
  id: PropTypes.number,
}
export default StudentAnswer
