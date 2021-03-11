import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'

import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { isEmail } from 'validator'
import { register } from '../actions/auth'

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

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div
        className='text-center text-red-800 bg-red-200 border border-rounded'
        role='alert'
      >
        This is not a valid email.
      </div>
    )
  }
}

const vfirstname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div
        className='text-center text-red-800 bg-red-200 border border-rounded'
        role='alert'
      >
        The username must be between 2 and 20 characters.
      </div>
    )
  }
}

const vlastname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div
        className='text-center text-red-800 bg-red-200 border border-rounded'
        role='alert'
      >
        The username must be between 2 and 20 characters.
      </div>
    )
  }
}
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div
        className='text-center text-red-800 bg-red-200 border border-rounded'
        role='alert'
      >
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

const RegistrationForm = () => {
  const message = useSelector((state) => state.message.message)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [role, setRole] = useState('teacher')
  const form = useRef(null)
  const checkBtn = useRef(null)
  const dispatch = useDispatch()

  const handleRegister = (e) => {
    e.preventDefault()

    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstName, lastName, email, password, role))
        .then(() => {
          setSuccessful(true)
        })
        .catch(() => {
          setSuccessful(false)
        })
    }
  }

  return (
    <Form className='mt-8' onSubmit={handleRegister} ref={form}>
      {!successful && (
        <div>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded shadow-sm'>
            <div>
              <label className='text-sm text-gray-500'>First Name</label>
              <Input
                aria-label='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                validations={[required, vfirstname]}
                name='firstname'
                type='firstname'
                required
                className='relative block w-full px-3 py-2 text-gray-800 placeholder-purple-400 border border-purple-200 rounded appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
              />
            </div>
            <div>
              <label className='text-sm text-gray-500'>Last Name</label>
              <Input
                aria-label='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                validations={[required, vlastname]}
                name='lastname'
                type='lastname'
                required
                className='relative block w-full px-3 py-2 text-gray-800 placeholder-purple-400 border border-purple-200 rounded appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
              />
            </div>
            <div className='mt-2 mb-1'>
              <label className='mr-3 text-sm text-gray-500'>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='text-xs bg-purple-100 border border-purple-300'
              >
                <option value='teacher'>Teacher</option>
                <option value='student'>Student</option>
              </select>
            </div>
            <div>
              <label className='text-sm text-gray-500'>Email address</label>
              <Input
                aria-label='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validations={[required, vemail]}
                name='email'
                type='email'
                required
                className='relative block w-full px-3 py-2 text-gray-800 placeholder-purple-400 border border-purple-200 rounded appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
              />
            </div>
            <div>
              <label className='text-sm text-gray-500'>Password</label>
              <Input
                aria-label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validations={[required, vpassword]}
                name='password'
                type='password'
                required
                className='relative block w-full px-3 py-2 text-gray-800 placeholder-purple-400 border border-purple-200 rounded appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
              />
            </div>
          </div>
          <div className='pb-4 mt-4'>
            <button
              type='submit'
              className='relative flex justify-center w-full px-2 py-2 mb-2 text-sm font-medium leading-4 text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none'
            >
              Sign up
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className='form-group'>
          <div
            className={
              successful ? 'alert alert-success' : 'alert alert-danger'
            }
            role='alert'
          >
            {message}
          </div>
        </div>
      )}
      <CheckButton style={{ display: 'none' }} ref={checkBtn} />
    </Form>
  )
}

export default RegistrationForm
