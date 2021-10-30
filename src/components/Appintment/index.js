import React from "react"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import useVisualMode from "hooks/useVisualMode"
import "./styles.scss"
import Form from "./Form"


const Appointment = (props) => {
  const { time, interview, interviewers } = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const BACK = "BACK"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)


  return ( 
    <article time={time}  className="appointment">
      <Header time={time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && (
        <Show 
          student={interview.student} 
          interviewer={interview.interviewer.name}
          onEdit={() => console.log("Clicked onEdit") }
          onDelete={() => console.log("Clicked onDelete") }
        />
      )}
      {mode === CREATE && <Form
        interviewers={interviewers}
        onSave={() => console.log("Clicked onSave") }
        onCancel={() => back(EMPTY) } /> }
    </article>
   );
}
 
export default Appointment;