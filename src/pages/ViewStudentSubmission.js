import {
  createSubmission,
  gradeSubmission,
  markIsCorrect,
} from '../actions/quizSubmission'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { Redirect } from 'react-router-dom'
import authHeader from '../services/auth-header'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ViewStudentSubmission = () => {
  const [grade, setGrade] = useState('')
  const [comments, setComments] = useState('')
  const quiz = useSelector((state) => state.quiz)
  const submissionState = useSelector((state) => state.submission)
  const [isLoading, setLoading] = useState(true)
  const [isCorrect, SetIsCorrect] = useState(false)
  const { id, randomStr } = useParams()
  const [submission, setSubmission] = useState({})
  const [open, setOpen] = useState([])
  const [truefalse, setTruefalse] = useState([])
  const [single, setSingle] = useState([])
  const [multiple, setMultiple] = useState([])
  const dispatch = useDispatch()
  const [successful, setSuccessful] = useState(false)

  useEffect(() => {
    let subID = id
    axios
      .get(
        `https://radiant-inlet-12251.herokuapp.com/api/v1/quiz/teacher/${randomStr}`,
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
          dispatch(
            createSubmission({
              ...response.data.quiz_submissions.find((sub) => sub.id == subID),
            })
          )
          setLoading(false)
        }
      })
      .catch((er) => {
        console.log(er.message)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      gradeSubmission(
        submissionState.id,
        submissionState.grade,
        submissionState.comments,
        submissionState.submitted_at,
        submissionState.updated_at,
        submissionState.student_fullname,
        submissionState.student_id,
        submissionState.quiz_id,
        submissionState.student_answers
      )
    )
      .then(() => {
        setSuccessful(true)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }
  if (successful) {
    return <Redirect to={`/teacher-quiz-page/${randomStr}`} />
  }
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
                    <div className='flex flex-row justify-end'>
                      <p className='block px-4 pt-1 text-xs tracking-wide text-gray-700 mb-2'>
                        <strong>Correct?</strong>
                        <span className='text-purple-900'>
                          <input
                            type='checkbox'
                            checked={
                              submissionState.student_answers.find(
                                (a) => q.id == a.open_question_id
                              ).is_correct
                            }
                            className='mx-2 outline-none '
                            onChange={(e) => {
                              console.log(idx)
                              dispatch(
                                markIsCorrect({
                                  idx: idx,
                                  isCorrect: e.target.checked,
                                })
                              )
                            }}
                          />
                        </span>
                        <br />
                      </p>
                    </div>
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
                    <div className='flex flex-row justify-end'>
                      {submission.student_answers.find(
                        (a) => q.id == a.true_false_question_id
                      ).is_correct ? (
                        <p className='block px-4 mb-2 pt-1 text-xs tracking-wide text-red-600 '>
                          <strong>Correct!</strong>
                        </p>
                      ) : (
                        <p className='block px-4 mb-2 pt-1 text-xs tracking-wide text-red-600 '>
                          <strong>Incorrect!</strong>
                        </p>
                      )}
                    </div>
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
                      {submission.student_answers
                        .map((a) => {
                          if (q.id == a.multiple_choice_question_id) {
                            return a.multiple_choice_answer
                          }
                        })
                        .filter((a) => a != undefined)
                        .map((a, idx) => {
                          return (
                            <li key={idx} className='mx-3'>
                              {q.answer_choices.find((n) => a == n.id).content}
                            </li>
                          )
                        })}
                    </span>

                    <div className='flex flex-row justify-end'>
                      {submission.student_answers.find(
                        (a) => q.id == a.multiple_choice_question_id
                      ).is_correct ? (
                        <p className='block px-4 mb-2 pt-1 text-xs tracking-wide text-red-600 '>
                          <strong>Correct!</strong>
                        </p>
                      ) : (
                        <p className='block px-4 mb-2 pt-1 text-xs tracking-wide text-red-600 '>
                          <strong>Incorrect!</strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='relative flex justify-center w-full px-2 py-1 mb-2 text-sm font-medium leading-4 text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500  hover:text-white focus:outline-none'
              >
                Finish Grading
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ViewStudentSubmission
