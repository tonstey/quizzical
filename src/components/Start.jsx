import React from "react"

export default function Start(props) {
  return (
    <>
      <div className="start-container">
        <h1>Quizzical</h1>
        <h4>General Trivia Quiz</h4>
        <label htmlFor="incrementInput">Choose the number of questions:</label>
        <input type="number" step="1" id="incrementInput" min="1" max="50" 
               onChange={(event) => props.setQuestions(Number(event.target.value))}
        />
        <button onClick={props.start}>Start Quiz</button>
      </div>
    </>
  )
}