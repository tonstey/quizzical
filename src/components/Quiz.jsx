import React from "react"
import Question from "./Question.jsx"
import {nanoid} from "nanoid"
import {decode} from "html-entities"

export default function Quiz(props) {

  const [quizData, setQuizData] = React.useState([])
  const [showCorrect, setShowCorrect] = React.useState(false)
  const [numCorrect, setNumCorrect] = React.useState(0)
  
  const [finalAnswers, setFinalAnswers] = React.useState([])

  let apiLink = `https://opentdb.com/api.php?amount=${props.questions}`

  // Get API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from API...");
        const res = await fetch(apiLink);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Data fetched successfully:", data);

        if (data && data.results) {
          // Randomizes each answer choice
          data.results = data.results.map(element => {
            return {
              ...element,
              shuffledAnswers: [...element.incorrect_answers, element.correct_answer].sort((a,b) => {return 0.5-Math.random()})
            }
          })
          // Initializes object that carry each recorded user answer
          var emptyOb = {}
          for (let i = 0; i < data.results.length; i++){
            emptyOb[data.results[i].question] = ""
          }
          console.log(emptyOb)
          setFinalAnswers(emptyOb)
          setQuizData(data.results);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }
    fetchData()

  }, [apiLink])

  // Format each query
  let quizArray = quizData.map((item) => {
    return (
      <Question
        key={nanoid()}
        showCorrect={showCorrect}
        counter={(isCorrect) => {if (isCorrect){setNumCorrect(prev => prev + 1)}}}
        question={decode(item.question)}
        correctAnswer={decode(item.correct_answer)}
        incorrectAnswer={item.incorrect_answers.map(el => decode(el))}
        shuffledAnswers={item.shuffledAnswers.map(el=>decode(el))}

        finalAnswers={finalAnswers[item.question]}
        changeFinal={(value) => setFinalAnswers(prevState => {
          return {
            ...prevState,
            [item.question]: value
          }
        })}

      />
  )})

  // Sums up total of correct answer
  React.useEffect(()=>{
    let tally = 0
    let tallyArray = quizData.map((item) => {return item.correct_answer === finalAnswers[item.question]})

    for (let i = 0; i < tallyArray.length; i++){
      if (tallyArray[i]) {tally++}
    }

    setNumCorrect(tally)
  }, [finalAnswers])

  return (
    <>
      {quizArray}
      <div id="post-quiz-menu">
        {showCorrect ?
          <div id="play-again-container"> 
            <div>{`You got ${numCorrect}/${props.questions} correct!`}</div>
            <button id="playAgain" onClick={() => {setShowCorrect(false) 
                                                  props.resetGame()}}>Play Again</button>
          </div> 
          : 
          <button id="checkAnswer" onClick={() => setShowCorrect(true)}>Check answers</button>
        }
      </div>
    </>
  )
}
