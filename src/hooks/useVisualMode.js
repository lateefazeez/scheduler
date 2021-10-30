const { useState } = require("react")


export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace) => {
    if (replace) {
      setMode(newMode)
    } else {
      setMode(newMode)
      setHistory([...history, newMode])
    } 
  }

  const back = () => {
    setHistory(history.slice(0, -1))
    if (history.length > 1) {
      setMode(history.slice(-2)[0])
    }
  }
  return { mode, transition, back }
}

