import React from "react"


export default function CorrectAnswer(props) {
  return (
    <>
      <div className="answers">
          <div className="answerChoice"
               id={props.id}
               style={props.setStyle}>{props.text}</div>
      </div>
    </>
  )
}