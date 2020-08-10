import React from 'react'
import {connect} from 'react-redux'
import {selectedLocation} from '../../store/host'
import {UserAttendiesImages, Attend} from '../../components'

const SingleEvent = ({event, getLocation, user}) => {
  const fullName = event.firstName + ' ' + event.lastName
  const users = event.Users
  let onlyThreeUses = []
  if (users.length) {
    onlyThreeUses = users.slice(0, 3)
  }

  return (
    <div className="user_events__event">
      <div className="user_events__event-language">
        <h2>{event.language}</h2>
      </div>
      <div className="user_events__event-description">
        <div className="user_events__event-description--name">
          <h3>
            {fullName.length > 18 ? fullName.slice(0, 15) + '...' : fullName}
          </h3>
        </div>

        <div className="user_events__event-description--location">
          <i id="event-address-icon" className="fas fa-map-marker-alt" />
          <h5 id="event-address">
            {event.exactAddress.length > 30
              ? event.exactAddress.slice(0, 30) + '...'
              : event.exactAddress}
          </h5>
        </div>

        <div className="user_events__event-description--date">
          <i id="event-date-icon" className="far fa-calendar-alt" />
          <div>
            <h5 id="event-date">{new Date(event.date).toDateString()}</h5>
          </div>
        </div>
        <div className="user_events__event-description--date">
          <i id="event-time-icon" className="far fa-clock" />
          <h5 id="event-time">Time: {event.time}</h5>
        </div>
      </div>

      <div className="user_events__event-description--attend">
        <div className="user_events__event-description--attend-attendies">
          {users.length === 0 ? (
            <p>no people</p>
          ) : (
            onlyThreeUses.map(ev => {
              return <UserAttendiesImages key={ev.id} user={ev} />
            })
          )}
          {users.length > 3 ? (
            <p id="attendance-text">+{users.length - 3}</p>
          ) : (
            ''
          )}
        </div>

        {event.userId !== user.id ? (
          Number(event.people) ? (
            <Attend
              getLocation={getLocation}
              event={event}
              classname="user_events__event-description--btn"
              text="Attend"
            />
          ) : (
            <Attend
              getLocation={getLocation}
              event={event}
              classname="user_events__event-description--fullbtn"
              text="Full event"
            />
          )
        ) : (
          <Attend
            getLocation={getLocation}
            event={event}
            classname="user_events__event-description--fullbtn"
            text="Visit"
          />
        )}
      </div>
    </div>
  )
}

const stateToProps = store => {
  return {user: store.user}
}
const dispachState = dispatch => {
  return {
    getLocation: location => dispatch(selectedLocation(location))
  }
}

export default connect(stateToProps, dispachState)(SingleEvent)
