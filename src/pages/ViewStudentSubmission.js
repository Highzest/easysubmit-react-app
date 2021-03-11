import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { UPDATE_SUBMISSION } from '../actions/types'
import authHeader from '../services/auth-header'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ViewStudentSubmission = () => {
  const [grade, setGrade] = useState('')
  const [comments, setComments] = useState('')
  const quiz = useSelector((state) => state.quiz)
  const [isLoading, setLoading] = useState(true)
  const { id } = useParams()
  const [submission, setSubmission] = useState({})
  const [open, setOpen] = useState([])
  const [truefalse, setTruefalse] = useState([])
  const [single, setSingle] = useState([])
  const [multiple, setMultiple] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    let subID = id
    axios
      .get(
        `https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/teacher/${quiz.teacherLink}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        if (response.data) {
          setSubmission(
            response.data.quiz_submissions.find((sub) => sub.id == subID)
          )
          setOpen(response.data.open_questions)
          setTruefalse(response.data.true_false_questions)
          setMultiple(response.data.multiple_choice_questions)
          setLoading(false)
        }
      })
      .catch((er) => {
        console.log(er.message)
      })
  }, [])

  return (
    <div>
      <Header />
      <div className='flex flex-col items-center min-h-screen px-4 py-2 bg-purple-100 justify-top sm:px-6 lg:px-8 '>
        <div className='flex flex-col items-center justify-center pb-4'></div>
        <div className='pt-4 text-xl font-bold text-purple-900'>
          Quiz Submissions
        </div>
        <div className='w-3/4 p-4 bg-purple-300 border border-purple-300 rounded'>
          {isLoading ? null : (
            <div>
              <h2 className='block px-4 pt-1 mb-2 text-xs tracking-wide text-gray-700 '>
                <strong>Student Name:</strong>

                <span className='text-purple-900'>
                  {submission.student_fullname}
                </span>
              </h2>
              <h2 className='block px-4 pt-1 mb-2 text-xs tracking-wide text-gray-700 '>
                <strong>Questions:</strong>
              </h2>
              {open.map((q, idx) => (
                <div
                  key={idx}
                  className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row w-full'
                >
                  <div className='flex flex-col border border-purple-400 rounded w-full'>
                    <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                      {q.content}
                    </label>
                    <label className='px-2'>Student`s Answer:</label>
                    <span className='text-sm text-gray-500 px-4'>
                      {
                        submission.student_answers.find(
                          (a) => open[idx].id == a.open_question_id
                        ).open_answer
                      }
                    </span>

                    <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700 mb-2'>
                      <strong>Score:</strong>
                      <span className='text-purple-900'>
                        <input
                          value={submission.grade}
                          onChange={(e) =>
                            dispatch({
                              type: UPDATE_SUBMISSION,
                              payload: {
                                ...submission,
                                grade: e.target.value,
                              },
                            })
                          }
                          className='w-10 px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                          type='text'
                          placeholder=''
                        />
                      </span>
                      <br />
                    </p>
                  </div>
                </div>
              ))}
              {truefalse.map((q, idx) => (
                <div
                  key={idx}
                  className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row w-full'
                >
                  <div className='flex flex-col border border-purple-400 rounded w-full'>
                    <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                      {q.content}
                    </label>
                    <label className='px-2'>Students Answer:</label>
                    <span className='text-sm text-gray-500 px-4'>
                      {JSON.stringify(
                        submission.student_answers.find(
                          (a) => q.id == a.true_false_question_id
                        ).true_false_answer
                      )}
                    </span>

                    <p className='block px-4 mb-2 pt-1 text-xs tracking-wide text-gray-700'>
                      <strong>Score:</strong>
                      <span className='text-purple-900'>
                        <input
                          value={submission.grade}
                          onChange={(e) =>
                            dispatch({
                              type: UPDATE_SUBMISSION,
                              payload: {
                                ...submission,
                                grade: e.target.value,
                              },
                            })
                          }
                          className='w-10 px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                          type='text'
                          placeholder=''
                        />
                      </span>
                      <br />
                    </p>
                  </div>
                </div>
              ))}
              {multiple.map((q, idx) => (
                <div
                  key={idx}
                  className='flex px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 flex-row w-full'
                >
                  <div className='flex flex-col border border-purple-400 rounded w-full'>
                    <label className='block px-2 pt-1 mb-2 text-xs font-bold tracking-wide text-purple-800'>
                      {q.content}
                    </label>
                    <label className='px-2'>Students Answer:</label>
                    <span className='text-sm text-gray-500 px-4'>
                      {JSON.stringify(
                        q.answer_choices.filter(
                          (c) =>
                            c.id ===
                            submission.student_answers.filter(
                              (a) => q.id == a.multiple_choice_question_id
                            ).multiple_choice_answer
                        )
                      )}
                    </span>

                    <p className='block px-4 mb-2 pt-1 text-xs tracking-wide text-gray-700'>
                      <strong>Score:</strong>
                      <span className='text-purple-900'>
                        <input
                          value={submission.grade}
                          onChange={(e) =>
                            dispatch({
                              type: UPDATE_SUBMISSION,
                              payload: {
                                ...submission,
                                grade: e.target.value,
                              },
                            })
                          }
                          className='w-10 px-2 py-1 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                          type='text'
                          placeholder=''
                        />
                      </span>
                      <br />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ViewStudentSubmission
/*{
  isLoading
    ? null
    : quiz.questions.map((q, idx) => {
        switch (q.qType) {
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
                          {q.content}
                        </div>
                        <label>Student`&apos;`s Answer:</label>
                        {submission.find((s) => s.quiz_id === q.id)}
                      </div>
                    </div>
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
                        <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700'>
                          Option {idx + 1}
                        </label>
                        <input
                          type='radio'
                          checked={choice.correct}
                          name='single'
                          className='outline-none mx-2'
                          onChange={(e) =>
                            dispatch(
                              updateChoices(currentQuestion.id, choice.id)
                            )
                          }
                        ></input>
                        <label
                          value={choice.content}
                          className='px-2 py-1  text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                        />
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
                    checked={currentQuestion.answer === true}
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
                    checked={currentQuestion.answer === false}
                    className='outline-none'
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
                    false
                  </label>
                  <br></br>
                </div>
              </div>
            )
          case 'default':
            return null
        }
      })
}
*/
