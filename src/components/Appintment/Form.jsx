import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


const Form = (props) => {
  const { studentName, interviewerName, onSave } = props
  const [student, setStudent] = useState(studentName || "")
  const [interviewer, setInterviewer] = useState(interviewerName || null)
  const [error, setError] = useState("")
  // const [error2, setError2] = useState("")

  const handleNameChange = (e) => { 
    setStudent(e.target.value)
  }

  const reset = () => {
    
    setStudent("")
    setInterviewer("")
  }

  const cancel = () => {
    setError("")
    reset()
    props.onCancel()
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Interviewer must be selected")
      return;
    }
    setError("")
    onSave(student, interviewer);
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
            data-testid = "student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers} 
          onChange={setInterviewer}
          value={interviewer}
          data-testid = "interviewer"
        />
        </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
   );

}
 
export default Form;