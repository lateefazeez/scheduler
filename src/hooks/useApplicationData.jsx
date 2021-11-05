import { useEffect, useReducer} from "react"
import axios from "axios"

export default function useApplicationData () {
  const SET_DAY = "SET_DAY"
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
  const SET_INTERVIEW = "SET_INTERVIEW"


  function reducer(state, action) {
    switch(action.type) {
      case SET_DAY:
        return { ...state, day: action.value}
      
      case SET_APPLICATION_DATA:
        return { 
          ...state, 
          days: action.value.days, 
          appointments: action.value.appointments, 
          interviewers: action.value.interviewers
        }
          
        case SET_INTERVIEW:
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview && { ...action.interview }
        }
        const appointments = {
          ...state.appointments, 
          [action.id]: appointment
        }
        
        function updateSpotsForDay(days, appointments, day) {
          let spotsRemaining = 0;
          days.forEach((element) => {
            if (element.name === day) {
              element.appointments.forEach((microElement) => {
                for (let key in appointments) {
                  if (key == microElement) {
                    if (appointments[key].interview === null) {
                      spotsRemaining++;
                    }
                  }
                }
              });
            }
          });
          const newDays = state.days.map(day => day.name === state.day ? {...day,spots:spotsRemaining} : day)
          return newDays
        }
        let spots = updateSpotsForDay(state.days, appointments, state.day)

        return { ...state, appointments: appointments, days: spots}
        

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
} )

  const setDay = day => dispatch({ type: SET_DAY, value: day})

  useEffect(() => {
    const daysUrl = "/api/days"
    const appointmentsUrl = "/api/appointments"
    const interviewersUrl = "/api/interviewers"

    const getDays = axios.get(daysUrl)
    const getAppointments = axios.get(appointmentsUrl)
    const getInterviewers = axios.get(interviewersUrl)

    Promise.all([getDays, getAppointments, getInterviewers])
      .then(response => {
        dispatch({ 
          type: SET_APPLICATION_DATA, 
          value: {
            days: response[0].data,
            appointments: response[1].data,
            interviewers: response[2].data }
          })
      })

      const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

      webSocket.onopen = function (event) {
        webSocket.send("ping")
      }

      webSocket.onmessage = function(event) {
        const data = JSON.parse(event.data)

        if (typeof data === 'object' && data.type === "SET_INTERVIEW") {
          dispatch({ type: SET_INTERVIEW, interview: data.interview, id: data.id})
        }
      }

      return () => {
        webSocket.close()
      }
  }, []) 

  const bookInterview = (id, interview) => {

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, interview, id})
      })
  }

  const cancelInterview = (id) => {

    return axios.delete(`api/appointments/${id}`)
    .then(() => {
      // let days = getNumberOfSpots(state.days, appointments, state.day)
      dispatch({ type: SET_INTERVIEW, interview: null, id})
    })
  }

  

  return { state, setDay, bookInterview, cancelInterview}
}