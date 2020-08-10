import React from 'react'
import {Link} from 'react-router-dom'
import languageColor from '../../util/languageColor'
import {connect} from 'react-redux'
import dateFormat from '../../util/dateFormat'
const EventCard = ({event, user}) => {
  return (
    <div className="home_events-container--cart">
      <div className="cart_details">
        <h1
          className="cart_details-h2"
          style={{color: languageColor(event.language)}}
        >
          {event.language}
        </h1>
        <div className="cart_details-display">
          <div className="cart_details-display--image">
            {event.picture[0] !== 'u' ? (
              <img
                className="cart_details-display--image-i"
                src={event.picture}
              />
            ) : (
              <img
                className="cart_details-display--image-i"
                src={`/${event.picture}`}
              />
            )}
          </div>

          <div className="cart_details-display--info">
            <h5 className="cart_details-display--info--name">
              {event.firstName + ' ' + event.lastName}
            </h5>
          </div>
        </div>
        <div className="cart_details-directions">
          <h5 className="cart_details-directions--date">
            {dateFormat(event.date) + ' Time: ' + event.time}
          </h5>
          <h4>
            {event.exactAddress.length > 30
              ? event.exactAddress.slice(0, 30) + '...'
              : event.exactAddress}
          </h4>
        </div>
      </div>
      <div className="cart_attendance">
        <p className="cart_attendance-attendancePara">
          {event.Users.length === 1
            ? `${event.Users.length} Person is attenting`
            : `${event.Users.length} People are attenting`}
        </p>

        {Number(event.people) ? (
          <Link
            to={!Object.keys(user).length ? `/login` : `event-page/${event.id}`}
            className="attend-button"
          >
            More info
          </Link>
        ) : (
          <h2>Full Event</h2>
        )}
      </div>
    </div>
  )
}

const mapUser = state => {
  return {user: state.user}
}

export default connect(mapUser)(EventCard)
