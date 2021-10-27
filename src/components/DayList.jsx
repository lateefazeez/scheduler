import React from 'react'
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const { days, day, setDay } = props


  return ( 
    <ul>
      {days.map(eachDay => (
        <DayListItem 
        key={eachDay.id} 
        name={eachDay.name} 
        spots={eachDay.spots} 
        selected={eachDay.name === day} 
        setDay={setDay} />
      ))}
    </ul>
   );
}
 
export default DayList;