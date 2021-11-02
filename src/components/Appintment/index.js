import React from "react"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import useVisualMode from "hooks/useVisualMode"
import "./styles.scss"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"


const Appointment = (props) => {
  const { time, interview, appointment, interviewers, bookInterview, cancelInterview } = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const BACK = "BACK"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(appointment.id, interview)
    .then(() => transition(SHOW))
    .catch(() => {
      transition(ERROR_SAVE, true)
    })
  }

  const edit = () => {
    transition(EDIT)
  }

  const deleteAppointment = () => {

    transition(DELETING, true)
    cancelInterview(appointment.id)
      .then(() => transition(EMPTY))
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  }

  const confirm = () => {
    transition(CONFIRM)
  }

  return ( 
    <article time={time}  className="appointment">
      <Header time={time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && (
       <Show 
          student={interview.student} 
          interviewer={interview.interviewer.name}
          onEdit={edit}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && <Form
        interviewers={interviewers}
        onSave={save}
        onCancel={() => back() } /> }
      {mode === SAVING && <Status
        message={"Saving"}
      /> }
      {mode === DELETING && <Status
        message={"Deleting"}
      />}
      {mode === CONFIRM && <Confirm
        message={ "Are you sure you would like to delete?"}
        onCancel={() => back()}
        onConfirm={deleteAppointment}
      />}
      {mode === EDIT && <Form
        interviewers={interviewers}
        studentName={interview.student} 
        interviewerName={interview.interviewer.id}
        onSave={save}
        onCancel={() => back() } 
      /> }
       {mode === ERROR_SAVE && <Error
        onClose={() => back() } 
        message="Could not save Appointment"
      />}
      {mode === ERROR_DELETE && <Error
        onClose={() => back() } 
        message="Could not cancel appointment"
      />}
    </article>
   );
}
 
export default Appointment;

