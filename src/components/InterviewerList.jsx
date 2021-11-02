import React from "react"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types"
import "./InterviewerList.scss"

const InterviewerList = (props) => {
  const { interviewers, onChange, value } = props



  return ( 
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(eachInterviewer => (
          <InterviewerListItem
             key={eachInterviewer.id}
             name={eachInterviewer.name}
             avatar={eachInterviewer.avatar}
             selected={eachInterviewer.id === value} 
             setInterviewer={() => onChange(eachInterviewer.id)}
          />
        ))}
      </ul>
    </section>
   );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}
 
export default InterviewerList;