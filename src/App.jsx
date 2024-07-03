import { useState , useEffect} from 'react'
import './App.css'

import Start from "./components/Start.jsx"
import Quiz from "./components/Quiz.jsx"

function App() {

  const [startGame, setStartGame] = useState(false)
  const [numQuestions, setNumQuestions] = useState(1)
 
  return (
    <>
      {startGame ? 
        <Quiz 
          questions={numQuestions}
          resetGame={()=>{
            setStartGame(false)
          }}
        /> : 
        <Start 
          start={() => setStartGame(true)}
          setQuestions={(num) => setNumQuestions(num)}
        />}
    </>
  )
}

export default App
