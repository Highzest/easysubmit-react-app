import Footer from '../components/Footer'
import Header from '../components/Header'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { access_token, first_name, last_name, email, role } = useSelector(
    (state) => state.auth
  )

  if (!access_token) {
    return <Redirect to='/signin' />
  }

  return (
    <div>
      <Header />
      <div className='flex flex-col items-center min-h-screen px-4 py-2 bg-purple-100 justify-top sm:px-6 lg:px-8 '>
        <div className='flex flex-col items-center justify-center pb-4'>
          <div className='pt-4 text-xl font-bold text-purple-900'>
            My profile
          </div>
        </div>
        <div className='p-4 bg-purple-300 border border-purple-300 rounded w-1-2'>
          <p className='text-purple-900'>
            <strong>First Name: </strong> {first_name}
          </p>
          <p className='text-purple-900'>
            <strong>Last Name: </strong> {last_name}
          </p>
          <p className='text-purple-900'>
            <strong>Email:</strong> {email}
          </p>
          <p className='text-purple-900'>
            <strong>Role:</strong> {role}
          </p>
          <p className='mt-3 text-purple-900'>
            <strong>Change Password </strong>
          </p>

          <form className=''>
            <div className='flex flex-row items-center pb-2 items'>
              <div className='flex flex-col'>
                <label className='block w-full px-4 pt-1 mb-2 ml-5 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                  New Password
                </label>
                <input
                  className='px-2 py-1 mr-6 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                  id='title'
                  type='text'
                  placeholder=''
                />
              </div>
              <div className='flex flex-col'>
                <label className='block w-full px-4 pt-1 mb-2 ml-3 text-xs font-bold tracking-wide text-gray-700 uppercase'>
                  Confirm Password
                </label>
                <input
                  className='px-2 py-1 mx-2 text-xs leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
                  id='title'
                  type='text'
                  placeholder=''
                />
              </div>
            </div>
            <button
              type='submit'
              className='relative flex justify-center w-full px-2 py-1 mb-2 text-sm font-medium leading-4 text-purple-200 transition duration-150 ease-in-out bg-purple-800 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none'
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
