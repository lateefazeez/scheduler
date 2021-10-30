import React, { useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appintment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day})
  // const setDays = days => setState(prev => ({ ...prev, days}))

  useEffect(() => {
    const daysUrl = "/api/days"
    const appointmentsUrl = "/api/appointments"
    const interviewersUrl = "/api/interviewers"
    const getDays = axios.get(daysUrl)
    const getAppointments = axios.get(appointmentsUrl)
    const getInterviewers = axios.get(interviewersUrl)

    Promise.all([getDays, getAppointments, getInterviewers])
      .then(response => {
        setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
      })
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
  const schedule = dailyAppointments.map(appointment => { 
    
    const interview = getInterview(state, appointment.interview)
    console.log("INTERVIEW", interview)
      return (
        <Appointment 
          key={appointment.id}
          interview={interview} 
          {...appointment} 
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
