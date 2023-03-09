import React from 'react'
import '../styles/Input.css'

const Input = (props) => {
    const {placeholder} = props
  return (
    <input className='input' placeholder={placeholder}></input>
  )
}

export default Input