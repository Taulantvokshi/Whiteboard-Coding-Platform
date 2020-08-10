import React, {useState, useEffect} from 'react'
import {storeEventThunk, joinedThunk, clearJinedThunk} from '../../store/host'
import {me} from '../../store/user'
import {connect} from 'react-redux'
const EventHeader = ({
  event,
  attend,
  status,
  getEvents,
  currentUser,
  user,
  clearComponent
}) => {
  const [clicked, setClicked] = useState(true)
  useEffect(() => {
    currentUser()
    return () => {
      clearComponent()
    }
  }, [])

  return (
    <div className="event-header">
      <div className="event-header_container">
        <div className="event-box">
          <div className="event-box--header">
            <h1>{event.language}</h1>
          </div>
          <div className="event-header_container-user">
            <div className="event-header_container-user--image">
              {event.picture[0] === 'h' ? (
                <img src={event.picture} />
              ) : (
                <img src={`/${event.picture}`} />
              )}
            </div>
            <div className="event-header_container-user--description">
              <p>
                Hosted by: <span>{event.firstName + ' ' + event.lastName}</span>
              </p>
              <p>email {event.createdBy}</p>
              <p>From: Nyc </p>
              <p>Public</p>
              <h4 style={{color: 'gray'}}>Some Date</h4>
            </div>
          </div>
        </div>
        <div className="event-button">
          {user.id !== event.userId ? (
            Number(event.people) ? (
              !status && clicked ? (
                <button
                  onClick={() => {
                    attend(event.id)
                    getEvents(event.id)
                    setClicked(false)
                  }}
                  type="submit"
                  className="eventPage_button"
                >
                  <p>Attend</p>
                </button>
              ) : (
                <button
                  style={{
                    background:
                      'linear-gradient(-131deg, #f9637c 0%, #ff7933 100%)',
                    color: 'white'
                  }}
                  type="submit"
                  disabled
                  className="eventPage_button"
                >
                  <p>Joined</p>
                </button>
              )
            ) : (
              <p>Full Event</p>
            )
          ) : (
            <button
              style={{
                background:
                  'linear-gradient(-131deg, #f9637c 0%, #ff7933 100%)',
                color: 'white'
              }}
              type="submit"
              disabled
              className="eventPage_button"
            >
              Your Event
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const mapPropsToState = state => {
  return {user: state.user}
}
const dispatchState = dispatch => {
  return {
    attend: id => dispatch(storeEventThunk(id)),
    getEvents: id => dispatch(joinedThunk(id)),
    currentUser: () => dispatch(me()),
    clearComponent: () => dispatch(clearJinedThunk())
  }
}

export default connect(mapPropsToState, dispatchState)(EventHeader)
