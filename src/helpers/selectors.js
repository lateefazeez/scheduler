
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
  let returnedInterview = {}
  returnedInterview.student = interview.student;
  returnedInterview.interviewer = state.interviewers[interview.interviewer]

  return returnedInterview
}