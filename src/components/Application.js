import React, { useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appintment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = day => setState({ ...state, day})
  // const setDays = days => setState(prev => ({ ...prev, days}))

  useEffect(() => {
    const daysUrl = "/api/days"
    const appointmentsUrl = "/api/appointments"
    const getDays = axios.get(daysUrl)
    const getAppointments = axios.get(appointmentsUrl)

    Promise.all([getDays, getAppointments])
      .then(response => {
        setState(prev => ({...prev, days: response[0].data, appointments: response[1].data}))
        console.log("DAYS", response[0].data, "APPOINTMENTS", response[1].data)
      })
  }, [])
  
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
        {dailyAppointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
