import React from 'react'
import '../styles/OverLapInput.css'

const OverLapInput = (props) => {
    const {txt, type} = props;
  return (
    <div className='overlap'>
        <div className='overlap-label-container'>
            <h2 className='overlap-label'>{txt}</h2>
        </div>
        <div className='overlap-input-container'>
            <input className='overlap-input' type={type}></input>
        </div>
    </div>
  )
}

export default OverLapInput