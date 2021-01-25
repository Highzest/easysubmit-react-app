import logo from './logo.svg'

function App() {
  return (
    <div className='flex items-center justify-center h-screen bg-blue-900'>
      <header className='flex-col items-center justify-center'>
        <img src={logo} className='w-full h-64 animate-bounce' alt='logo' />
        <p className='text-xl text-gray-400'>
          Edit
          <code className='p-1 mx-1 bg-gray-900 rounded-md'>src/App.js</code>
          and save to reload.
        </p>
        <div className='flex justify-center mt-8 font-medium'>
          <a
            className='text-5xl'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </div>
      </header>
    </div>
  )
}

export default App
