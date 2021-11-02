import React from 'react'
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const { days, value, onChange, setSpots } = props


  return ( 
    <ul>
      {days.map(eachDay => (
        <DayListItem 
        key={eachDay.id} 
        name={eachDay.name} 
        spots={eachDay.spots} 
        selected={eachDay.name === value} 
        setDay={onChange} />
      ))}
    </ul>
   );
}
 
export default DayList;