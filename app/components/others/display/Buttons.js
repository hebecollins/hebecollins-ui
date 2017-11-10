import React from 'react'

export const ButtonOrange=({onClick, disabled, label})=>{
    return (
        <button className="btn-hebecollins-orange" onClick={onClick} disabled={disabled} >{label}</button>
    )
};

ButtonOrange.propTypes = {
    onClick:React.PropTypes.func.isRequired,
    disabled:React.PropTypes.bool.isRequired,
    label:React.PropTypes.string.isRequired
};

ButtonOrange.defaultProps={
  disabled:false
};


export const ButtonBlack=({onClick, disabled, label})=>{
    return (
        <button className="btn-hebecollins-black" disabled={disabled} onClick={onClick} >{label}</button>
    )
};


ButtonBlack.propTypes = {
    onClick:React.PropTypes.func.isRequired,
    disabled:React.PropTypes.bool.isRequired,
    label:React.PropTypes.string.isRequired,
};

ButtonBlack.defaultProps={
    disabled:false
};


export const IconButtons=({onClick, disabled, label, children})=>{
    return (

        <button className="btn-icon">{children}</button>
    )
};


IconButtons.propTypes = {
    // onClick:React.PropTypes.func.isRequired,
    // disabled:React.PropTypes.bool.isRequired,
    // label:React.PropTypes.string.isRequired,
};

IconButtons.defaultProps={
    // disabled:false
};
