import React  from "react"
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appintment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview} = useApplicationData()

  

  
  
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const schedule = dailyAppointments.map(appointment => { 
    const interview = getInterview(state, appointment.interview)
    const dailyInterviewers = getInterviewersForDay(state, state.day)
      return (
        <Appointment 
          key={appointment.id}
          interview={interview}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          appointment={appointment} 
        />
      )
    }
  )

  return (
    <main className="layout">
      <section className="sidebar">
        <img 
        src="images/logo.png" 
        alt="Interview Scheduler" 
        className="sidebar--centered" 
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img 
        src="images/lhl.png" 
        alt="Lighthouse Labs" 
        className="sidebar__lhl sidebar--centered" />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
