import React from "react"


export default function AnswerChoice(props) {
  return (
    <>
      <div className="answers">
        <input type="radio" 
                id={props.id} 
                name={props.name} 
                value={props.text}
                style={props.setStyle}
                checked={props.checkTrue}
                onClick={(event) => props.clickEvent(event)}></input>
        <label className="answerChoice" htmlFor={props.id}>{props.text}</label>
      </div>
</>
  )
}