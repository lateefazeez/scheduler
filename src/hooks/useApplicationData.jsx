import { useState, useEffect} from "react"
import axios from "axios"
import { getNumberOfSpots } from "helpers/selectors"

export default function useApplicationData () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    spots: 0,
    appointments: [],
    interviewers: []
  })

  const setDay = day => setState({ ...state, day})


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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        let days = getNumberOfSpots(state.days, appointments, state.day)
        setState({
          ...state, 
          appointments, days
        })
       
      })
  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    return axios.delete(`api/appointments/${id}`, { interview: appointment.interview })
    .then(() => {
      let days = getNumberOfSpots(state.days, appointments, state.day)
      setState({
        ...state, appointments, days
      })
    })
  }

  

  return { state, setDay, bookInterview, cancelInterview}
}