import { useState } from 'react'
import './App.css'
import NavBar from '../components/NavBar/NavBar'
import MainHolder from '../components/MainHolder/MainHolder'

/*Components*/


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <MainHolder/>
    </>
  )
}

export default App
