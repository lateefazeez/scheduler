import classNames from 'classnames';
import React from 'react'
import "./DayListItem.scss"

const DayListItem = (props) => {
  let { name, spots, selected, setDay } = props

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected ": selected,
    "day-list__item--full": !spots
  })

  const formatSpots = (spot) => {
    if (spots === 0) {
      return "no spots remaining"
    } else if (spot === 1) {
      return "1 spot remaining"
    } else {
      return `${spot} spots remaining`
    }
  }


  return ( 
    <li className={dayClass} onClick={() => setDay(name)} data-testid="days">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3> 
    </li>
   );
}
 
export default DayListItem;