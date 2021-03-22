import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'

import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { LOGIN_SUCCESS } from '../actions/types'
import { Redirect } from 'react-router-dom'
import { clearMessage } from '../actions/message'
import { login } from '../actions/auth'

const required = (value) => {
  if (!value) {
    return (
      <div
        className='text-center text-red-800 bg-red-200 border border-rounded'
        role='alert'
      >
        This field is required!
      </div>
    )
  }
}

const LoginForm = () => {
  const message = useSelector((state) => state.message.message)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const form = useRef(null)
  const checkBtn = useRef(null)
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password)).then(() => {})

      dispatch(clearMessage())
    }
  }

  if (isLoggedIn) return <Redirect to='/profile' />

  return (
    <Form className='mt-8' onSubmit={handleLogin} ref={form}>
      <input type='hidden' name='remember' value='true' />
      <div className='rounded shadow-sm'>
        <div>
          <Input
            aria-label='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            validations={[required]}
            name='email'
            type='email'
            required
            className='relative block w-full px-3 py-2 text-gray-800 placeholder-purple-400 border border-purple-200 rounded appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
            placeholder='Email address'
          />
        </div>
        <div className='mt-4'>
          <Input
            aria-label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            validations={[required]}
            name='password'
            type='password'
            required
            className='relative block w-full px-3 py-2 text-gray-800 placeholder-purple-400 border border-purple-200 rounded appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
            placeholder='Password'
          />
        </div>
      </div>

      <div className='flex flex-row justify-between mt-2'>
        <div className='flex items-center'>
          <input name='remember-me' type='checkbox' />
          <span className='text-xs text-purple-900'>Remember me</span>
        </div>
        <div className='flex items-center'>
          <a
            href='#'
            className='text-xs font-medium text-purple-900 transition duration-150 ease-in-out hover:text-purple-700 focus:outline-none focus:underline'
          >
            Forgot your password?
          </a>
        </div>
      </div>
      <div className='pb-3 mt-3'>
        <button
          type='submit'
          className='relative flex justify-center w-full px-2 py-1 mb-2 text-sm font-medium leading-4 text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none'
        >
          Sign in
        </button>
      </div>
      {message && (
        <div className='form-group'>
          <div className='alert alert-danger' role='alert'>
            {message}
          </div>
        </div>
      )}
      <CheckButton style={{ display: 'none' }} ref={checkBtn} />
    </Form>
  )
}

export default LoginForm
