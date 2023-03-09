import React from 'react'
import "../styles/button.css"
import { BUTTON_TYPES } from '../data/buttons'

const Button = (props) => {

    const {type, btnText, onClick, actionType} = props

    const getButtonClass = () =>{
        switch(type){
            case BUTTON_TYPES.PRIMARY:
            return "primaryBtn button";
            case BUTTON_TYPES.SECONDARY:
            return "secondaryBtn button";
            case BUTTON_TYPES.TERTIARY:
            return "tertiaryBtn button";
            case BUTTON_TYPES.PUBLISH:
            return "publishBtn button";
            case BUTTON_TYPES.CANCEL:
            return "cancelBtn button";

            default:
                return "secondaryBtn button";
        }
    }

  return (
    <button className={`${getButtonClass()}`} onClick={onClick} type={actionType}>{btnText}</button>
  )
}

export default Button