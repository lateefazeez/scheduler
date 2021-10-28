import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


const Form = (props) => {
  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const handleNameChange = (e) => {
    e.preventDefault()
    setStudent(e.target.value)
  }

  const reset = () => {
    setStudent("")
    setInterviewer("")
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={handleNameChange}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers} 
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
   );
}
 
export default Form;