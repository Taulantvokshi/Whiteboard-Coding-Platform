import React from 'react'
import dateFormat from '../../util/dateFormat'
import {unAttendetEventThunk} from '../../store/host'
import {connect} from 'react-redux'

const UserSingleCurrentEvent = ({event, unAttend}) => {
  return (
    <div className="yourCurrentEvents">
      <div className="yourCurrentEvents__details">
        <div className="yourCurrentEvents__details-date">
          <p style={{fontSize: '0.8rem', color: 'cadetblue'}}>
            {dateFormat(event.date)} Time: {event.time} PM
          </p>
        </div>
        <div className="yourCurrentEvents__details-attendies">
          <h5>
            {event.Users.length === 1
              ? `${event.Users.length} Person is attending`
              : `${event.Users.length} People are joining`}
          </h5>
        </div>
        <div className="yourCurrentEvents__details-address">
          <i id="event-icon" className="fas fa-map-marker-alt" />
          <h5>{event.exactAddress}</h5>
        </div>
        <div className="yourCurrentEvents__details-language">
          <h5>{event.language}</h5>
        </div>
      </div>
      <div className="yourCurrentEvents__buttons">
        <button
          onClick={() => {
            unAttend(event.id)
          }}
          type="submit"
          className="yourSingleEvent__buttons-delete"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
const dispatchState = dispatch => {
  return {
    unAttend: id => dispatch(unAttendetEventThunk(id))
  }
}

export default connect(null, dispatchState)(UserSingleCurrentEvent)
