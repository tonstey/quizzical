import React from "react"
import AnswerChoice from "./answers/AnswerChoice";
import CorrectAnswer from "./answers/CorrectAnswer";
import {nanoid} from "nanoid"

function Question(props) {
  // Creates Object of Essential Information of Each Answer Choice
  let answer = props.shuffledAnswers.map(answer => {
      return {
        id: nanoid(),
        text: answer,
      }
    }
  )

  // Quiz Setup
  const [answerList, setAnswerList] = React.useState(answer.map(element => {
        return (
          <AnswerChoice 
            key={nanoid()+element.text}
            id={element.id}
            name={props.question}
            setStyle={{}}
            text={element.text}
            checkTrue={element.text === props.finalAnswers}
            clickEvent={(event) => props.changeFinal(event.target.value)}
          />
        )
      })

  )

  // Displaying Quiz Answers After Clicking Check Answers
  React.useEffect(() => {
    if (props.showCorrect){
      setAnswerList(answer.map(element => {
        return (
          <CorrectAnswer
            key={nanoid()+element.text}
            id={element.id}
            name={props.question}
            text={element.text}
            setStyle={{backgroundColor: element.text === props.correctAnswer ? "#94D7A2": 
                                        (element.text === props.finalAnswers ? "#FF6961" : "transparent"),
                                        opacity: element.text === props.correctAnswer ? "1" : "0.5",
                      }
            }
          />
      )}))
     
    }

  },[props.showCorrect, props.finalAnswers])

  return (
    <>
      <div className="entity">
        <div className="question" id="question">{props.question}</div>
        <div className="answer-container" id="answer-container">
          {answerList}
        </div>
        <hr></hr>
      </div>
    </>
  )
}

export default React.memo(Question)