import React from 'react'
import dateFormat from '../../util/dateFormat'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const SingleEventModal = ({event, user}) => {
  return (
    <div className="single_event">
      <div className="single_event-info">
        <h4>{event.language}</h4>
        <h5>{dateFormat(event.date) + ' ' + event.time}</h5>
        <h5>{event.exactAddress}</h5>
      </div>
      <div className="single_event-button">
        {Number(event.people) ? (
          <Link
            to={user.id ? `event-page/${event.id}` : '/login'}
            type="submit"
            className="allEventButton"
          >
            Attend
          </Link>
        ) : (
          <h4>Full Event</h4>
        )}
      </div>
    </div>
  )
}
const mapState = store => {
  return {user: store.user}
}
export default connect(mapState)(SingleEventModal)
