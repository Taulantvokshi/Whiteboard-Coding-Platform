import React from 'react'
import {Link} from 'react-router-dom'
const Attend = ({getLocation, event, classname, text}) => {
  return (
    <Link
      onClick={() => {
        getLocation(event)
      }}
      to={`/event-page/${event.id}`}
      type="submit"
      className={classname}
    >
      {text}
    </Link>
  )
}

export default Attend
