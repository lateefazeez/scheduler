import React from "react"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import "./styles.scss"


const Appointment = (props) => {
  const { time, interview} = props

  const displayAppointment = () => {
    if (time) {
      return `Appointment at ${time}`
    } else {
      return "No Appointments"
    }
  }

  return ( 
    <article time={time}  className="appointment">
      <Header time={time} />
      { interview ? <Show student={interview.student} interviewer={interview.interviewer.name}  /> : <Empty /> }
    </article>
   );
}
 
export default Appointment;