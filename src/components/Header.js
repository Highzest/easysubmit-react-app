import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { logout } from '../actions/auth'

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  return (
    <div className='flex justify-center w-full px-4 py-2 bg-purple-900'>
      <div className='w-full max-w-3xl '>
        <div className='flex items-center justify-between text-purple-200'>
          <Link to='/'>
            <div className='font-mono text-2xl text-purple-100 cursor-pointer select-none hover:text-purple-300'>
              EasySubmit
            </div>
          </Link>
          <div className='flex'>
            {isLoggedIn ? (
              <div>
                <Link to='/profile'>
                  <button
                    type='button'
                    className='w-16 h-8 p-1 mr-2 text-xs font-thin border-2 border-purple-100 rounded-lg focus:outline-none active:border-purple-900 hover:text-purple-300 hover:border-purple-300 '
                  >
                    My profile
                  </button>
                </Link>
                <Link to='/'>
                  <button
                    type='button'
                    onClick={() => dispatch(logout)}
                    className='w-16 h-8 p-1 text-xs font-thin border-2 border-purple-100 rounded-lg focus:outline-none hover:text-purple-300 hover:border-purple-300'
                  >
                    Sign out
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to='/signin'>
                  <button
                    type='button'
                    className='w-16 h-8 p-1 mr-2 text-xs font-thin border-2 border-purple-100 rounded-lg focus:outline-none active:border-purple-900 hover:text-purple-300 hover:border-purple-300 '
                  >
                    Sign in
                  </button>
                </Link>
                <Link to='/signup'>
                  <button
                    type='button'
                    className='w-16 h-8 p-1 text-xs font-thin border-2 border-purple-100 rounded-lg focus:outline-none hover:text-purple-300 hover:border-purple-300'
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
