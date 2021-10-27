import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";

export default function Application(props) {
  const [day, setDay] = useState("Monday")

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
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
            days={days} 
            day={day}
            setDay={setDay} 
          />
        </nav>
        <img 
        src="images/lhl.png" 
        alt="Lighthouse Labs" 
        className="sidebar__lhl sidebar--centered" />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
