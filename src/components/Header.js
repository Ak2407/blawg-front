import React from 'react'
import "../styles/Header.css"

const Header = (props) => {

    const {txt} = props;

  return (
    <div className='header'>
        <h1 className='header-text'>{txt}</h1>
    </div>
  )
}

export default Header