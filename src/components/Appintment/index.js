import React from "react"
import "./styles.scss"

const Appointment = (props) => {
  const { time } = props

  const displayAppointment = () => {
    if (time) {
      return `Appointment at ${time}`
    } else {
      return "No Appointments"
    }
  }

  return ( 
    <article time={time}  className="appointment">
      { displayAppointment() }
    </article>
   );
}
 
export default Appointment;