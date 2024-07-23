import { useState } from 'react'
import './App.css'
import StartPage from '../components/StartPage/StartPage'

/*Components*/


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StartPage/>
    </>
  )
}

export default App
