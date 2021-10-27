import React from "react"
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

const InterviewerList = (props) => {
  const { interviewers, setInterviewer, interviewer } = props



  return ( 
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(eachInterviewer => (
          <InterviewerListItem
             key={eachInterviewer.id}
             id={eachInterviewer.id}
             name={eachInterviewer.name}
             avatar={eachInterviewer.avatar}
             selected={eachInterviewer.id === interviewer} 
             setInterviewer={setInterviewer}
            />
        ))}
      </ul>
    </section>
   );
}
 
export default InterviewerList;