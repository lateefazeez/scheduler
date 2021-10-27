import React from "react"

const Empty = (props) => {
  const { onAdd } = props


  return ( 
    <main className={"appointment__add"}>
      <img 
        src="images/add.png" 
        alt="Add" 
        className="appointment__add-button"
        onClick={onAdd} 
      />
    </main>
   );
}
 
export default Empty;