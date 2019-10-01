import React from 'react'

const Filter =({filterStr, setFilterStr}) => {
  return (
    <div>
      <label>
        filter shown with  
      </label>
      <input 
        value={filterStr}
        onChange={(event)=> setFilterStr(event.target.value)}
      />
    </div>
  )
}

export default Filter