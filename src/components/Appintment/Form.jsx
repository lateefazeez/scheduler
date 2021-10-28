import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


const Form = (props) => {
  const { student, interviewer, interviewers, onSave, onCancel } = props

  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={setName}
          />
        </form>
        <InterviewerList 
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
   );
}
 
export default Form;