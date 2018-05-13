import React from 'react'
import { Link } from 'react-router'

export const NavLink=(props)=>{
    return (
        <Link {...props} activeClassName="active"/>
    )
};