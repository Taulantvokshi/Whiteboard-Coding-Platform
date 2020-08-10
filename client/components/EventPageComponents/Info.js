import React from 'react'
import {SingleMap} from '../../components'
// import {Link} from 'react-router-dom'

const EventInfo = ({event}) => {
  const address = event.address
  const language = event.language
  return (
    <div className="event-info">
      <div className="event-info_details">
        <div className="event-info_details-date">
          <i style={{fontSize: '1.6rem'}} className="fas fa-clock" />
          <div className="event-info_details-date--time">
            <h3>Sunday, August 25, 2019</h3>
            <h4>1:00 PM to 4:00 PM</h4>
          </div>
        </div>
        <div className="event-info_details-location">
          <i style={{fontSize: '1.6rem'}} className="fas fa-map-marker-alt" />
          <div className="event-info_details-location--place">
            <h3>Sunday, August 25, 2019</h3>
            <h4>1:00 PM to 4:00 PM</h4>
          </div>
        </div>
      </div>
      <div className="event-info_map">
        <SingleMap location={address} language={language} />
      </div>
    </div>
  )
}

export default EventInfo
