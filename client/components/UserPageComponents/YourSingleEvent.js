import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import dateFormat from '../../util/dateFormat'
import {deleteUserThunk, eventThunk} from '../../store/host'
import {edit} from '../../store/clickStore'
import history from '../../history'

const UserYourSingleEvents = ({
  event,
  deleteSingleEvent,
  editEvent,
  status,
  eventSatatus
}) => {
  const navigation = document.querySelector('.navigation')

  useEffect(
    () => {
      if (eventSatatus.createdAt) {
        history.push('/home/modal')
      }
    },
    [eventSatatus]
  )

  return (
    <div className="yourSingleEvent">
      <div className="yourSingleEvent__details">
        <div className="yourSingleEvent__details-date">
          {/* <h3>{event.language}</h3> */}
          <p style={{fontSize: '0.9rem', color: 'cadetblue'}}>
            {dateFormat(event.date)}
          </p>
        </div>
        <div className="yourSingleEvent__details-attendies">
          <i style={{fontSize: '0.8rem'}} className="fas fa-users" />
          <p style={{fontSize: '0.8rem', marginLeft: '0.5rem'}}>
            {Number(event.people) === 1
              ? `${event.people} spot left!`
              : `${event.people} spots left!`}
          </p>
        </div>
        <div className="yourSingleEvent__details-attendies-s">
          <i id="event-time-icon-s" className="far fa-clock" />
          <p>{event.time}</p>
        </div>

        <div className="yourSingleEvent__details-attendies">
          <p>{event.language}</p>
        </div>
      </div>

      <div className="yourSingleEvent__buttons">
        <div
          className="yourSingleEvent__buttons-edit"
          onClick={() => {
            navigation.style.zIndex = '1'
            status('edit')
            editEvent(event.id)
          }}
        >
          Edit
        </div>
        <button
          onClick={() => {
            deleteSingleEvent(event.id)
          }}
          type="submit"
          className="yourSingleEvent__buttons-delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {eventSatatus: state.host.event}
}
const dipatchStateToProps = dispatch => {
  return {
    deleteSingleEvent: id => dispatch(deleteUserThunk(id)),
    editEvent: id => dispatch(eventThunk(id)),
    status: val => {
      dispatch(edit(val))
    }
  }
}

export default connect(mapStateToProps, dipatchStateToProps)(
  UserYourSingleEvents
)
