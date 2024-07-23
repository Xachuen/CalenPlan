import { useState } from 'react'
import './App.css'
import StartPage from '../components/StartPage/StartPage'
import NavBar from '../components/NavBar/NavBar'

/*Components*/


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      {/* <StartPage/> */}
    </>
  )
}

export default App
