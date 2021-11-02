
export const getAppointmentsForDay = (state, day) => {
  let appointmentsArray = []
  state.days.forEach(dayItem => {
    if (dayItem.name === day) {
      dayItem.appointments.forEach(appointment => {
          for (let key in state.appointments) {
            if (key == appointment) {
              appointmentsArray.push(state.appointments[key])
            }
          }
    })
  }
  })
  return appointmentsArray
}

export const getInterview = (state, interview) => {
  if (interview === null) {
    return null
  }
  for (const key in state.interviewers) {
    if (key == interview.interviewer) {
      interview.interviewer = state.interviewers[key]
    }
  }
  return interview
}

export const getInterviewersForDay = (state, day) => {
  let interviewersArray = []
  state.days.forEach(dayItem => {
    if (dayItem.name === day) {
      dayItem.interviewers.forEach(interviewer => {
        interviewersArray.push(state.interviewers[interviewer])
    })
  }
  })
  return interviewersArray
}

export const getNumberOfSpots = (days, appointments, day) => {
  let remainingSpots = 0
  days.forEach((dayItem, index) => {
    if (dayItem.name === day) {
      dayItem.appointments.forEach(dayAppointment => {
        for (const key in appointments) {
          if (key == dayAppointment) {
            if(appointments[key].interview === null) {
              remainingSpots ++
            }
          }
          
        }
      })
      dayItem.spots = remainingSpots
      // days[index] = dayItem
    }
  })
  return days
}