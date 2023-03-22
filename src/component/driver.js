import React from 'react'
//import './driver.css'

function driver(props) {

    function handleClick() {
        
    }

  return (
    <div className='driver' >
        <div>{props.id}</div>
        <button onClick={() => props.setSelectedDriver(props.id) } >selec driver</button>
    </div>
    
  )
}

export default driver