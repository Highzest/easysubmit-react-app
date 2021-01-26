import Footer from '../components/Footer'
import Header from '../components/Header'

const Attendance = () => {
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center min-h-screen px-4 py-2 bg-purple-100 justify-top sm:px-6 lg:px-8 '>
        <div className='flex flex-col items-center justify-center pb-4'>
          <div className='pt-4 text-xl font-bold text-purple-900 '>
            Creating an Attendance check
          </div>
        </div>
        <form className='w-3/4 p-4 bg-purple-300 border border-purple-300 rounded'>
          <div className='flex flex-row items-center pb-2 items'>
            <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
              Title*
            </label>
            <input
              className='px-2 py-1 leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
              id='title'
              type='text'
              placeholder='Enter the title'
            />
          </div>
          <div className='flex flex-row items-center pb-2 items'>
            <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
              Open date and time*
            </label>
            <input
              className='block w-1/4 px-2 py-1 leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
              id='open-date'
              name='trip-start'
              type='date'
              min='2020-10-16'
              max='2021-12-31'
            />
            <input
              className='block w-1/6 px-2 py-1 ml-3 leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
              id='open-time'
              name='trip-start'
              type='time'
              min='00:00'
              max='11:59'
            />
          </div>
          <div className='flex flex-row items-center pb-2 items'>
            <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
              Close date and time*
            </label>
            <input
              className='block w-1/4 px-2 py-1 leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
              id='close-date'
              name='trip-start'
              type='date'
              min='2020-10-16'
              max='2021-12-31'
            />
            <input
              className='block w-1/6 px-2 py-1 ml-3 leading-tight text-gray-700 border border-purple-400 rounded focus:outline-none focus:bg-white'
              id='close-time'
              name='trip-start'
              type='time'
              min='00:00'
              max='11:59'
            />
          </div>
          <div className='flex flex-col w-1/2 pb-2 mb-2 border border-purple-400 rounded'>
            <label className='block px-4 pt-1 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'>
              Choose an attendance type*
            </label>
            <div>
              <div className='flex flex-row pl-4'>
                <input
                  type='radio'
                  id='choice1'
                  name='attendance-type'
                  value='Face-recognition'
                />
                <label
                  htmlFor='choice1'
                  className='px-2 py-1 leading-tight text-gray-700 rounded'
                >
                  Face recognition
                </label>
              </div>
              <div className='flex flex-row pl-4'>
                <input
                  type='radio'
                  id='choice2'
                  name='attendance-type'
                  value='Generated-ID'
                />
                <label
                  htmlFor='choice2'
                  className='px-2 py-1 leading-tight text-gray-700 rounded'
                >
                  Generated ID
                </label>
              </div>
              <div className='flex flex-row pl-4'>
                <input
                  type='radio'
                  id='choice3'
                  name='attendance-type'
                  value='QR-code'
                />
                <label
                  htmlFor='choice3'
                  className='px-2 py-1 leading-tight text-gray-700 rounded'
                >
                  QR code
                </label>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <input
              className='px-4 py-2 font-bold text-white bg-purple-800 rounded shadow hover:bg-purple-500 focus:shadow-outline focus:outline-none'
              type='submit'
              value='Generate a link'
            />
          </div>
          <div className='flex flex-col items-center justify-center mt-2 items'>
            <textarea
              rows='1'
              className='w-1/2 px-2 py-1 leading-tight text-gray-700 border border-purple-300 rounded focus:outline-none focus:bg-white'
              id='description'
              type='text'
            />
          </div>
        </form>
        <small className='mt-4'>* - Required field </small>
      </div>
      <Footer />
    </div>
  )
}

export default Attendance
