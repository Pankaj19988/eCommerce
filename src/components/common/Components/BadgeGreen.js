import React from 'react'
import '../style/badge_green.css'

const BadgeGreen = (props) => {
  return (
    <div className="badge-wrapper d-flex">
    <div className={`badge badge-shiny badge-green ${props.className}`}>{props.name}</div>
  </div>
  )
}

export default BadgeGreen
