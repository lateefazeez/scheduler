const { useState } = require("react")


export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setHistory(prevHistory => replace ? [...prevHistory.slice(0, prevHistory.length - 1), newMode] : [...prevHistory, newMode])
    setMode(newMode)
  }

  const back = () => {
    setHistory(prevHistory => prevHistory.slice(0, -1))
    if (history.length > 1) {
      setMode(history.slice(-2)[0])
    }
  }
  return { mode, transition, back }
}

