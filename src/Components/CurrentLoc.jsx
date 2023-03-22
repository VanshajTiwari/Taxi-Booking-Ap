import React, { useState } from 'react'
import styled from 'styled-components'

function CurrentLoc({render,currentLoc}) {
    const [value, setValue] = useState(null)
    // console.log("in CurrenetLoc",currentLoc)

    const handelChnage= (e) => {
        setValue(e.target.value)
    }

    // const getLocation = () => {

    // }

  return (
    <Location>
        <input
            className='loc-input'
          type="text"
          value= {currentLoc ? `${currentLoc.lng.toFixed(4)} , ${currentLoc.lat.toFixed(4)}` : " "}
          placeholder="Current Location"
          name="currloc"
          onChange={(e) => handelChnage(e)}
          min="3"
        />
        <button type='button' className='loc-btn' onClick={render}>GET</button>
    </Location>
  )
}

const Location = styled.div`
    display: flex;
    flex-direction: row;
    .loc-btn {
        width: 80px;
        text-align: center;
        padding: 0;
        margin-left: 20px;
    }
`

export default CurrentLoc